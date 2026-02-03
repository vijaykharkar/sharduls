from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.repositories.user_repo import UserRepository
from app.core.security import SecurityUtils, create_tokens
from app.schemas.user import (
    UserCreate, UserLogin, EmailPasswordLogin, 
    PhoneOTPLogin, EmailOTPLogin, UserRole
)
from app.models.user import User
from app.services.otp_service import OTPService
from app.utils.email import EmailService
from datetime import datetime
from typing import Optional


class AuthService:
    @staticmethod
    def register(db: Session, user_data: UserCreate) -> dict:
        """Register a new user with role-based registration."""
        # Check if user already exists by email
        if user_data.email:
            existing_user = UserRepository.get_by_email(db, user_data.email)
            if existing_user:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Email already registered"
                )
        
        # Check if user already exists by phone
        if user_data.phone:
            existing_user = UserRepository.get_by_phone(db, user_data.phone)
            if existing_user:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Phone number already registered"
                )
        
        # Validate password strength
        is_valid, message = SecurityUtils.validate_password_strength(user_data.password)
        if not is_valid:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=message
            )
        
        # Create user with specified role
        user = UserRepository.create(
            db=db,
            email=user_data.email,
            password=user_data.password,
            full_name=user_data.full_name,
            phone=user_data.phone,
            role=user_data.role
        )
        
        # Send welcome email if email is provided
        if user.email:
            try:
                EmailService.send_welcome_email(user.email, user.full_name)
            except Exception as e:
                # Log error but don't fail registration
                print(f"Failed to send welcome email: {e}")
        
        # Create tokens
        tokens = create_tokens(user.id, user.email or user.phone)
        
        return {
            **tokens,
            "user": user
        }
    
    @staticmethod
    def login_email_password(db: Session, credentials: EmailPasswordLogin) -> dict:
        """Login user with email and password."""
        # Get user by email
        user = UserRepository.get_by_email(db, credentials.email)
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password"
            )
        
        # Check role if specified (for supplier vs customer login)
        if credentials.role and user.role != credentials.role:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Invalid credentials for {credentials.role.value} login"
            )
        
        # Verify password
        if not SecurityUtils.verify_password(credentials.password, user.password_hash):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password"
            )
        
        # Check if user is active
        if not user.is_active:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Account is inactive"
            )
        
        # Update last login
        user.last_login = datetime.utcnow()
        db.commit()
        
        # Create tokens
        tokens = create_tokens(user.id, user.email)
        
        return {
            **tokens,
            "user": user
        }
    
    @staticmethod
    def login_phone_otp(db: Session, credentials: PhoneOTPLogin) -> dict:
        """Login user with phone and OTP."""
        # Verify OTP
        OTPService.verify_otp(credentials.phone, credentials.otp)
        
        # Get user by phone
        user = UserRepository.get_by_phone(db, credentials.phone)
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Phone number not registered"
            )
        
        # Check role if specified
        if credentials.role and user.role != credentials.role:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Invalid credentials for {credentials.role.value} login"
            )
        
        # Check if user is active
        if not user.is_active:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Account is inactive"
            )
        
        # Update last login
        user.last_login = datetime.utcnow()
        db.commit()
        
        # Create tokens
        tokens = create_tokens(user.id, user.phone)
        
        return {
            **tokens,
            "user": user
        }
    
    @staticmethod
    def login_email_otp(db: Session, credentials: EmailOTPLogin) -> dict:
        """Login user with email and OTP."""
        # Verify OTP
        OTPService.verify_otp(credentials.email, credentials.otp)
        
        # Get user by email
        user = UserRepository.get_by_email(db, credentials.email)
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Email not registered"
            )
        
        # Check role if specified
        if credentials.role and user.role != credentials.role:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Invalid credentials for {credentials.role.value} login"
            )
        
        # Check if user is active
        if not user.is_active:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Account is inactive"
            )
        
        # Update last login
        user.last_login = datetime.utcnow()
        db.commit()
        
        # Create tokens
        tokens = create_tokens(user.id, user.email)
        
        return {
            **tokens,
            "user": user
        }
    
    @staticmethod
    def login(db: Session, credentials: UserLogin) -> dict:
        """Legacy login method - supports email/password only."""
        email_password_creds = EmailPasswordLogin(
            email=credentials.email,
            password=credentials.password
        )
        return AuthService.login_email_password(db, email_password_creds)
    
    @staticmethod
    def refresh_token(db: Session, refresh_token: str) -> dict:
        """Refresh access token."""
        try:
            payload = SecurityUtils.decode_token(refresh_token)
            
            if payload.get("type") != "refresh":
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Invalid token type"
                )
            
            user_id = int(payload.get("sub"))
            user = UserRepository.get_by_id(db, user_id)
            
            if not user:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="User not found"
                )
            
            # Create new tokens
            tokens = create_tokens(user.id, user.email or user.phone)
            
            return tokens
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid refresh token"
            )
    
    @staticmethod
    def get_current_user(db: Session, token_payload: dict) -> User:
        """Get current user from token payload."""
        user_id = int(token_payload.get("sub"))
        user = UserRepository.get_by_id(db, user_id)
        
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
