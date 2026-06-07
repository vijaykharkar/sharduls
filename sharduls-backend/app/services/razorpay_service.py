"""
Razorpay service — pure SDK wrapper with no database dependencies.

Responsibilities:
- Create Razorpay orders via the Razorpay API.
- Verify payment signatures (frontend callback verification).
- Verify webhook signatures (inbound webhook verification).
- Initiate refunds via the Razorpay API.

SECURITY:
- RAZORPAY_SECRET is used only for HMAC-SHA256 signature generation/verification.
- It is NEVER included in any response returned to the frontend.
- All amounts originate from the DB (server-side) — never from client input.
- SignatureVerificationError is raised on tampered payloads; callers must treat
  this as a security event and return HTTP 400 (not 500).
"""
import hashlib
import hmac
import json
import logging
from typing import Any, Optional

from app.core.config import settings
from app.core.razorpay_client import get_razorpay

logger = logging.getLogger(__name__)


class RazorpaySignatureError(Exception):
    """Raised when a payment or webhook signature fails verification."""


# ── Order Creation ────────────────────────────────────────────────────────────

def create_razorpay_order(
    *,
    amount:          int,
    currency:        str,
    receipt:         str,
    notes:           Optional[dict] = None,
) -> dict:
    """
    Call Razorpay Orders API to create a new order.

    Args:
        amount:   Total in paise (smallest INR unit). E.g. ₹100 = 10000.
        currency: ISO 4217 code. Razorpay only supports "INR" currently.
        receipt:  Merchant-defined order reference (e.g. order_number). Max 40 chars.
        notes:    Optional key-value metadata stored on the Razorpay order.

    Returns:
        Full Razorpay order dict including id, amount, currency, status.

    Raises:
        Exception: Propagated from Razorpay SDK on API or network failure.
    """
    client = get_razorpay()
    payload: dict[str, Any] = {
        "amount":   amount,
        "currency": currency,
        "receipt":  receipt[:40],  # Razorpay max receipt length = 40
    }
    if notes:
        payload["notes"] = notes

    rzp_order = client.order.create(data=payload)
    logger.info(
        "Razorpay order created: rzp_order_id=%s amount=%s currency=%s",
        rzp_order.get("id"), amount, currency,
    )
    return rzp_order


# ── Payment Signature Verification ───────────────────────────────────────────

def verify_payment_signature(
    *,
    razorpay_order_id:   str,
    razorpay_payment_id: str,
    razorpay_signature:  str,
) -> None:
    """
    Verify the HMAC-SHA256 signature returned by Razorpay Checkout.

    Razorpay signs:  razorpay_order_id + "|" + razorpay_payment_id
    Using key:       RAZORPAY_SECRET

    This MUST be called before marking a payment as captured.
    If verification fails, raise RazorpaySignatureError — the payment must
    NOT be captured and the event must be logged as a security alert.

    Raises:
        RazorpaySignatureError: Signature does not match — possible tampering.
    """
    message = f"{razorpay_order_id}|{razorpay_payment_id}"
    expected = hmac.new(
        settings.RAZORPAY_SECRET.encode("utf-8"),
        message.encode("utf-8"),
        hashlib.sha256,
    ).hexdigest()

    if not hmac.compare_digest(expected, razorpay_signature):
        logger.warning(
            "Payment signature verification FAILED — possible tampering. "
            "razorpay_order_id=%s razorpay_payment_id=%s",
            razorpay_order_id, razorpay_payment_id,
        )
        raise RazorpaySignatureError("Payment signature verification failed")

    logger.info(
        "Payment signature verified: razorpay_order_id=%s razorpay_payment_id=%s",
        razorpay_order_id, razorpay_payment_id,
    )


# ── Webhook Signature Verification ───────────────────────────────────────────

def verify_webhook_signature(*, raw_body: bytes, signature: str) -> dict:
    """
    Verify an inbound Razorpay webhook and return the parsed payload.

    Razorpay signs the raw request body using RAZORPAY_WEBHOOK_SECRET.
    The signature is in the X-Razorpay-Signature header.

    WHY raw_body (not parsed JSON):
      Re-serialising a parsed dict may produce different byte sequences
      (e.g. key ordering, whitespace), causing verification to fail even
      for a legitimate request.

    Raises:
        RazorpaySignatureError: Signature mismatch — reject the webhook.
        ValueError: Body is not valid JSON.
    """
    expected = hmac.new(
        settings.RAZORPAY_WEBHOOK_SECRET.encode("utf-8"),
        raw_body,
        hashlib.sha256,
    ).hexdigest()

    if not hmac.compare_digest(expected, signature):
        logger.warning("Webhook signature verification FAILED — payload rejected")
        raise RazorpaySignatureError("Webhook signature verification failed")

    payload = json.loads(raw_body)
    logger.info(
        "Webhook signature verified: event=%s id=%s",
        payload.get("event"), payload.get("payload", {}).get("payment", {}).get("entity", {}).get("id"),
    )
    return payload


# ── Refund ────────────────────────────────────────────────────────────────────

def create_refund(
    *,
    razorpay_payment_id: str,
    amount_paise:        Optional[int] = None,
    notes:               Optional[dict] = None,
) -> dict:
    """
    Initiate a Razorpay refund for a captured payment.

    Args:
        razorpay_payment_id: The Razorpay payment ID (pay_*).
        amount_paise:        Amount in paise. Omit for full refund.
        notes:               Optional metadata.

    Returns:
        Razorpay refund object dict.

    Raises:
        Exception: Propagated from Razorpay SDK on API failure.
    """
    client = get_razorpay()
    payload: dict[str, Any] = {}
    if amount_paise:
        payload["amount"] = amount_paise
    if notes:
        payload["notes"] = notes

    refund = client.payment.refund(razorpay_payment_id, payload)
    logger.info(
        "Razorpay refund created: refund_id=%s payment_id=%s amount=%s",
        refund.get("id"), razorpay_payment_id, refund.get("amount"),
    )
    return refund


# ── Payment Fetch (for status sync) ──────────────────────────────────────────

def fetch_razorpay_payment(razorpay_payment_id: str) -> dict:
    """Fetch live payment details from Razorpay API."""
    client = get_razorpay()
    return client.payment.fetch(razorpay_payment_id)
