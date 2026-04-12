from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, EmailStr, Field, field_validator
import re

from app.models.user import UserRole


# --------------- Auth schemas ---------------

class UserCreate(BaseModel):
    full_name: str = Field(..., min_length=2, max_length=150)
    email: EmailStr
    phone: Optional[str] = Field(None, max_length=20)
    password: str = Field(..., min_length=8, max_length=128)
    role: UserRole = UserRole.buyer
    # Supplier-specific (optional, used when role == supplier)
    business_model: Optional[str] = None
    product_categories: Optional[List[str]] = None
    gstin: Optional[str] = None

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, v):
        if v is not None:
            cleaned = re.sub(r"[\s\-]", "", v)
            if not re.match(r"^\+?\d{10,15}$", cleaned):
                raise ValueError("Invalid phone number format")
        return v


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class EmailPasswordLogin(BaseModel):
    email: EmailStr
    password: str


class PhoneOTPLogin(BaseModel):
    phone: str = Field(..., max_length=20)


class EmailOTPLogin(BaseModel):
    email: EmailStr


class SendPhoneOTP(BaseModel):
    phone: str = Field(..., max_length=20)


class SendEmailOTP(BaseModel):
    email: EmailStr


class VerifyOTP(BaseModel):
    identifier: str  # email or phone
    otp: str = Field(..., min_length=4, max_length=10)


class VerifyRegistrationOTP(BaseModel):
    phone: str
    otp: str = Field(..., min_length=4, max_length=10)


class RefreshTokenRequest(BaseModel):
    refresh_token: str


class PasswordChange(BaseModel):
    old_password: str
    new_password: str = Field(..., min_length=8, max_length=128)


class PasswordReset(BaseModel):
    email: EmailStr


class PasswordResetConfirm(BaseModel):
    token: str
    new_password: str = Field(..., min_length=8, max_length=128)


# --------------- Response schemas ---------------

class UserResponse(BaseModel):
    id: int
    full_name: str
    email: str
    phone: Optional[str] = None
    role: UserRole
    is_active: bool
    is_verified: bool
    avatar_url: Optional[str] = None
    created_at: datetime

    model_config = {"from_attributes": True}


class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"


class OTPResponse(BaseModel):
    message: str
    expires_in_minutes: int


class AuthResponse(BaseModel):
    success: bool = True
    message: str
    data: Optional[dict] = None


class UserUpdate(BaseModel):
    full_name: Optional[str] = Field(None, min_length=2, max_length=150)
    phone: Optional[str] = Field(None, max_length=20)
    avatar_url: Optional[str] = None


# --------------- Address schemas ---------------

class AddressCreate(BaseModel):
    label: Optional[str] = None
    address_line1: str = Field(..., max_length=255)
    address_line2: Optional[str] = Field(None, max_length=255)
    city: str = Field(..., max_length=100)
    state: str = Field(..., max_length=100)
    pincode: str = Field(..., max_length=10)
    country: str = Field(default="India", max_length=100)
    is_default: bool = False


class AddressUpdate(BaseModel):
    label: Optional[str] = None
    address_line1: Optional[str] = Field(None, max_length=255)
    address_line2: Optional[str] = Field(None, max_length=255)
    city: Optional[str] = Field(None, max_length=100)
    state: Optional[str] = Field(None, max_length=100)
    pincode: Optional[str] = Field(None, max_length=10)
    country: Optional[str] = Field(None, max_length=100)
    is_default: Optional[bool] = None


class AddressResponse(BaseModel):
    id: int
    label: Optional[str] = None
    address_line1: str
    address_line2: Optional[str] = None
    city: str
    state: str
    pincode: str
    country: str
    is_default: bool
    created_at: datetime

    model_config = {"from_attributes": True}


# --------------- Business Profile schemas ---------------

class UserBusinessProfileCreate(BaseModel):
    company_name: str = Field(..., max_length=255)
    gst_number: Optional[str] = Field(None, max_length=20)
    pan_number: Optional[str] = Field(None, max_length=15)
    business_type: Optional[str] = Field(None, max_length=100)
    website: Optional[str] = Field(None, max_length=255)
    description: Optional[str] = None


class UserBusinessProfileUpdate(BaseModel):
    company_name: Optional[str] = Field(None, max_length=255)
    gst_number: Optional[str] = Field(None, max_length=20)
    pan_number: Optional[str] = Field(None, max_length=15)
    business_type: Optional[str] = Field(None, max_length=100)
    website: Optional[str] = Field(None, max_length=255)
    description: Optional[str] = None


class UserBusinessProfileResponse(BaseModel):
    id: int
    company_name: str
    gst_number: Optional[str] = None
    pan_number: Optional[str] = None
    business_type: Optional[str] = None
    website: Optional[str] = None
    description: Optional[str] = None
    created_at: datetime

    model_config = {"from_attributes": True}


# --------------- Bank Details schemas ---------------

class BankDetailsCreate(BaseModel):
    bank_name: str = Field(..., max_length=150)
    account_number: str = Field(..., max_length=30)
    ifsc_code: str = Field(..., max_length=15)
    account_holder_name: str = Field(..., max_length=150)


class BankDetailsUpdate(BaseModel):
    bank_name: Optional[str] = Field(None, max_length=150)
    account_number: Optional[str] = Field(None, max_length=30)
    ifsc_code: Optional[str] = Field(None, max_length=15)
    account_holder_name: Optional[str] = Field(None, max_length=150)


class BankDetailsResponse(BaseModel):
    id: int
    bank_name: str
    account_number: str
    ifsc_code: str
    account_holder_name: str
    created_at: datetime

    model_config = {"from_attributes": True}


# --------------- User Document schemas ---------------

class UserDocumentCreate(BaseModel):
    document_type: str = Field(..., max_length=50)
    document_url: str = Field(..., max_length=500)


class UserDocumentUpdate(BaseModel):
    document_type: Optional[str] = Field(None, max_length=50)
    document_url: Optional[str] = Field(None, max_length=500)
    is_verified: Optional[bool] = None


class UserDocumentResponse(BaseModel):
    id: int
    document_type: str
    document_url: str
    is_verified: bool
    created_at: datetime

    model_config = {"from_attributes": True}


# --------------- Catalog schemas ---------------

class CatalogCreate(BaseModel):
    title: str = Field(..., max_length=255)
    file_url: str = Field(..., max_length=500)
    description: Optional[str] = None


class CatalogUpdate(BaseModel):
    title: Optional[str] = Field(None, max_length=255)
    file_url: Optional[str] = Field(None, max_length=500)
    description: Optional[str] = None


class CatalogResponse(BaseModel):
    id: int
    title: str
    file_url: str
    description: Optional[str] = None
    created_at: datetime

    model_config = {"from_attributes": True}


# --------------- Review schemas ---------------

class ReviewCreate(BaseModel):
    product_id: int
    rating: float = Field(..., ge=1, le=5)
    comment: Optional[str] = None


class ReviewUpdate(BaseModel):
    rating: Optional[float] = Field(None, ge=1, le=5)
    comment: Optional[str] = None


class ReviewResponse(BaseModel):
    id: int
    product_id: int
    rating: float
    comment: Optional[str] = None
    created_at: datetime

    model_config = {"from_attributes": True}


# --------------- Wishlist schemas ---------------

class WishlistCreate(BaseModel):
    product_id: int


class WishlistResponse(BaseModel):
    id: int
    product_id: int
    created_at: datetime

    model_config = {"from_attributes": True}
