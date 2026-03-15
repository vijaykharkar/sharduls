from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.services import supplier_service, auth_service
from app.repositories import user_repo
from app.core.security import verify_password, create_tokens
from app.schemas.supplier import (
    SupplierStep1, SupplierStep2, SupplierStep3,
    SupplierVerifyOTP, SupplierPhoneLogin, SupplierEmailLogin,
    SupplierStep1Response, SupplierStep2Response, SupplierRegisterResponse,
    ProductCategoriesResponse, PRODUCT_CATEGORIES,
)
from app.schemas.user import AuthResponse, UserResponse, EmailPasswordLogin, UserRole
from datetime import datetime

router = APIRouter()


# ==================== ONBOARDING ====================

@router.post("/onboarding/step1", response_model=SupplierStep1Response)
async def supplier_step1(data: SupplierStep1):
    """
    Step 1: Collect personal info (first name, last name, phone, email).
    Sends OTP to phone number for verification.
    """
    result = supplier_service.step1_personal_info(data)
    return result


@router.post("/onboarding/verify-otp")
async def supplier_verify_otp(data: SupplierVerifyOTP):
    """
    Verify phone OTP sent during step 1.
    """
    result = supplier_service.verify_phone_otp(data.phone, data.otp)
    return result


@router.post("/onboarding/step2", response_model=SupplierStep2Response)
async def supplier_step2(data: SupplierStep2, db: Session = Depends(get_db)):
    """
    Step 2: Collect business details (business model, products, GSTIN).
    """
    result = supplier_service.step2_business_details(db, data)
    return result


@router.post("/onboarding/step3", response_model=SupplierRegisterResponse, status_code=status.HTTP_201_CREATED)
async def supplier_step3(data: SupplierStep3, db: Session = Depends(get_db)):
    """
    Step 3: Create password and finalize supplier registration.
    Returns JWT tokens upon successful registration.
    """
    result = supplier_service.step3_create_account(db, data)
    return result


# ==================== LOGIN ====================

@router.post("/login/phone", response_model=AuthResponse)
async def supplier_login_phone(credentials: SupplierPhoneLogin, db: Session = Depends(get_db)):
    """
    Supplier login with phone number and password.
    """
    user = user_repo.get_by_phone(db, credentials.phone)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid phone or password")

    if user.role != UserRole.SELLER:
        raise HTTPException(status_code=403, detail="Not a supplier account")

    if not verify_password(credentials.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid phone or password")

    if not user.is_active:
        raise HTTPException(status_code=403, detail="Account is inactive")

    user.last_login = datetime.utcnow()
    db.commit()

    tokens = create_tokens(user.id, user.email or user.phone)
    return AuthResponse(
        access_token=tokens["access_token"],
        refresh_token=tokens["refresh_token"],
        token_type="bearer",
        user=UserResponse.from_orm(user),
    )


@router.post("/login/email", response_model=AuthResponse)
async def supplier_login_email(credentials: SupplierEmailLogin, db: Session = Depends(get_db)):
    """
    Supplier login with email and password.
    """
    email_creds = EmailPasswordLogin(
        email=credentials.email,
        password=credentials.password,
        role=UserRole.SELLER,
    )
    result = auth_service.login_email_password(db, email_creds)
    return AuthResponse(
        access_token=result["access_token"],
        refresh_token=result["refresh_token"],
        token_type=result["token_type"],
        user=UserResponse.from_orm(result["user"]),
    )


# ==================== PRODUCT CATEGORIES ====================

@router.get("/product-categories", response_model=ProductCategoriesResponse)
async def get_product_categories():
    """Get the list of available product categories for supplier onboarding."""
    return ProductCategoriesResponse(categories=PRODUCT_CATEGORIES)
