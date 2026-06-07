"""
Payment service — orchestrates order creation, Razorpay payment lifecycle,
webhook processing, refunds, and status queries.

SECURITY DECISIONS:
- All amounts are calculated server-side from the product DB — never trust frontend prices.
- Razorpay order amount is set from order.total_amount, not from any client value.
- Idempotency keys prevent duplicate Razorpay orders on retries.
- Payment signature is verified (HMAC-SHA256) before marking captured.
- Webhook signature is verified before processing any webhook payload.
- SELECT FOR UPDATE prevents race conditions on concurrent status updates.
- Every webhook event is recorded in DB for audit and dedup.
"""
import hashlib
import json
import logging
from datetime import datetime, timezone
from typing import Optional

from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.errors import raise_error
from app.models.product import Product
from app.models.payment import Payment
from app.repositories import order_repository as order_repo
from app.repositories import payment_repository as pay_repo
from app.services.razorpay_service import (
    RazorpaySignatureError,
    create_razorpay_order,
    create_refund,
    fetch_razorpay_payment,
    verify_payment_signature,
)

logger = logging.getLogger(__name__)

_TERMINAL_STATES = {"captured", "refunded", "failed"}


# ── Helpers ────────────────────────────────────────────────────────────────

def _paise(rupees: float) -> int:
    """Convert rupees to paise (Razorpay smallest unit). Round to avoid float drift."""
    return int(round(rupees * 100))


def _compute_product_price(product: Product) -> float:
    """Server-authoritative price calculation (mirrors buyer portal display logic)."""
    base     = product.admin_price if product.admin_price else product.supplier_price
    fee      = product.platform_fee or 0
    discount = product.discount_pct or 0
    price    = base + fee
    if discount > 0:
        price = price * (1 - discount / 100)
    return round(price, 2)


def _generate_idempotency_key(user_id: int, order_id: int) -> str:
    """Deterministic key — retrying the same order never creates a second Razorpay order."""
    raw = f"rzp:order:{order_id}:user:{user_id}:v1"
    return hashlib.sha256(raw.encode()).hexdigest()


# ── Create Order ───────────────────────────────────────────────────────────

def create_order_with_payment(
    db: Session,
    *,
    user_id:          int,
    cart_items:       list[dict],
    shipping_address: dict,
) -> dict:
    """
    Full Razorpay checkout flow:
    1. Validate products (approved, in stock).
    2. Compute all prices server-side — never trust frontend amounts.
    3. Create Order + OrderItems in DB.
    4. Create Razorpay order via API.
    5. Create Payment record linked to the Order.
    6. Deduct stock.
    7. Return razorpay_order_id + key_id to frontend (never the secret).
    """
    if not cart_items:
        raise_error("BAD_REQUEST", "Cart is empty")
    if not shipping_address:
        raise_error("BAD_REQUEST", "Shipping address is required")

    product_ids  = [item["product_id"] for item in cart_items]
    products     = db.query(Product).filter(Product.id.in_(product_ids)).all()
    product_map  = {p.id: p for p in products}
    order_items  = []

    for item in cart_items:
        pid = item["product_id"]
        qty = int(item.get("quantity", 1))
        if qty < 1:
            raise_error("BAD_REQUEST", f"Invalid quantity for product {pid}")

        product = product_map.get(pid)
        if not product:
            raise_error("NOT_FOUND", f"Product {pid} not found")
        if product.status != "approved":
            raise_error("BAD_REQUEST", f"Product '{product.name}' is not available for purchase")
        if product.stock < qty:
            raise_error("BAD_REQUEST",
                        f"Insufficient stock for '{product.name}' (available: {product.stock})")

        unit_price_paise = _paise(_compute_product_price(product))
        image = (product.images or [None])[0] if product.images else None

        order_items.append({
            "product_id":    product.id,
            "product_name":  product.name,
            "product_image": image,
            "product_sku":   product.sku,
            "quantity":      qty,
            "unit_price":    unit_price_paise,
        })

    subtotal        = sum(i["unit_price"] * i["quantity"] for i in order_items)
    discount_amount = 0
    shipping_amount = 0 if subtotal >= _paise(499) else _paise(49)
    total_amount    = subtotal - discount_amount + shipping_amount

    if total_amount < _paise(1):
        raise_error("BAD_REQUEST", "Order total must be at least ₹1")

    currency = settings.RAZORPAY_CURRENCY

    order_number = order_repo.generate_order_number(db)
    order = order_repo.create_order(
        db,
        user_id=user_id,
        order_number=order_number,
        shipping_address=shipping_address,
        subtotal=subtotal,
        discount_amount=discount_amount,
        shipping_amount=shipping_amount,
        total_amount=total_amount,
        currency=currency,
        items=order_items,
    )

    idempotency_key = _generate_idempotency_key(user_id, order.id)

    existing = pay_repo.get_payment_by_idempotency_key(db, idempotency_key)
    if existing:
        logger.info("Reusing existing Razorpay order for order %s", order.order_number)
        db.commit()
        return _build_checkout_response(order, existing)

    try:
        rzp_order = create_razorpay_order(
            amount=total_amount,
            currency=currency,
            receipt=order_number,
            notes={
                "order_id":   str(order.id),
                "user_id":    str(user_id),
            },
        )
    except Exception as e:
        logger.error("Razorpay order creation failed: %s", e)
        db.rollback()
        raise_error("INTERNAL_ERROR", "Payment gateway error. Please try again.")

    payment = pay_repo.create_payment(
        db,
        order_id=order.id,
        user_id=user_id,
        razorpay_order_id=rzp_order["id"],
        amount=total_amount,
        currency=currency,
        idempotency_key=idempotency_key,
    )

    for item in cart_items:
        product = product_map[item["product_id"]]
        product.stock = max(0, product.stock - int(item.get("quantity", 1)))

    db.commit()
    logger.info("Created order %s with Razorpay order %s", order.order_number, rzp_order["id"])
    return _build_checkout_response(order, payment)


