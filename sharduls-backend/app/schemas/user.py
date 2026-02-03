from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime
from enum import Enum


class UserRole(str, Enum):
    CUSTOMER = "customer"
    SELLER = "seller"
    ADMIN = "admin"


# ==================== BASE SCHEMAS ====================

class UserBase(BaseModel):
    email: Optional[EmailStr] = None
    full_name: str = Field(..., min_length=2, max_length=100)
    phone: Optional[str] = None


# ==================== REGISTRATION ====================

class UserCreate(UserBase):
    password: str = Field(..., min_length=8)
    role: UserRole = UserRole.CUSTOMER
    email: EmailStr  # Email is required for registration


# ==================== LOGIN SCHEMAS ====================

class EmailPasswordLogin(BaseModel):
    email: EmailStr
    password: str
    role: Optional[UserRole] = None


class PhoneOTPLogin(BaseModel):
    phone: str = Field(..., min_length=10, max_length=15)
    otp: str = Field(..., min_length=6, max_length=6)
    role: Optional[UserRole] = None


class EmailOTPLogin(BaseModel):
    email: EmailStr
    otp: str = Field(..., min_length=6, max_length=6)
    role: Optional[UserRole] = None


class UserLogin(BaseModel):
    """Legacy login schema - supports email/password"""
    email: EmailStr
    password: str


# ==================== OTP SCHEMAS ====================

class SendPhoneOTP(BaseModel):
    phone: str = Field(..., min_length=10, max_length=15)


class SendEmailOTP(BaseModel):
    email: EmailStr


class VerifyOTP(BaseModel):
    identifier: str  # phone or email
    otp: str = Field(..., min_length=6, max_length=6)


class OTPResponse(BaseModel):
    message: str
    expires_in: int  # seconds


# ==================== USER UPDATE ====================

class UserUpdate(BaseModel):
    full_name: Optional[str] = Field(None, min_length=2, max_length=100)
    phone: Optional[str] = None
    profile_image: Optional[str] = None


# ==================== USER RESPONSE ====================

class UserResponse(UserBase):
    id: int
    role: UserRole
    is_active: bool
    is_verified: bool
    is_email_verified: bool
    is_phone_verified: bool
    profile_image: Optional[str]
    created_at: datetime
    last_login: Optional[datetime]

    class Config:
        from_attributes = True


# ==================== TOKEN SCHEMAS ====================

class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"


class AuthResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    user: UserResponse


class RefreshTokenRequest(BaseModel):
    refresh_token: str


# ==================== PASSWORD MANAGEMENT ====================

class PasswordChange(BaseModel):
    old_password: str
    new_password: str = Field(..., min_length=8)


class PasswordReset(BaseModel):
    email: EmailStr


class PasswordResetConfirm(BaseModel):
    token: str
    new_password: str = Field(..., min_length=8)


# ==================== ADDRESS SCHEMAS ====================

class AddressBase(BaseModel):
    full_name: str
    phone: str
    address_line1: str
    address_line2: Optional[str] = None
    city: str
    state: str
    pincode: str
    country: str = "India"
    address_type: str = "home"
    is_default: bool = False


class AddressCreate(AddressBase):
    pass


class AddressUpdate(BaseModel):
    full_name: Optional[str] = None
    phone: Optional[str] = None
    address_line1: Optional[str] = None
    address_line2: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    pincode: Optional[str] = None
    country: Optional[str] = None
    address_type: Optional[str] = None
    is_default: Optional[bool] = None


class AddressResponse(AddressBase):
    id: int
    user_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# ==================== BUSINESS PROFILE SCHEMAS ====================

class UserBusinessProfileBase(BaseModel):
    business_name: Optional[str] = None
    business_type: Optional[str] = None
    gstin: Optional[str] = None
    pan: Optional[str] = None
    business_address: Optional[str] = None
    business_city: Optional[str] = None
    business_state: Optional[str] = None
    business_pincode: Optional[str] = None


class UserBusinessProfileCreate(UserBusinessProfileBase):
    pass


class UserBusinessProfileUpdate(UserBusinessProfileBase):
    pass


class UserBusinessProfileResponse(UserBusinessProfileBase):
    id: int
    user_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# ==================== BANK DETAILS SCHEMAS ====================

class BankDetailsBase(BaseModel):
    account_holder_name: str
    account_number: str
    bank_name: str
    ifsc_code: str
    branch_name: Optional[str] = None
    account_type: str = "savings"


class BankDetailsCreate(BankDetailsBase):
    pass


class BankDetailsUpdate(BaseModel):
    account_holder_name: Optional[str] = None
    account_number: Optional[str] = None
    bank_name: Optional[str] = None
    ifsc_code: Optional[str] = None
    branch_name: Optional[str] = None
    account_type: Optional[str] = None


class BankDetailsResponse(BankDetailsBase):
    id: int
    user_id: int
    is_verified: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# ==================== USER DOCUMENT SCHEMAS ====================

class UserDocumentBase(BaseModel):
    document_type: str
    document_number: Optional[str] = None
    document_url: str


class UserDocumentCreate(UserDocumentBase):
    pass


class UserDocumentUpdate(BaseModel):
    document_type: Optional[str] = None
    document_number: Optional[str] = None
    document_url: Optional[str] = None


class UserDocumentResponse(UserDocumentBase):
    id: int
    user_id: int
    is_verified: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# ==================== CATALOG SCHEMAS ====================

class CatalogBase(BaseModel):
    catalog_name: str
    catalog_url: str
    description: Optional[str] = None


class CatalogCreate(CatalogBase):
    pass


class CatalogUpdate(BaseModel):
    catalog_name: Optional[str] = None
    catalog_url: Optional[str] = None
    description: Optional[str] = None
    is_active: Optional[bool] = None


class CatalogResponse(CatalogBase):
    id: int
    user_id: int
    is_active: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# ==================== REVIEW SCHEMAS ====================

class ReviewBase(BaseModel):
    rating: int = Field(..., ge=1, le=5)
    title: Optional[str] = None
    comment: Optional[str] = None


class ReviewCreate(ReviewBase):
    product_id: int


class ReviewUpdate(BaseModel):
    rating: Optional[int] = Field(None, ge=1, le=5)
    title: Optional[str] = None
    comment: Optional[str] = None


class ReviewResponse(ReviewBase):
    id: int
    user_id: int
    product_id: int
    is_verified_purchase: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# ==================== WISHLIST SCHEMAS ====================

class WishlistCreate(BaseModel):
    product_id: int


class WishlistResponse(BaseModel):
    id: int
    user_id: int
    product_id: int
    created_at: datetime

    class Config:
        from_attributes = True
