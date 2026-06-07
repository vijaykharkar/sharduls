"""
Repository layer for Order, Payment, and WebhookEvent DB operations.
All DB access for the payment flow goes through here — keeps service layer clean.
"""
import logging
from datetime import datetime, timezone
from typing import Optional, List

from sqlalchemy import func
from sqlalchemy.orm import Session, joinedload

from app.models.order import Order, OrderItem

logger = logging.getLogger(__name__)


# ── Order ──────────────────────────────────────────────────────────────────

def create_order(db: Session, *, user_id: int, order_number: str,
                 shipping_address: dict, subtotal: int, discount_amount: int,
                 shipping_amount: int, total_amount: int, currency: str,
                 items: list[dict]) -> Order:
    """Create order + items in a single transaction."""
    order = Order(
        user_id=user_id,
        order_number=order_number,
        shipping_address=shipping_address,
        subtotal=subtotal,
        discount_amount=discount_amount,
        shipping_amount=shipping_amount,
        total_amount=total_amount,
        currency=currency,
        status="pending",
    )
    db.add(order)
    db.flush()  # get order.id

    for item in items:
        db.add(OrderItem(
            order_id=order.id,
            product_id=item.get("product_id"),
            product_name=item["product_name"],
            product_image=item.get("product_image"),
            product_sku=item.get("product_sku"),
            quantity=item["quantity"],
            unit_price=item["unit_price"],
            total_price=item["unit_price"] * item["quantity"],
        ))
    db.flush()
    return order


def get_order_by_id(db: Session, order_id: int) -> Optional[Order]:
    return (
        db.query(Order)
        .options(joinedload(Order.items), joinedload(Order.payment))
        .filter(Order.id == order_id)
        .first()
    )


def get_order_by_number(db: Session, order_number: str) -> Optional[Order]:
    return (
        db.query(Order)
        .options(joinedload(Order.items), joinedload(Order.payment))
        .filter(Order.order_number == order_number)
        .first()
    )


def get_user_orders(db: Session, user_id: int, skip: int = 0, limit: int = 20) -> list[Order]:
    # Two-step query to avoid joinedload + offset/limit duplicate-row bug
    order_ids = (
        db.query(Order.id)
        .filter(Order.user_id == user_id)
        .order_by(Order.created_at.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )
    ids = [oid[0] for oid in order_ids]
    if not ids:
        return []
    return (
        db.query(Order)
        .options(joinedload(Order.items), joinedload(Order.payment))
        .filter(Order.id.in_(ids))
        .order_by(Order.created_at.desc())
        .all()
    )


def update_order_status(db: Session, order_id: int, status: str) -> Optional[Order]:
    order = db.query(Order).filter(Order.id == order_id).with_for_update().first()
    if not order:
        return None
    order.status = status
    now = datetime.now(timezone.utc)
    if status == "confirmed":
        order.confirmed_at = now
    elif status == "shipped":
        order.shipped_at = now
    elif status == "delivered":
        order.delivered_at = now
    elif status in ("cancelled", "refunded"):
        order.cancelled_at = now
    db.flush()
    return order


def generate_order_number(db: Session) -> str:
    """Generate ORD-YYYYMMDD-NNNNN format."""
    today = datetime.now(timezone.utc).strftime("%Y%m%d")
    prefix = f"ORD-{today}-"
    count = db.query(func.count(Order.id)).filter(Order.order_number.like(f"{prefix}%")).scalar() or 0
    return f"{prefix}{count + 1:05d}"