def _build_checkout_response(order, payment) -> dict:
    return {
        "order_id":          order.id,
        "order_number":      order.order_number,
        "razorpay_order_id": payment.razorpay_order_id,
        "razorpay_key_id":   settings.RAZORPAY_KEY_ID,
        "amount":            order.total_amount,
        "currency":          order.currency,
        "payment_id":        payment.id,
    }


# ── Verify Payment ─────────────────────────────────────────────────────────

def verify_and_capture_payment(
    db: Session,
    *,
    razorpay_order_id:   str,
    razorpay_payment_id: str,
    razorpay_signature:  str,
) -> dict:
    """
    Called after Razorpay Checkout succeeds on the frontend.

    Steps:
    1. Lookup Payment by razorpay_order_id.
    2. Guard against duplicate processing.
    3. Verify HMAC-SHA256 signature — REJECT if invalid.
    4. Mark payment as captured.
    5. Confirm order.
    6. Return order summary.
    """
    payment = pay_repo.get_payment_by_razorpay_order_id(db, razorpay_order_id)
    if not payment:
        raise_error("NOT_FOUND", "Payment record not found for this Razorpay order")

    if payment.status in _TERMINAL_STATES:
        logger.info("Duplicate verify call for already-terminal payment %s", payment.id)
        order = order_repo.get_order_by_id(db, payment.order_id)
        return _build_verify_response(order, payment)

    try:
        verify_payment_signature(
            razorpay_order_id=razorpay_order_id,
            razorpay_payment_id=razorpay_payment_id,
            razorpay_signature=razorpay_signature,
        )
    except Exception:
        logger.warning(
            "SECURITY: Payment signature verification failed. "
            "razorpay_order_id=%s razorpay_payment_id=%s",
            razorpay_order_id, razorpay_payment_id,
        )
        raise_error("BAD_REQUEST", "Payment verification failed. Signature mismatch.")

    rzp_payment = {}
    try:
        rzp_payment = fetch_razorpay_payment(razorpay_payment_id)
    except Exception as e:
        logger.warning("Could not fetch Razorpay payment details: %s", e)

    pay_repo.mark_payment_captured(
        db,
        payment.id,
        razorpay_payment_id=razorpay_payment_id,
        razorpay_signature=razorpay_signature,
        payment_method=rzp_payment.get("method"),
        gateway_response=json.dumps(rzp_payment)[:2000] if rzp_payment else None,
        webhook_verified=False,
    )
    order_repo.update_order_status(db, payment.order_id, "confirmed")
    db.commit()

    logger.info(
        "Payment captured: payment_id=%s razorpay_payment_id=%s",
        payment.id, razorpay_payment_id,
    )
    order = order_repo.get_order_by_id(db, payment.order_id)
    return _build_verify_response(order, payment)


