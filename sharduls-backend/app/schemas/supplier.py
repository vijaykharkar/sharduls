from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime
from enum import Enum


class BusinessModel(str, Enum):
    B2B = "B2B"
    B2D = "B2D"
    B2C = "B2C"


PRODUCT_CATEGORIES = [
    "Cable Management",
    "Earthing Accessories",
    "Lugs & Connectors",
    "Switchboard Components",
    "Electrical Components",
    "Fixings & Fasteners",
    "High Precision Parts",
    "CNC Components",
    "Thermo Plastic Parts",
    "Sub Assembly Parts",
    "Kitting Parts",
    "Springs",
    "Silver Plating",
    "3D Printing",
    "Automotive Components",
    "Industrial Fasteners",
    "Wire & Cable",
    "Hydraulic Components",
    "Pneumatic Components",
    "Electronic Components",
]


# ==================== STEP 1: Personal Info + OTP ====================

class SupplierStep1(BaseModel):
    first_name: str = Field(..., min_length=1, max_length=50)
    last_name: str = Field(..., min_length=1, max_length=50)
    phone: str = Field(..., min_length=10, max_length=15)
    email: EmailStr


class SupplierVerifyOTP(BaseModel):
    phone: str = Field(..., min_length=10, max_length=15)
    otp: str = Field(..., min_length=6, max_length=6)


# ==================== STEP 2: Business Details ====================

class SupplierStep2(BaseModel):
    phone: str = Field(..., min_length=10, max_length=15)
    business_model: BusinessModel
    products_to_sell: List[str] = Field(..., min_length=1)
    gstin: str = Field(..., min_length=15, max_length=15)


# ==================== STEP 3: Create Password ====================

class SupplierStep3(BaseModel):
    phone: str = Field(..., min_length=10, max_length=15)
    password: str = Field(..., min_length=8)
    confirm_password: str = Field(..., min_length=8)


# ==================== LOGIN ====================

class SupplierPhoneLogin(BaseModel):
    phone: str = Field(..., min_length=10, max_length=15)
    password: str


class SupplierEmailLogin(BaseModel):
    email: EmailStr
    password: str


# ==================== RESPONSES ====================

class SupplierStep1Response(BaseModel):
    message: str
    otp_expires_in: int


class SupplierStep2Response(BaseModel):
    message: str


class SupplierRegisterResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    user: dict


class ProductCategoriesResponse(BaseModel):
    categories: List[str]
