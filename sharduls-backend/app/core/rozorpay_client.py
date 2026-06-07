"""
Centralized Razorpay SDK client.

WHY a dedicated module:
- Single place to initialise the Razorpay client with credentials.
- Easy to mock/patch in tests without touching service code.
- Prevents accidental use of wrong key or secret.

SECURITY:
- RAZORPAY_SECRET is loaded exclusively from environment via Settings.
- It is NEVER forwarded to the frontend — only RAZORPAY_KEY_ID is public.
"""
import logging
import razorpay
from app.core.config import settings

logger = logging.getLogger(__name__)

_client: razorpay.Client | None = None


def get_razorpay() -> razorpay.Client:
    """
    Return a shared, lazily-initialised Razorpay client.

    Using a module-level singleton avoids creating a new HTTP session on
    every request while remaining straightforward to replace in tests:

        monkeypatch.setattr("app.core.razorpay_client._client", mock_client)
    """
    global _client
    if _client is None:
        if not settings.RAZORPAY_KEY_ID or not settings.RAZORPAY_SECRET:
            raise RuntimeError(
                "RAZORPAY_KEY_ID and RAZORPAY_SECRET must be set before "
                "the Razorpay client can be used."
            )
        _client = razorpay.Client(
            auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_SECRET)
        )
        logger.info("Razorpay client initialised (key_id=%s…)", settings.RAZORPAY_KEY_ID[:8])
    return _client
