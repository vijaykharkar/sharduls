from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from fastapi import HTTPException, status
from app.core.security import SecurityUtils
from app.core.config import settings
from typing import Optional


class OTPService:
    """Service for handling OTP generation and verification"""
    
    # In-memory storage for OTPs (in production, use Redis or database)
    _otp_storage = {}
    
    @staticmethod
    def generate_and_store_otp(identifier: str) -> str:
        """Generate OTP and store it with expiry time"""
        otp = SecurityUtils.generate_otp(length=settings.OTP_LENGTH)
        expiry = datetime.utcnow() + timedelta(minutes=settings.OTP_EXPIRE_MINUTES)
        
        OTPService._otp_storage[identifier] = {
            "otp": otp,
            "expiry": expiry,
            "attempts": 0
        }
        
        return otp
    
    @staticmethod
    def verify_otp(identifier: str, otp: str) -> bool:
        """Verify OTP for given identifier"""
        stored_data = OTPService._otp_storage.get(identifier)
        
        if not stored_data:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="OTP not found or expired. Please request a new OTP."
            )
        
        # Check if OTP is expired
        if datetime.utcnow() > stored_data["expiry"]:
            del OTPService._otp_storage[identifier]
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="OTP has expired. Please request a new OTP."
            )
        
        # Check attempts
        if stored_data["attempts"] >= 3:
            del OTPService._otp_storage[identifier]
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Too many failed attempts. Please request a new OTP."
            )
        
        # Verify OTP
        if stored_data["otp"] != otp:
            stored_data["attempts"] += 1
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Invalid OTP. {3 - stored_data['attempts']} attempts remaining."
            )
        
        # OTP is valid, remove it from storage
        del OTPService._otp_storage[identifier]
        return True
    
    @staticmethod
    def send_phone_otp(phone: str) -> dict:
        """Generate and send OTP to phone number"""
        otp = OTPService.generate_and_store_otp(phone)
        
        # TODO: Integrate with SMS service (Twilio, AWS SNS, etc.)
        # For development, just log the OTP
        print(f"📱 OTP for {phone}: {otp}")
        
        return {
            "message": f"OTP sent to {phone}",
            "expires_in": settings.OTP_EXPIRE_MINUTES * 60
        }
    
    @staticmethod
    def send_email_otp(email: str) -> dict:
        """Generate and send OTP to email"""
        otp = OTPService.generate_and_store_otp(email)
        
        # TODO: Integrate with email service
        # For development, just log the OTP
        print(f"📧 OTP for {email}: {otp}")
        
        return {
            "message": f"OTP sent to {email}",
            "expires_in": settings.OTP_EXPIRE_MINUTES * 60
        }
    
    @staticmethod
    def clear_otp(identifier: str):
        """Clear OTP for identifier"""
        if identifier in OTPService._otp_storage:
            del OTPService._otp_storage[identifier]
