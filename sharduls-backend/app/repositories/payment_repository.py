"""
Payment repository — all DB reads and writes for Payment and WebhookEvent.

Rules:
- No business logic here. Call service layer for decisions.
- Always use with_for_update() when mutating payment status (prevents race conditions).
- Return model instances or None — never raise HTTPException from this layer.
"""
import logging
from datetime import datetime, timezone
from typing import Optional, List

from sqlalchemy import func
from sqlalchemy.orm import Session, joinedload

from app.models.payment import Payment, WebhookEvent
from app.models.order import Order

logger = logging.getLogger(__name__)


# ── Payment ──────────────────────────────────────────────────────────────────

def create_payment(
    db: Session,
    *,
    order_id:           int,
    user_id:            int,
    razorpay_order_id:  str,
    amount:             int,
    currency:           str,
    idempotency_key:    str,
) -> Payment:
    """Insert a new Payment row in PENDING state."""
    payment = Payment(
        order_id=order_id,
        user_id=user_id,
        razorpay_order_id=razorpay_order_id,
        amount=amount,
        currency=currency,
        status="pending",
        idempotency_key=idempotency_key,
    )
    db.add(payment)
    db.flush()
    return payment


def get_payment_by_id(db: Session, payment_id: int) -> Optional[Payment]:
    return db.query(Payment).filter(Payment.id == payment_id).first()


def get_payment_by_razorpay_order_id(db: Session, rzp_order_id: str) -> Optional[Payment]:
    return (
        db.query(Payment)
        .filter(Payment.razorpay_order_id == rzp_order_id)
        .first()
    )


def get_payment_by_order_id(db: Session, order_id: int) -> Optional[Payment]:
    return db.query(Payment).filter(Payment.order_id == order_id).first()


def get_payment_by_idempotency_key(db: Session, key: str) -> Optional[Payment]:
    return db.query(Payment).filter(Payment.idempotency_key == key).first()


def get_user_payments(
    db: Session,
    user_id: int,
    skip: int = 0,
    limit: int = 20,
) -> List[Payment]:
    """Paginated payment history for a buyer, newest first."""
    return (
        db.query(Payment)
        .filter(Payment.user_id == user_id)
        .order_by(Payment.created_at.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )


def mark_payment_captured(
    db: Session,
    payment_id: int,
    *,
    razorpay_payment_id: str,
    razorpay_signature:  str,
    payment_method:      Optional[str] = None,
    gateway_response:    Optional[str] = None,
    webhook_verified:    bool = False,
) -> Optional[Payment]:
    """
    Transition a payment to CAPTURED after successful signature verification.
    Uses SELECT FOR UPDATE to serialise concurrent updates.
    """
    payment = (
        db.query(Payment)
        .filter(Payment.id == payment_id)
        .with_for_update()
        .first()
    )
    if not payment:
        return None

    payment.razorpay_payment_id = razorpay_payment_id
    payment.razorpay_signature  = razorpay_signature
    payment.status              = "captured"
    payment.payment_method      = payment_method
    payment.gateway_response    = gateway_response
    payment.webhook_verified    = webhook_verified
    db.flush()
    return payment


def update_payment_status(
    db: Session,
    payment_id: int,
    *,
    status:           str,
    failure_reason:   Optional[str] = None,
    gateway_response: Optional[str] = None,
    webhook_event:    Optional[str] = None,
    webhook_verified: Optional[bool] = None,
) -> Optional[Payment]:
    """Generic status update used by webhook handlers."""
    payment = (
        db.query(Payment)
        .filter(Payment.id == payment_id)
        .with_for_update()
        .first()
    )
    if not payment:
        return None

    payment.status = status
    if failure_reason is not None:
        payment.failure_reason = failure_reason
    if gateway_response is not None:
        payment.gateway_response = gateway_response
    if webhook_event:
        payment.last_webhook_event  = webhook_event
        payment.last_webhook_at     = datetime.now(timezone.utc)
        payment.webhook_event_count = (payment.webhook_event_count or 0) + 1
    if webhook_verified is not None:
        payment.webhook_verified = webhook_verified
    db.flush()
    return payment


def mark_payment_refunded(
    db: Session,
    payment_id: int,
    *,
    refund_id:     str,
    refund_amount: int,
    status:        str,
) -> Optional[Payment]:
    payment = (
        db.query(Payment)
        .filter(Payment.id == payment_id)
        .with_for_update()
        .first()
    )
    if not payment:
        return None
    payment.refund_id     = refund_id
    payment.refund_amount = refund_amount
    payment.refunded_at   = datetime.now(timezone.utc)
    payment.status        = status
    db.flush()
    return payment


# ── WebhookEvent ─────────────────────────────────────────────────────────────

def is_webhook_event_processed(db: Session, razorpay_event_id: str) -> bool:
    """True if this event ID was already successfully processed (dedup guard)."""
    return db.query(
        db.query(WebhookEvent)
        .filter(
            WebhookEvent.razorpay_event_id == razorpay_event_id,
            WebhookEvent.processed == True,
        )
        .exists()
    ).scalar()


def record_webhook_event(
    db: Session,
    *,
    razorpay_event_id: str,
    event_type:        str,
    processed:         bool = True,
    payload_summary:   Optional[str] = None,
    error_message:     Optional[str] = None,
) -> WebhookEvent:
    evt = WebhookEvent(
        razorpay_event_id=razorpay_event_id,
        event_type=event_type,
        processed=processed,
        payload_summary=payload_summary,
        error_message=error_message,
    )
    db.add(evt)
    db.flush()
    return evt