def _build_verify_response(order, payment) -> dict:
    return {
        "payment_id":   payment.id,
        "order_id":     order.id,
        "order_number": order.order_number,
        "status":       payment.status,
        "amount":       payment.amount,
        "currency":     payment.currency,
        "message":      "Payment successful",
    }


# ── Webhook Processing ─────────────────────────────────────────────────────

def process_webhook_event(db: Session, payload: dict) -> dict:
    """
    Process a Razorpay webhook event (signature already verified by caller).
    Idempotent — duplicate events are safely ignored.
    """
    event_id   = payload.get("account_id", "") + "|" + payload.get("created_at", "")
    event_type = payload.get("event", "unknown")

    # Razorpay does not always provide a globally unique event ID in older API versions.
    # We use the combination of event type + payment entity ID as a dedup key.
    entity = (
        payload.get("payload", {})
               .get("payment", {})
               .get("entity", {})
    )
    rzp_event_id = entity.get("id", "") + "|" + event_type
    if not rzp_event_id.strip("|"):
        rzp_event_id = event_id

    if pay_repo.is_webhook_event_processed(db, rzp_event_id):
        logger.info("Duplicate webhook event %s — skipping", rzp_event_id)
        return {"status": "duplicate", "event_id": rzp_event_id}

    handler = _WEBHOOK_HANDLERS.get(event_type)
    if not handler:
        logger.info("Unhandled webhook event type: %s", event_type)
        pay_repo.record_webhook_event(
            db,
            razorpay_event_id=rzp_event_id,
            event_type=event_type,
            processed=True,
            payload_summary="unhandled_type",
        )
        db.commit()
        return {"status": "ignored", "event_type": event_type}

    try:
        result = handler(db, payload)
        pay_repo.record_webhook_event(
            db,
            razorpay_event_id=rzp_event_id,
            event_type=event_type,
            processed=True,
            payload_summary=str(result)[:500],
        )
        db.commit()
        logger.info("Processed webhook %s (%s): %s", rzp_event_id, event_type, result)
        return {"status": "processed", "event_type": event_type, **result}
    except Exception as exc:
        db.rollback()
        logger.exception("Webhook processing failed for %s: %s", rzp_event_id, exc)
        pay_repo.record_webhook_event(
            db,
            razorpay_event_id=rzp_event_id,
            event_type=event_type,
            processed=False,
            error_message=str(exc)[:500],
        )
        db.commit()
        return {"status": "error", "event_id": rzp_event_id, "error": str(exc)[:200]}


def _handle_payment_authorized(db: Session, payload: dict) -> dict:
    entity  = payload["payload"]["payment"]["entity"]
    rzp_oid = entity.get("order_id")
    if not rzp_oid:
        return {"detail": "no_razorpay_order_id"}
    payment = pay_repo.get_payment_by_razorpay_order_id(db, rzp_oid)
    if not payment:
        return {"detail": "payment_not_found"}
    if payment.status in _TERMINAL_STATES:
        return {"detail": "already_terminal", "current_status": payment.status}
    pay_repo.update_payment_status(
        db, payment.id,
        status="authorized",
        webhook_event="payment.authorized",
        webhook_verified=True,
        gateway_response=json.dumps(entity)[:2000],
    )
    return {"payment_id": payment.id, "new_status": "authorized"}


