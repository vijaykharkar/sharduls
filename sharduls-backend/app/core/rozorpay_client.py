"""
DEPRECATED: This file had a typo in the name (rozorpay → razorpay).
Use app.core.razorpay_client instead. This re-export exists only to
avoid breaking any stale imports.
"""
from app.core.razorpay_client import get_razorpay  # noqa: F401
