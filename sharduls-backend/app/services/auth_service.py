import random
import string
from datetime import datetime, timedelta, timezone

from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.security import (
    hash_password,
    verify_password,
    validate_password_strength,
    create_access_token,
    create_refresh_token,
    decode_token,
)
from app.core.errors import raise_error
import app.repositories.user_repository as repo
from app.schemas.user import (
    UserCreate,
    EmailPasswordLogin,
    VerifyOTP,
    UserResponse,
    TokenResponse,
)


# --------------- Helpers ---------------

def _generate_otp() -> str:
    return "".join(random.choices(string.digits, k=settings.OTP_LENGTH))


def _issue_tokens(db: Session, user) -> dict:
    token_data = {"sub": str(user.id), "role": user.role.value}
    access = create_access_token(token_data)
    refresh = create_refresh_token(token_data)
    repo.set_user_refresh_token(db, user, hash_password(refresh))
    return TokenResponse(access_token=access, refresh_token=refresh).model_dump()


# --------------- Register ---------------

def register(db: Session, payload: UserCreate) -> dict:
    pw_err = validate_password_strength(payload.password)
    if pw_err:
        raise_error('BAD_REQUEST', pw_err)

    if repo.email_exists(db, payload.email):
        raise_error('CONFLICT', 'Email already registered')
    if payload.phone and repo.phone_exists(db, payload.phone):
        raise_error('CONFLICT', 'Phone number already registered')

    user = repo.create_user(
        db,
        full_name=payload.full_name,
        email=payload.email,
        phone=payload.phone,
        password_hash=hash_password(payload.password),
        role=payload.role,
    )

    tokens = _issue_tokens(db, user)
    return {
        "user": UserResponse.model_validate(user).model_dump(),
        "tokens": tokens,
    }


# --------------- Password Login ---------------

def login_password(db: Session, payload: EmailPasswordLogin) -> dict:
    user = repo.get_user_by_email(db, payload.email)
    if not user or not user.password_hash:
        raise_error('UNAUTHORIZED', 'Invalid email or password')
    if not verify_password(payload.password, user.password_hash):
        raise_error('UNAUTHORIZED', 'Invalid email or password')
    if not user.is_active:
        raise_error('UNAUTHORIZED', 'Account is deactivated')

    tokens = _issue_tokens(db, user)
    return {
        "user": UserResponse.model_validate(user).model_dump(),
        "tokens": tokens,
    }


# --------------- OTP Send ---------------

def send_otp(db: Session, identifier: str) -> dict:
    """Send OTP to email or phone. In production, deliver via SMS/email provider."""
    user = repo.get_user_by_email(db, identifier) or repo.get_user_by_phone(db, identifier)
    if not user:
        raise_error('NOT_FOUND', 'No account found with this email or phone')
    if not user.is_active:
        raise_error('UNAUTHORIZED', 'Account is deactivated')

    otp_code = _generate_otp()
    expires_at = datetime.now(timezone.utc) + timedelta(minutes=settings.OTP_EXPIRE_MINUTES)
    repo.set_user_otp(db, user, otp_code, expires_at)

    # TODO: integrate actual SMS/email sending service
    return {
        "message": "OTP sent successfully",
        "expires_in_minutes": settings.OTP_EXPIRE_MINUTES,
        **({"otp": otp_code} if settings.DEBUG else {}),
    }


# --------------- OTP Verify / Login ---------------

def verify_otp(db: Session, payload: VerifyOTP) -> dict:
    user = (
        repo.get_user_by_email(db, payload.identifier)
        or repo.get_user_by_phone(db, payload.identifier)
    )
    if not user:
        raise_error('NOT_FOUND', 'No account found')
    if not user.is_active:
        raise_error('UNAUTHORIZED', 'Account is deactivated')
    if not user.otp_code or user.otp_code != payload.otp:
        raise_error('BAD_REQUEST', 'Invalid OTP')
    if user.otp_expires_at and user.otp_expires_at < datetime.now(timezone.utc):
        raise_error('BAD_REQUEST', 'OTP has expired')

    repo.clear_user_otp(db, user)

    if not user.is_verified:
        repo.update_user(db, user, is_verified=True)

    tokens = _issue_tokens(db, user)
    return {
        "user": UserResponse.model_validate(user).model_dump(),
        "tokens": tokens,
    }


# --------------- Refresh Token ---------------

def refresh_token(db: Session, token: str) -> dict:
    try:
        token_payload = decode_token(token)
    except Exception:
        raise_error('UNAUTHORIZED', 'Invalid or expired refresh token')

    if token_payload.get("type") != "refresh":
        raise_error('UNAUTHORIZED', 'Invalid token type')

    user_id = token_payload.get("sub")
    if not user_id:
        raise_error('UNAUTHORIZED', 'Invalid token payload')

    user = repo.get_user_by_id(db, int(user_id))
    if not user:
        raise_error('UNAUTHORIZED', 'User not found')
    if not user.is_active:
        raise_error('UNAUTHORIZED', 'Account is deactivated')

    if not user.refresh_token or not verify_password(token, user.refresh_token):
        raise_error('UNAUTHORIZED', 'Refresh token revoked')

    tokens = _issue_tokens(db, user)
    return {
        "user": UserResponse.model_validate(user).model_dump(),
        "tokens": tokens,
    }


# --------------- Logout ---------------

def logout(db: Session, user) -> dict:
    repo.set_user_refresh_token(db, user, None)
    return {"message": "Logged out successfully"}
