"""
Razorpay Payment API routes.

Endpoints:
  POST  /payments/verify         — Verify + capture after Razorpay Checkout succeeds
  GET   /payments/history        — Buyer's paginated payment history
  GET   /payments/{payment_id}   — Single payment detail
  POST  /orders/{order_id}/refund — Admin-initiated refund (kept here for payment concern)
"""
import logging
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import get_current_user, require_roles
from app.schemas.payment import (
    VerifyPaymentRequest,
    VerifyPaymentResponse,
    PaymentDetailResponse,
    PaymentHistoryItem,
    RefundRequest,
    RefundResponse,
)
from app.schemas.response import success_response
from app.services import payment_service as psvc
from app.repositories import payment_repository as pay_repo
from app.repositories import order_repository as order_repo

logger = logging.getLogger(__name__)

router = APIRouter(tags=["Payments"])

buyer_dep = require_roles("buyer")
admin_dep = require_roles("admin", "superadmin")


# ── Buyer: Verify Payment ─────────────────────────────────────────────────

@router.post("/payments/verify")
def verify_payment(
    payload: VerifyPaymentRequest,
    db: Session = Depends(get_db),
    user=Depends(buyer_dep),
):
    """
    Called immediately after Razorpay Checkout modal closes with success.

    The frontend receives razorpay_order_id, razorpay_payment_id, and
    razorpay_signature from the Razorpay Checkout handler.  This endpoint
    verifies the HMAC-SHA256 signature before marking the payment captured.

    SECURITY:
    - Signature is re-verified server-side; frontend values are never trusted.
    - Returns 400 on any signature mismatch — do not reveal further details.
    """
    result = psvc.verify_and_capture_payment(
        db,
        razorpay_order_id=payload.razorpay_order_id,
        razorpay_payment_id=payload.razorpay_payment_id,
        razorpay_signature=payload.razorpay_signature,
    )
    return success_response(data=result, message="Payment verified and captured")


# ── Buyer: Payment History ────────────────────────────────────────────────

@router.get("/payments/history")
def payment_history(
    skip:  int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=50),
    db:    Session = Depends(get_db),
    user=Depends(buyer_dep),
):
    """Paginated list of the current buyer's payments, newest first."""
    payments = pay_repo.get_user_payments(db, user.id, skip=skip, limit=limit)
    items = []
    for p in payments:
        order = order_repo.get_order_by_id(db, p.order_id)
        items.append({
            "id":                  p.id,
            "order_id":            p.order_id,
            "order_number":        order.order_number if order else None,
            "razorpay_order_id":   p.razorpay_order_id,
            "razorpay_payment_id": p.razorpay_payment_id,
            "amount":              p.amount,
            "currency":            p.currency,
            "status":              p.status,
            "payment_method":      p.payment_method,
            "webhook_verified":    p.webhook_verified,
            "created_at":          p.created_at.isoformat() if p.created_at else None,
        })
    return success_response(data=items, message="Payment history")


# ── Buyer: Payment Detail ─────────────────────────────────────────────────

@router.get("/payments/{payment_id}")
def payment_detail(
    payment_id: int,
    db: Session = Depends(get_db),
    user=Depends(buyer_dep),
):
    """Fetch a single payment record. Buyers can only view their own payments."""
    payment = pay_repo.get_payment_by_id(db, payment_id)
    if not payment or payment.user_id != user.id:
        raise HTTPException(404, "Payment not found")
    return success_response(
        data={
            "id":                    payment.id,
            "order_id":              payment.order_id,
            "razorpay_order_id":     payment.razorpay_order_id,
            "razorpay_payment_id":   payment.razorpay_payment_id,
            "amount":                payment.amount,
            "currency":              payment.currency,
            "status":                payment.status,
            "payment_method":        payment.payment_method,
            "webhook_verified":      payment.webhook_verified,
            "failure_reason":        payment.failure_reason,
            "refund_amount":         payment.refund_amount,
            "refunded_at":           payment.refunded_at.isoformat() if payment.refunded_at else None,
            "created_at":            payment.created_at.isoformat() if payment.created_at else None,
        },
        message="Payment detail",
    )


# ── Admin: Refund ─────────────────────────────────────────────────────────

@router.post("/orders/{order_id}/refund")
def refund_order(
    order_id: int,
    payload:  RefundRequest,
    db:       Session = Depends(get_db),
    user=Depends(admin_dep),
):
    """
    Initiate a Razorpay refund for a captured payment.
    Amount defaults to full refund if amount_paise is omitted.
    """
    result = psvc.initiate_refund(
        db,
        user_id=user.id,
        order_id=order_id,
        amount_paise=payload.amount_paise,
        reason=payload.reason,
    )
    return success_response(data=result, message="Refund initiated")
