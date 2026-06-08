"""
Order API routes.

Endpoints:
  POST   /orders/checkout       — Create order + Razorpay order (returns razorpay_order_id)
  GET    /orders                — List current user's orders
  GET    /orders/{order_id}     — Order detail
  GET    /orders/{order_id}/payment-status — Payment status for an order

Payment verification and refund are handled by /api/v1/payments.py.
"""
import logging
from typing import Optional, List

from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel, Field, field_validator
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import get_current_user, require_roles
from app.schemas.response import success_response
from app.services import payment_service as psvc

logger = logging.getLogger(__name__)

router = APIRouter(tags=["Orders & Payments"])

buyer_dep = require_roles("buyer")
admin_dep = require_roles("admin", "superadmin")


# ── Request Schemas ────────────────────────────────────────────────────────

class CartItemSchema(BaseModel):
    product_id: int = Field(..., gt=0)
    quantity: int = Field(..., ge=1, le=100)


class ShippingAddressSchema(BaseModel):
    label: Optional[str] = None
    address_line1: str = Field(..., min_length=1, max_length=255)
    address_line2: Optional[str] = Field(None, max_length=255)
    city: str = Field(..., min_length=1, max_length=100)
    state: str = Field(..., min_length=1, max_length=100)
    pincode: str = Field(..., min_length=5, max_length=10)
    country: str = Field(default="India", max_length=100)
    phone: Optional[str] = Field(None, max_length=20)


class CheckoutRequest(BaseModel):
    items: List[CartItemSchema] = Field(..., min_length=1, max_length=50)
    shipping_address: ShippingAddressSchema
    payment_method: str = Field(default="online")

    @field_validator("items")
    @classmethod
    def no_duplicate_products(cls, v):
        ids = [i.product_id for i in v]
        if len(ids) != len(set(ids)):
            raise ValueError("Duplicate product IDs in cart")
        return v

    @field_validator("payment_method")
    @classmethod
    def valid_payment_method(cls, v):
        if v not in ("online", "cod"):
            raise ValueError("payment_method must be 'online' or 'cod'")
        return v


# ── Buyer Endpoints ────────────────────────────────────────────────────────

@router.post("/orders/checkout")
def checkout(
    payload: CheckoutRequest,
    db: Session = Depends(get_db),
    user=Depends(buyer_dep),
):
    """
    Create an order and a Razorpay order.
    Returns razorpay_order_id + razorpay_key_id for frontend Razorpay Checkout.
    After the user pays, call POST /payments/verify to capture.
    """
    result = psvc.create_order_with_payment(
        db,
        user_id=user.id,
        cart_items=[item.model_dump() for item in payload.items],
        shipping_address=payload.shipping_address.model_dump(),
        payment_method=payload.payment_method,
    )
    return success_response(data=result, message="Checkout initiated")


@router.get("/orders")
def list_orders(
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=50),
    db: Session = Depends(get_db),
    user=Depends(buyer_dep),
):
    orders = psvc.get_user_orders(db, user.id, skip, limit)
    return success_response(data=orders, message="Orders")


@router.get("/orders/{order_id}")
def order_detail(
    order_id: int,
    db: Session = Depends(get_db),
    user=Depends(buyer_dep),
):
    data = psvc.get_order_detail(db, user.id, order_id)
    if not data:
        raise HTTPException(404, "Order not found")
    return success_response(data=data, message="Order detail")


@router.get("/orders/{order_id}/payment-status")
def payment_status(
    order_id: int,
    db: Session = Depends(get_db),
    user=Depends(buyer_dep),
):
    """Current payment status for an order."""
    data = psvc.get_payment_status(db, user.id, order_id)
    if not data:
        raise HTTPException(404, "Payment not found")
    return success_response(data=data, message="Payment status")


