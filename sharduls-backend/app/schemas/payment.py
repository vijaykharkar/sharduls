"""
Pydantic v2 schemas for the Razorpay payment API.

Naming conventions:
  *Request  — inbound payload validated from the client.
  *Response — outbound data sent back to the client.

SECURITY NOTES:
  - CreateOrderResponse includes RAZORPAY_KEY_ID (public) but NEVER the secret.
  - VerifyPaymentRequest accepts razorpay_payment_id and razorpay_signature
    from the Razorpay Checkout callback — the backend re-verifies the HMAC
    before trusting these values.
  - Amount is NEVER accepted from the frontend; it is always read from the DB.
"""
from typing import Optional, List
from pydantic import BaseModel, Field, field_validator


# ── Checkout / Order Creation ────────────────────────────────────────────────

class CartItemRequest(BaseModel):
    product_id: int  = Field(..., gt=0)
    quantity:   int  = Field(..., ge=1, le=100)


class ShippingAddressRequest(BaseModel):
    label:         Optional[str] = Field(None, max_length=50)
    address_line1: str           = Field(..., min_length=1, max_length=255)
    address_line2: Optional[str] = Field(None, max_length=255)
    city:          str           = Field(..., min_length=1, max_length=100)
    state:         str           = Field(..., min_length=1, max_length=100)
    pincode:       str           = Field(..., min_length=5, max_length=10)
    country:       str           = Field(default="India", max_length=100)
    phone:         Optional[str] = Field(None, max_length=20)


class CreateOrderRequest(BaseModel):
    items:            List[CartItemRequest]  = Field(..., min_length=1, max_length=50)
    shipping_address: ShippingAddressRequest

    @field_validator("items")
    @classmethod
    def no_duplicate_products(cls, v: List[CartItemRequest]) -> List[CartItemRequest]:
        ids = [i.product_id for i in v]
        if len(ids) != len(set(ids)):
            raise ValueError("Duplicate product IDs in cart")
        return v


class CreateOrderResponse(BaseModel):
    """
    Returned to frontend after a Razorpay order is created.
    Frontend uses these fields to open the Razorpay Checkout modal.
    """
    order_id:           int    # internal DB order id
    order_number:       str
    razorpay_order_id:  str    # rzp_order_* — passed to Razorpay Checkout
    razorpay_key_id:    str    # public key — safe to expose
    amount:             int    # in paise
    currency:           str
    payment_id:         int    # internal DB payment id


# ── Payment Verification ─────────────────────────────────────────────────────

class VerifyPaymentRequest(BaseModel):
    """
    Payload sent by the frontend after Razorpay Checkout succeeds.
    All three fields are required for HMAC-SHA256 signature verification.
    """
    razorpay_order_id:   str = Field(..., min_length=1)
    razorpay_payment_id: str = Field(..., min_length=1)
    razorpay_signature:  str = Field(..., min_length=1)


class VerifyPaymentResponse(BaseModel):
    payment_id:   int
    order_id:     int
    order_number: str
    status:       str
    amount:       int
    currency:     str
    message:      str


# ── Payment Detail ────────────────────────────────────────────────────────────

class PaymentDetailResponse(BaseModel):
    id:                    int
    order_id:              int
    razorpay_order_id:     str
    razorpay_payment_id:   Optional[str]
    amount:                int
    currency:              str
    status:                str
    payment_method:        Optional[str]
    webhook_verified:      bool
    failure_reason:        Optional[str]
    refund_amount:         Optional[int]
    refunded_at:           Optional[str]
    created_at:            str


# ── Payment History ───────────────────────────────────────────────────────────

class PaymentHistoryItem(BaseModel):
    id:                  int
    order_id:            int
    order_number:        str
    razorpay_order_id:   str
    razorpay_payment_id: Optional[str]
    amount:              int
    currency:            str
    status:              str
    payment_method:      Optional[str]
    webhook_verified:    bool
    created_at:          str


# ── Refund ────────────────────────────────────────────────────────────────────

class RefundRequest(BaseModel):
    amount_paise: Optional[int] = Field(None, gt=0, description="Omit for full refund.")
    reason:       str           = Field(default="", max_length=500)


class RefundResponse(BaseModel):
    refund_id:    str
    amount:       int
    status:       str
    order_id:     int