def _handle_payment_captured(db: Session, payload: dict) -> dict:
    entity  = payload["payload"]["payment"]["entity"]
    rzp_oid = entity.get("order_id")
    if not rzp_oid:
        return {"detail": "no_razorpay_order_id"}
    payment = pay_repo.get_payment_by_razorpay_order_id(db, rzp_oid)
    if not payment:
        return {"detail": "payment_not_found"}
    if payment.status == "captured":
        pay_repo.update_payment_status(
            db, payment.id,
            status="captured",
            webhook_event="payment.captured",
            webhook_verified=True,
        )
        return {"detail": "already_captured_webhook_verified", "payment_id": payment.id}
    pay_repo.mark_payment_captured(
        db, payment.id,
        razorpay_payment_id=entity.get("id", ""),
        razorpay_signature=payment.razorpay_signature or "",
        payment_method=entity.get("method"),
        gateway_response=json.dumps(entity)[:2000],
        webhook_verified=True,
    )
    order_repo.update_order_status(db, payment.order_id, "confirmed")
    return {"payment_id": payment.id, "new_status": "captured"}


def _handle_payment_failed(db: Session, payload: dict) -> dict:
    entity  = payload["payload"]["payment"]["entity"]
    rzp_oid = entity.get("order_id")
    if not rzp_oid:
        return {"detail": "no_razorpay_order_id"}
    payment = pay_repo.get_payment_by_razorpay_order_id(db, rzp_oid)
    if not payment:
        return {"detail": "payment_not_found"}
    if payment.status in _TERMINAL_STATES:
        return {"detail": "already_terminal"}
    error_desc = entity.get("error_description") or entity.get("error_reason") or "Payment failed"
    pay_repo.update_payment_status(
        db, payment.id,
        status="failed",
        failure_reason=error_desc,
        webhook_event="payment.failed",
        webhook_verified=True,
        gateway_response=json.dumps(entity)[:2000],
    )
    return {"payment_id": payment.id, "new_status": "failed"}


def _handle_order_paid(db: Session, payload: dict) -> dict:
    entity  = payload["payload"]["order"]["entity"]
    rzp_oid = entity.get("id")
    if not rzp_oid:
        return {"detail": "no_razorpay_order_id"}
    payment = pay_repo.get_payment_by_razorpay_order_id(db, rzp_oid)
    if not payment:
        return {"detail": "payment_not_found"}
    pay_repo.update_payment_status(
        db, payment.id,
        status="captured",
        webhook_event="order.paid",
        webhook_verified=True,
    )
    order_repo.update_order_status(db, payment.order_id, "confirmed")
    return {"payment_id": payment.id, "new_status": "captured"}


def _handle_refund_created(db: Session, payload: dict) -> dict:
    entity = payload["payload"]["refund"]["entity"]
    rzp_pid = entity.get("payment_id")
    if not rzp_pid:
        return {"detail": "no_payment_id"}
    payment = (
        db.query(Payment)
        .filter_by(razorpay_payment_id=rzp_pid)
        .first()
    )
    if not payment:
        return {"detail": "payment_not_found"}
    refund_amount = entity.get("amount", 0)
    is_full       = refund_amount >= payment.amount
    new_status    = "refunded" if is_full else payment.status
    pay_repo.mark_payment_refunded(
        db, payment.id,
        refund_id=entity.get("id", ""),
        refund_amount=refund_amount,
        status=new_status,
    )
    if is_full:
        order_repo.update_order_status(db, payment.order_id, "refunded")
    return {"payment_id": payment.id, "new_status": new_status, "refund_amount": refund_amount}


_WEBHOOK_HANDLERS = {
    "payment.authorized": _handle_payment_authorized,
    "payment.captured":   _handle_payment_captured,
    "payment.failed":     _handle_payment_failed,
    "order.paid":         _handle_order_paid,
    "refund.created":     _handle_refund_created,
    "refund.processed":   _handle_refund_created,
}


# ── Public Queries ─────────────────────────────────────────────────────────

def get_user_orders(db: Session, user_id: int, skip: int = 0, limit: int = 20) -> list[dict]:
    orders = order_repo.get_user_orders(db, user_id, skip, limit)
    return [_serialize_order(o) for o in orders]


