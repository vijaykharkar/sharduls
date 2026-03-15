from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.repositories import user_repo
from app.core.security import verify_password, validate_password_strength, decode_token, create_tokens
from app.schemas.user import (
    UserCreate, UserLogin, EmailPasswordLogin,
    PhoneOTPLogin, EmailOTPLogin, UserRole
)
from app.models.user import User
from app.services import otp_service
from app.utils import email as email_utils
from datetime import datetime


def register(db: Session, user_data: UserCreate) -> dict:
    """Register a new user with role-based registration."""
    if user_data.email:
        existing_user = user_repo.get_by_email(db, user_data.email)
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )

    if user_data.phone:
        existing_user = user_repo.get_by_phone(db, user_data.phone)
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Phone number already registered"
            )

    is_valid, message = validate_password_strength(user_data.password)
    if not is_valid:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=message
        )

    user = user_repo.create_user(
        db=db,
        email=user_data.email,
        password=user_data.password,
        full_name=user_data.full_name,
        phone=user_data.phone,
        role=user_data.role
    )

    if user.email:
        try:
            email_utils.send_welcome_email(user.email, user.full_name)
        except Exception as e:
            print(f"Failed to send welcome email: {e}")

    tokens = create_tokens(user.id, user.email or user.phone)

    return {
        **tokens,
        "user": user
    }


def login_email_password(db: Session, credentials: EmailPasswordLogin) -> dict:
    """Login user with email and password."""
    user = user_repo.get_by_email(db, credentials.email)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    if credentials.role and user.role != credentials.role:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"Invalid credentials for {credentials.role.value} login"
        )

    if not verify_password(credentials.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Account is inactive"
        )

    user.last_login = datetime.utcnow()
    db.commit()

    tokens = create_tokens(user.id, user.email)

    return {
        **tokens,
        "user": user
    }


def login_phone_otp(db: Session, credentials: PhoneOTPLogin) -> dict:
    """Login user with phone and OTP."""
    otp_service.verify_otp(credentials.phone, credentials.otp)

    user = user_repo.get_by_phone(db, credentials.phone)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Phone number not registered"
        )

    if credentials.role and user.role != credentials.role:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"Invalid credentials for {credentials.role.value} login"
        )

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Account is inactive"
        )

    user.last_login = datetime.utcnow()
    db.commit()

    tokens = create_tokens(user.id, user.phone)

    return {
        **tokens,
        "user": user
    }


def login_email_otp(db: Session, credentials: EmailOTPLogin) -> dict:
    """Login user with email and OTP."""
    otp_service.verify_otp(credentials.email, credentials.otp)

    user = user_repo.get_by_email(db, credentials.email)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email not registered"
        )

    if credentials.role and user.role != credentials.role:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"Invalid credentials for {credentials.role.value} login"
        )

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Account is inactive"
        )

    user.last_login = datetime.utcnow()
    db.commit()

    tokens = create_tokens(user.id, user.email)

    return {
        **tokens,
        "user": user
    }


def login(db: Session, credentials: UserLogin) -> dict:
    """Legacy login method - supports email/password only."""
    email_password_creds = EmailPasswordLogin(
        email=credentials.email,
        password=credentials.password
    )
    return login_email_password(db, email_password_creds)


def refresh_token(db: Session, token: str) -> dict:
    """Refresh access token."""
    try:
        payload = decode_token(token)

        if payload.get("type") != "refresh":
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token type"
            )

        user_id = int(payload.get("sub"))
        user = user_repo.get_by_id(db, user_id)

        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="User not found"
            )

        tokens = create_tokens(user.id, user.email or user.phone)

        return tokens
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid refresh token"
        )


def get_current_user(db: Session, token_payload: dict) -> User:
    """Get current user from token payload."""
    user_id = int(token_payload.get("sub"))
    user = user_repo.get_by_id(db, user_id)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found"
        )

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Account is inactive"
        )

    return user
