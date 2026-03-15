from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.repositories import user_repo
from app.core.security import validate_password_strength, get_password_hash, create_tokens
from app.services import otp_service
from app.utils import email as email_utils
from app.schemas.supplier import SupplierStep1, SupplierStep2, SupplierStep3
from app.models.user import User, UserRole, UserBusinessProfile
from datetime import datetime

# Temporary storage for multi-step registration data (use Redis in production)
_registration_cache = {}


def step1_personal_info(data: SupplierStep1) -> dict:
    """Step 1: Collect personal info and send OTP to phone."""
    _registration_cache[data.phone] = {
        "first_name": data.first_name,
        "last_name": data.last_name,
        "phone": data.phone,
        "email": data.email,
        "phone_verified": False,
        "step2_complete": False,
    }

    result = otp_service.send_phone_otp(data.phone)

    return {
        "message": f"OTP sent to {data.phone}. Please verify to continue.",
        "otp_expires_in": result["expires_in"],
    }


def verify_phone_otp(phone: str, otp: str) -> dict:
    """Verify phone OTP for step 1."""
    cached = _registration_cache.get(phone)
    if not cached:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Registration session not found. Please start from step 1.",
        )

    otp_service.verify_otp(phone, otp)
    cached["phone_verified"] = True

    return {"message": "Phone verified successfully. Proceed to step 2."}


def step2_business_details(db: Session, data: SupplierStep2) -> dict:
    """Step 2: Collect business details."""
    cached = _registration_cache.get(data.phone)
    if not cached:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Registration session not found. Please start from step 1.",
        )

    if not cached.get("phone_verified"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Phone not verified. Please complete step 1.",
        )

    existing = db.query(User).filter(User.gstin == data.gstin).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="GSTIN already registered.",
        )

    cached["business_model"] = data.business_model.value
    cached["products_to_sell"] = ",".join(data.products_to_sell)
    cached["gstin"] = data.gstin
    cached["step2_complete"] = True

    return {"message": "Business details saved. Please create your password."}


def step3_create_account(db: Session, data: SupplierStep3) -> dict:
    """Step 3: Create password and finalize registration."""
    cached = _registration_cache.get(data.phone)
    if not cached:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Registration session not found. Please start from step 1.",
        )

    if not cached.get("phone_verified"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Phone not verified.",
        )

    if not cached.get("step2_complete"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Business details not completed. Please complete step 2.",
        )

    if data.password != data.confirm_password:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Passwords do not match.",
        )

    is_valid, message = validate_password_strength(data.password)
    if not is_valid:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=message,
        )

    existing_email = user_repo.get_by_email(db, cached["email"])
    if existing_email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered.",
        )

    existing_phone = user_repo.get_by_phone(db, cached["phone"])
    if existing_phone:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Phone number already registered.",
        )

    full_name = f"{cached['first_name']} {cached['last_name']}"
    password_hash = get_password_hash(data.password)

    user = User(
        email=cached["email"],
        phone=cached["phone"],
        password_hash=password_hash,
        full_name=full_name,
        role=UserRole.SELLER,
        is_phone_verified=True,
        gstin=cached.get("gstin"),
        business_entity_type=cached.get("business_model"),
        approval_status="pending",
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    business_profile = UserBusinessProfile(
        user_id=user.id,
        business_name=full_name,
        business_type=cached.get("business_model"),
        gstin=cached.get("gstin"),
    )
    db.add(business_profile)
    db.commit()

    del _registration_cache[data.phone]

    try:
        email_utils.send_welcome_email(user.email, user.full_name)
    except Exception as e:
        print(f"Failed to send welcome email: {e}")

    tokens = create_tokens(user.id, user.email)

    return {
        "access_token": tokens["access_token"],
        "refresh_token": tokens["refresh_token"],
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "email": user.email,
            "phone": user.phone,
            "full_name": user.full_name,
            "role": user.role.value,
        },
    }
