"""
Razorpay Webhook endpoint.

SECURITY:
- Reads raw request body (NOT parsed JSON) for HMAC-SHA256 signature verification.
- Verifies X-Razorpay-Signature using RAZORPAY_WEBHOOK_SECRET before processing.
- Returns 200 even on internal processing errors so Razorpay does not retry a
  request that we received but failed to process (we log+record it instead).
- Duplicate event IDs are silently acknowledged (idempotent processing).

WHY raw body:
  Re-serialising a parsed JSON dict may produce different byte sequences
  (key ordering, whitespace), making the HMAC mismatch even for valid events.
"""
import logging

from fastapi import APIRouter, Depends, Request, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.services import payment_service as psvc
from app.services.razorpay_service import (
    RazorpaySignatureError,
    verify_webhook_signature,
)

logger = logging.getLogger(__name__)

router = APIRouter(tags=["Webhooks"])


@router.post("/webhooks/razorpay")
async def razorpay_webhook(request: Request, db: Session = Depends(get_db)):
    """
    Razorpay webhook receiver.

    Razorpay sends a POST to this URL for events such as:
      payment.authorized, payment.captured, payment.failed,
      order.paid, refund.created, refund.processed

    Configure this URL in Razorpay Dashboard → Settings → Webhooks.
    The webhook secret must match RAZORPAY_WEBHOOK_SECRET in .env.
    """
    raw_body   = await request.body()
    sig_header = request.headers.get("x-razorpay-signature")

    if not sig_header:
        logger.warning("Razorpay webhook received without X-Razorpay-Signature header")
        raise HTTPException(400, "Missing X-Razorpay-Signature header")

    if not raw_body:
        raise HTTPException(400, "Empty webhook body")

    try:
        payload = verify_webhook_signature(raw_body=raw_body, signature=sig_header)
    except RazorpaySignatureError as e:
        logger.warning("Razorpay webhook signature verification failed: %s", e)
        raise HTTPException(400, "Invalid webhook signature")
    except ValueError as e:
        logger.warning("Razorpay webhook JSON parse error: %s", e)
        raise HTTPException(400, "Invalid JSON payload")

    event_type = payload.get("event", "unknown")
    logger.info("Received Razorpay webhook event: %s", event_type)

    try:
        result = psvc.process_webhook_event(db, payload)
        logger.info("Webhook processing result: %s", result)
        return {"received": True, "result": result}
    except Exception as exc:
        # ALWAYS return 200 for valid-signature webhooks so Razorpay does NOT retry.
        # The error is logged and can be investigated manually.
        logger.exception("Webhook processing failed for event %s: %s", event_type, exc)
        return {"received": True, "result": {"status": "error", "detail": str(exc)[:200]}}
