"""
Payment and WebhookEvent SQLAlchemy models.

Razorpay payment lifecycle:
  PENDING   → Order created in Razorpay; awaiting user action
  CREATED   → Order record exists; Razorpay checkout opened by user
  AUTHORIZED → Payment authorised by bank (captured manually if needed)
  CAPTURED  → Payment captured (funds confirmed) — primary success state
  FAILED    → Payment attempt failed
  REFUNDED  → Full or partial refund processed

Idempotency:
  razorpay_order_id is unique — one Razorpay order maps to exactly one Payment row.
  WebhookEvent.razorpay_event_id is unique — prevents duplicate webhook processing.

Audit:
  gateway_response stores the raw Razorpay payload for every state change.
  webhook_verified flags whether the captured status was confirmed by webhook.
"""
import enum

from sqlalchemy import (
    Boolean, Column, DateTime, Enum, ForeignKey,
    Index, Integer, String, Text, UniqueConstraint, func,
)
from sqlalchemy.orm import relationship

from app.core.database import Base
from app.models.base import TimestampMixin


class PaymentStatus(str, enum.Enum):
    pending     = "pending"
    created     = "created"
    authorized  = "authorized"
    captured    = "captured"
    failed      = "failed"
    refunded    = "refunded"
    cod_pending = "cod_pending"


class Payment(Base, TimestampMixin):
    """
    One-to-one with Order.  Tracks the full Razorpay payment lifecycle.
    """
    __tablename__ = "payments"
    __table_args__ = (
        UniqueConstraint("razorpay_order_id", name="uq_razorpay_order_id"),
        Index("ix_payments_user_id", "user_id"),
        Index("ix_payments_status", "status"),
        Index("ix_payments_razorpay_payment_id", "razorpay_payment_id"),
    )

    id = Column(Integer, primary_key=True, index=True)

    # FK references
    order_id = Column(
        Integer,
        ForeignKey("orders.id", ondelete="CASCADE"),
        nullable=False,
        unique=True,
    )
    user_id = Column(
        Integer,
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
    )

    # ── Razorpay identifiers ──────────────────────────────────────────────
    # razorpay_order_id: returned when backend calls razorpay.order.create()
    razorpay_order_id = Column(String(255), nullable=False, unique=True, index=True)

    # razorpay_payment_id: returned by Razorpay Checkout after user pays;
    # populated in the verify-payment step.
    razorpay_payment_id = Column(String(255), nullable=True, index=True)

    # HMAC-SHA256 signature from Razorpay; stored verbatim for audit.
    razorpay_signature = Column(String(512), nullable=True)

    # ── Financials ────────────────────────────────────────────────────────
    amount   = Column(Integer, nullable=False)          # in paise (smallest unit)
    currency = Column(String(3), nullable=False, default="INR")

    # ── Status ───────────────────────────────────────────────────────────
    status = Column(
        String(20),
        nullable=False,
        default=PaymentStatus.pending.value,
        index=True,
    )
    failure_reason = Column(Text, nullable=True)

    # ── Payment method ────────────────────────────────────────────────────
    payment_method = Column(String(50), nullable=True)   # card / upi / netbanking / wallet
    gateway = Column(String(20), nullable=False, default="razorpay")

    # Raw response payload (JSON as text) from Razorpay — never None after capture.
    gateway_response = Column(Text, nullable=True)

    # ── Webhook ───────────────────────────────────────────────────────────
    webhook_verified    = Column(Boolean, nullable=False, default=False)
    last_webhook_event  = Column(String(100), nullable=True)
    last_webhook_at     = Column(DateTime(timezone=True), nullable=True)
    webhook_event_count = Column(Integer, nullable=False, default=0)

    # ── Idempotency (dedup retries) ───────────────────────────────────────
    idempotency_key = Column(String(255), nullable=True, unique=True, index=True)

    # ── Refund tracking ───────────────────────────────────────────────────
    refund_id     = Column(String(255), nullable=True)
    refund_amount = Column(Integer, nullable=True, default=0)
    refunded_at   = Column(DateTime(timezone=True), nullable=True)

    # ── Relationships ─────────────────────────────────────────────────────
    order = relationship("Order", back_populates="payment")
    user  = relationship("User", backref="payments")


class WebhookEvent(Base, TimestampMixin):
    """
    Audit log for every Razorpay webhook event received.
    razorpay_event_id uniqueness prevents double-processing on retries.
    """
    __tablename__ = "webhook_events"

    id = Column(Integer, primary_key=True, index=True)

    # Razorpay sends a unique event ID in every webhook payload.
    razorpay_event_id = Column(String(255), unique=True, nullable=False, index=True)

    event_type      = Column(String(100), nullable=False)
    processed       = Column(Boolean, nullable=False, default=False)
    payload_summary = Column(Text, nullable=True)
    error_message   = Column(Text, nullable=True)
