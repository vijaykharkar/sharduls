from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import get_current_user_token
from app.services.auth_service import AuthService
from app.services.otp_service import OTPService
from app.schemas.user import (
    UserCreate, UserLogin, UserResponse, UserRole,
    EmailPasswordLogin, PhoneOTPLogin, EmailOTPLogin,
    SendPhoneOTP, SendEmailOTP, RefreshTokenRequest,
    AuthResponse, TokenResponse, OTPResponse
)

router = APIRouter()


# ==================== REGISTRATION ====================

@router.post("/register", response_model=AuthResponse, status_code=status.HTTP_201_CREATED)
async def register(user_data: UserCreate, db: Session = Depends(get_db)):
    """
    Register a new user with role-based registration.
    - For suppliers: role should be 'seller'
    - For customers: role should be 'customer' (default)
    """
    result = AuthService.register(db, user_data)
    return AuthResponse(
        access_token=result["access_token"],
        refresh_token=result["refresh_token"],
        token_type=result["token_type"],
        user=UserResponse.from_orm(result["user"])
    )


@router.post("/supplier/register", response_model=AuthResponse, status_code=status.HTTP_201_CREATED)
async def register_supplier(user_data: UserCreate, db: Session = Depends(get_db)):
    """
    Register a new supplier (seller).
    This endpoint automatically sets the role to 'seller'.
    """
    user_data.role = UserRole.SELLER
    result = AuthService.register(db, user_data)
    return AuthResponse(
        access_token=result["access_token"],
        refresh_token=result["refresh_token"],
        token_type=result["token_type"],
        user=UserResponse.from_orm(result["user"])
    )


@router.post("/customer/register", response_model=AuthResponse, status_code=status.HTTP_201_CREATED)
async def register_customer(user_data: UserCreate, db: Session = Depends(get_db)):
    """
    Register a new customer.
    This endpoint automatically sets the role to 'customer'.
    """
    user_data.role = UserRole.CUSTOMER
    result = AuthService.register(db, user_data)
    return AuthResponse(
        access_token=result["access_token"],
        refresh_token=result["refresh_token"],
        token_type=result["token_type"],
        user=UserResponse.from_orm(result["user"])
    )


# ==================== LOGIN - EMAIL/PASSWORD ====================

@router.post("/login", response_model=AuthResponse)
async def login(credentials: UserLogin, db: Session = Depends(get_db)):
    """Login user with email and password (legacy endpoint)."""
    result = AuthService.login(db, credentials)
    return AuthResponse(
        access_token=result["access_token"],
        refresh_token=result["refresh_token"],
        token_type=result["token_type"],
        user=UserResponse.from_orm(result["user"])
    )


@router.post("/login/email-password", response_model=AuthResponse)
async def login_email_password(credentials: EmailPasswordLogin, db: Session = Depends(get_db)):
    """
    Login user with email and password.
    Supports role-based login by specifying the role (optional).
    """
    result = AuthService.login_email_password(db, credentials)
    return AuthResponse(
        access_token=result["access_token"],
        refresh_token=result["refresh_token"],
        token_type=result["token_type"],
        user=UserResponse.from_orm(result["user"])
    )


@router.post("/supplier/login", response_model=AuthResponse)
async def supplier_login(credentials: EmailPasswordLogin, db: Session = Depends(get_db)):
    """
    Supplier login with email and password.
    Only allows login for users with 'seller' role.
    """
    credentials.role = UserRole.SELLER
    result = AuthService.login_email_password(db, credentials)
    return AuthResponse(
        access_token=result["access_token"],
        refresh_token=result["refresh_token"],
        token_type=result["token_type"],
        user=UserResponse.from_orm(result["user"])
    )


@router.post("/customer/login", response_model=AuthResponse)
async def customer_login(credentials: EmailPasswordLogin, db: Session = Depends(get_db)):
    """
    Customer login with email and password.
    Only allows login for users with 'customer' role.
    """
    credentials.role = UserRole.CUSTOMER
    result = AuthService.login_email_password(db, credentials)
    return AuthResponse(
        access_token=result["access_token"],
        refresh_token=result["refresh_token"],
        token_type=result["token_type"],
        user=UserResponse.from_orm(result["user"])
    )