def get_order_detail(db: Session, user_id: int, order_id: int) -> Optional[dict]:
    order = order_repo.get_order_by_id(db, order_id)
    if not order or order.user_id != user_id:
        return None
    return _serialize_order(order)


def get_payment_status(db: Session, user_id: int, order_id: int) -> Optional[dict]:
    payment = pay_repo.get_payment_by_order_id(db, order_id)
    if not payment or payment.user_id != user_id:
        return None
    return {
        "payment_id":          payment.id,
        "status":              payment.status,
        "amount":              payment.amount,
        "currency":            payment.currency,
        "failure_reason":      payment.failure_reason,
        "payment_method":      payment.payment_method,
        "webhook_verified":    payment.webhook_verified,
        "refund_amount":       payment.refund_amount,
    }


def initiate_refund(
    db: Session,
    *,
    user_id:      int,
    order_id:     int,
    amount_paise: Optional[int] = None,
    reason:       str = "",
) -> dict:
    """Admin-initiated refund via Razorpay."""
    payment = pay_repo.get_payment_by_order_id(db, order_id)
    if not payment:
        raise_error("NOT_FOUND", "Payment not found for this order")
    if payment.status != "captured":
        raise_error("BAD_REQUEST", f"Cannot refund payment in '{payment.status}' status")
    if not payment.razorpay_payment_id:
        raise_error("BAD_REQUEST", "No Razorpay payment ID — payment may not have been captured yet")

    refund_amount = amount_paise or payment.amount
    if refund_amount > payment.amount:
        raise_error("BAD_REQUEST", "Refund amount exceeds payment amount")

    try:
        refund = create_refund(
            razorpay_payment_id=payment.razorpay_payment_id,
            amount_paise=refund_amount,
            notes={"order_id": str(order_id), "reason": reason[:200]},
        )
    except Exception as e:
        logger.error("Razorpay refund failed: %s", e)
        raise_error("INTERNAL_ERROR", "Refund failed. Please try again.")

    is_full    = refund_amount >= payment.amount
    new_status = "refunded" if is_full else payment.status
    pay_repo.mark_payment_refunded(
        db, payment.id,
        refund_id=refund["id"],
        refund_amount=refund_amount,
        status=new_status,
    )
    if is_full:
        order_repo.update_order_status(db, payment.order_id, "refunded")
    db.commit()
    return {"refund_id": refund["id"], "amount": refund_amount, "status": new_status, "order_id": order_id}


# ── Serialization ──────────────────────────────────────────────────────────

def _serialize_order(order) -> dict:
    payment = order.payment
    return {
        "id":               order.id,
        "order_number":     order.order_number,
        "status":           order.status,
        "subtotal":         order.subtotal,
        "discount_amount":  order.discount_amount,
        "shipping_amount":  order.shipping_amount,
        "total_amount":     order.total_amount,
        "currency":         order.currency,
        "shipping_address": order.shipping_address,
        "created_at":       order.created_at.isoformat() if order.created_at else None,
        "confirmed_at":     order.confirmed_at.isoformat() if order.confirmed_at else None,
        "shipped_at":       order.shipped_at.isoformat() if order.shipped_at else None,
        "delivered_at":     order.delivered_at.isoformat() if order.delivered_at else None,
        "items": [
            {
                "id":            item.id,
                "product_id":    item.product_id,
                "product_name":  item.product_name,
                "product_image": item.product_image,
                "product_sku":   item.product_sku,
                "quantity":      item.quantity,
                "unit_price":    item.unit_price,
                "total_price":   item.total_price,
            }
            for item in (order.items or [])
        ],
        "payment": {
            "id":                  payment.id,
            "status":              payment.status,
            "amount":              payment.amount,
            "currency":            payment.currency,
            "payment_method":      payment.payment_method,
            "webhook_verified":    payment.webhook_verified,
            "failure_reason":      payment.failure_reason,
            "refund_amount":       payment.refund_amount,
            "razorpay_order_id":   payment.razorpay_order_id,
            "razorpay_payment_id": payment.razorpay_payment_id,
        } if payment else None,
    }
