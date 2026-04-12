from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import get_current_user
from app.schemas.user import (
    UserCreate,
    EmailPasswordLogin,
    SendPhoneOTP,
    SendEmailOTP,
    VerifyOTP,
    VerifyRegistrationOTP,
    RefreshTokenRequest,
    UserResponse,
)
from app.schemas.response import success_response
import app.services.auth_service as auth_svc

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/register")
def register(payload: UserCreate, db: Session = Depends(get_db)):
    result = auth_svc.register(db, payload)
    return success_response(data=result, message="Registration successful")


@router.post("/login")
def login(payload: EmailPasswordLogin, db: Session = Depends(get_db)):
    result = auth_svc.login_password(db, payload)
    return success_response(data=result, message="Login successful")


@router.post("/login-otp")
def login_otp_phone(payload: SendPhoneOTP, db: Session = Depends(get_db)):
    result = auth_svc.send_otp(db, payload.phone)
    return success_response(data=result, message="OTP sent")


@router.post("/send-email-otp")
def login_otp_email(payload: SendEmailOTP, db: Session = Depends(get_db)):
    result = auth_svc.send_otp(db, payload.email)
    return success_response(data=result, message="OTP sent")


@router.post("/verify-otp")
def verify_otp(payload: VerifyOTP, db: Session = Depends(get_db)):
    result = auth_svc.verify_otp(db, payload)
    return success_response(data=result, message="OTP verified")


@router.post("/refresh-token")
def refresh_token(payload: RefreshTokenRequest, db: Session = Depends(get_db)):
    result = auth_svc.refresh_token(db, payload.refresh_token)
    return success_response(data=result, message="Token refreshed")


@router.post("/register-send-otp")
def register_send_otp(payload: SendPhoneOTP, db: Session = Depends(get_db)):
    result = auth_svc.send_registration_otp(db, payload.phone)
    print("Registration OTP sent:*****************", result)
    return success_response(data=result, message="OTP sent")


@router.post("/register-verify-otp")
def register_verify_otp(payload: VerifyRegistrationOTP):
    result = auth_svc.verify_registration_otp(payload.phone, payload.otp)
    print("Registration OTP verified:*****************", result)
    return success_response(data=result, message="OTP verified")


@router.post("/logout")
def logout(db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    result = auth_svc.logout(db, current_user)
    return success_response(data=result, message="Logged out")


@router.get("/me")
def get_me(current_user=Depends(get_current_user)):
    user_data = UserResponse.model_validate(current_user).model_dump()
    return success_response(data=user_data, message="User profile")