# ==================== OTP - SEND ====================

@router.post("/otp/send/phone", response_model=OTPResponse)
async def send_phone_otp(data: SendPhoneOTP):
    """
    Send OTP to phone number.
    OTP will be valid for configured time (default: 10 minutes).
    """
    result = OTPService.send_phone_otp(data.phone)
    return OTPResponse(**result)


@router.post("/otp/send/email", response_model=OTPResponse)
async def send_email_otp(data: SendEmailOTP):
    """
    Send OTP to email address.
    OTP will be valid for configured time (default: 10 minutes).
    """
    result = OTPService.send_email_otp(data.email)
    return OTPResponse(**result)


# ==================== LOGIN - OTP ====================

@router.post("/login/phone-otp", response_model=AuthResponse)
async def login_phone_otp(credentials: PhoneOTPLogin, db: Session = Depends(get_db)):
    """
    Login user with phone number and OTP.
    User must first request OTP using /otp/send/phone endpoint.
    """
    result = AuthService.login_phone_otp(db, credentials)
    return AuthResponse(
        access_token=result["access_token"],
        refresh_token=result["refresh_token"],
        token_type=result["token_type"],
        user=UserResponse.from_orm(result["user"])
    )


@router.post("/login/email-otp", response_model=AuthResponse)
async def login_email_otp(credentials: EmailOTPLogin, db: Session = Depends(get_db)):
    """
    Login user with email and OTP.
    User must first request OTP using /otp/send/email endpoint.
    """
    result = AuthService.login_email_otp(db, credentials)
    return AuthResponse(
        access_token=result["access_token"],
        refresh_token=result["refresh_token"],
        token_type=result["token_type"],
        user=UserResponse.from_orm(result["user"])
    )


@router.post("/customer/login/phone-otp", response_model=AuthResponse)
async def customer_login_phone_otp(credentials: PhoneOTPLogin, db: Session = Depends(get_db)):
    """
    Customer login with phone number and OTP.
    Only allows login for users with 'customer' role.
    """
    credentials.role = UserRole.CUSTOMER
    result = AuthService.login_phone_otp(db, credentials)
    return AuthResponse(
        access_token=result["access_token"],
        refresh_token=result["refresh_token"],
        token_type=result["token_type"],
        user=UserResponse.from_orm(result["user"])
    )


@router.post("/customer/login/email-otp", response_model=AuthResponse)
async def customer_login_email_otp(credentials: EmailOTPLogin, db: Session = Depends(get_db)):
    """
    Customer login with email and OTP.
    Only allows login for users with 'customer' role.
    """
    credentials.role = UserRole.CUSTOMER
    result = AuthService.login_email_otp(db, credentials)
    return AuthResponse(
        access_token=result["access_token"],
        refresh_token=result["refresh_token"],
        token_type=result["token_type"],
        user=UserResponse.from_orm(result["user"])
    )


# ==================== TOKEN MANAGEMENT ====================

@router.post("/refresh", response_model=TokenResponse)
async def refresh_token(data: RefreshTokenRequest, db: Session = Depends(get_db)):
    """
    Refresh access token using refresh token.
    Returns new access and refresh tokens.
    """
    result = AuthService.refresh_token(db, data.refresh_token)
    return TokenResponse(**result)


# ==================== USER INFO ====================

@router.get("/me", response_model=UserResponse)
async def get_current_user(
    token_payload: dict = Depends(get_current_user_token),
    db: Session = Depends(get_db)
):
    """
    Get current authenticated user information.
    Requires valid JWT access token in Authorization header.
    """
    user = AuthService.get_current_user(db, token_payload)
    return UserResponse.from_orm(user)


# ==================== LOGOUT ====================

@router.post("/logout")
async def logout(
    token_payload: dict = Depends(get_current_user_token)
):
    """
    Logout user.
    Client should remove tokens from storage.
    Server-side token invalidation can be implemented with token blacklist.
    """
    return {
        "message": "Successfully logged out",
        "detail": "Please remove tokens from client storage"
    }
