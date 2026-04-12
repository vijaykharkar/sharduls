"""Pydantic schemas for the 6-step supplier profile."""
from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, Field


# ── 1. Business Details ──────────────────────────────────────────

class BusinessDetailsSave(BaseModel):
    legal_name: str = Field(..., max_length=255)
    trade_name: str = Field("", max_length=255)
    gstin: str = Field(..., max_length=15)
    country: str = Field("India", max_length=100)
    pincode: str = Field(..., max_length=10)
    state: str = Field("", max_length=100)
    city: str = Field("", max_length=100)
    tan: Optional[str] = Field(None, max_length=15)
    entity_type: str = Field(..., max_length=100)
    has_udyam: bool = False
    udyam_file_url: Optional[str] = None


class BusinessDetailsResponse(BaseModel):
    legal_name: Optional[str] = None
    trade_name: Optional[str] = None
    gstin: Optional[str] = None
    country: Optional[str] = None
    pincode: Optional[str] = None
    state: Optional[str] = None
    city: Optional[str] = None
    tan: Optional[str] = None
    entity_type: Optional[str] = None
    has_udyam: bool = False
    udyam_file_url: Optional[str] = None


# ── 2. Contact Details ───────────────────────────────────────────

class ContactItem(BaseModel):
    contact_name: str = Field(..., max_length=150)
    phone: str = Field(..., max_length=20)
    email: str = Field(..., max_length=255)
    alt_email: Optional[str] = Field(None, max_length=255)
    pickup_time: Optional[str] = Field(None, max_length=50)
    location: Optional[str] = Field(None, max_length=255)


class ContactDetailsSave(BaseModel):
    primary: ContactItem
    others: List[ContactItem] = []


class ContactItemResponse(BaseModel):
    id: int
    is_primary: bool
    contact_name: str
    phone: str
    email: str
    alt_email: Optional[str] = None
    pickup_time: Optional[str] = None
    location: Optional[str] = None
    model_config = {"from_attributes": True}


class ContactDetailsResponse(BaseModel):
    primary: Optional[ContactItemResponse] = None
    others: List[ContactItemResponse] = []


# ── 3. Category & Brand ─────────────────────────────────────────

class BrandDetailRow(BaseModel):
    name: str
    nature: str = ""
    cert_url: Optional[str] = None
    date: Optional[str] = None
    status: str = "Pending"


class CategoryBrandSave(BaseModel):
    categories: List[str]
    brands: List[str] = []
    brand_rows: List[BrandDetailRow] = []


class CategoryBrandResponse(BaseModel):
    categories: List[str] = []
    brands: List[str] = []
    brand_rows: List[BrandDetailRow] = []


# ── 4. Addresses ─────────────────────────────────────────────────

class AddressSave(BaseModel):
    address_type: str = Field("billing", max_length=20)
    country: str = Field("India", max_length=100)
    pincode: str = Field(..., max_length=10)
    state: str = Field(..., max_length=100)
    city: str = Field(..., max_length=100)
    address_line1: str = Field(..., max_length=255)
    address_line2: Optional[str] = Field(None, max_length=255)
    phone: str = Field(..., max_length=20)
    is_default: bool = False


class AddressItemResponse(BaseModel):
    id: int
    address_type: str
    country: str
    pincode: str
    state: str
    city: str
    address_line1: str
    address_line2: Optional[str] = None
    phone: Optional[str] = None
    is_default: bool
    model_config = {"from_attributes": True}


class AddressesSave(BaseModel):
    billing: Optional[AddressSave] = None
    pickup: List[AddressSave] = []


class AddressesResponse(BaseModel):
    billing: Optional[AddressItemResponse] = None
    pickup: List[AddressItemResponse] = []


# ── 5. Bank Details ──────────────────────────────────────────────

class BankDetailsSave(BaseModel):
    account_holder_name: str = Field(..., max_length=150)
    account_number: str = Field(..., max_length=30)
    account_type: str = Field("Savings", max_length=20)
    ifsc_code: str = Field(..., max_length=15)
    bank_name: Optional[str] = Field(None, max_length=150)
    branch: Optional[str] = Field(None, max_length=150)
    city: Optional[str] = Field(None, max_length=100)
    cheque_file_url: Optional[str] = None


class BankDetailsResponse(BaseModel):
    id: int
    account_holder_name: str
    account_number: str
    account_type: str
    ifsc_code: str
    bank_name: Optional[str] = None
    branch: Optional[str] = None
    city: Optional[str] = None
    cheque_file_url: Optional[str] = None
    model_config = {"from_attributes": True}


# ── 6. Documents ─────────────────────────────────────────────────

class DocumentItemResponse(BaseModel):
    id: int
    document_type: str
    document_url: str
    file_name: Optional[str] = None
    file_size: Optional[int] = None
    is_verified: bool
    model_config = {"from_attributes": True}


class DocumentsResponse(BaseModel):
    items: List[DocumentItemResponse] = []


# ── Full profile overview ────────────────────────────────────────

class ProfileStepsStatus(BaseModel):
    business_details: bool = False
    contact_details: bool = False
    category_brand: bool = False
    addresses: bool = False
    bank_details: bool = False
    documents: bool = False


class FullProfileResponse(BaseModel):
    user_id: int
    full_name: str
    email: str
    phone: Optional[str] = None
    avatar_url: Optional[str] = None
    is_profile_complete: bool = False
    is_profile_approved: bool = False
    profile_completion: int = 0
    steps: ProfileStepsStatus = ProfileStepsStatus()
    business_details: Optional[BusinessDetailsResponse] = None
    contact_details: Optional[ContactDetailsResponse] = None
    category_brand: Optional[CategoryBrandResponse] = None
    addresses: Optional[AddressesResponse] = None
    bank_details: Optional[BankDetailsResponse] = None
    documents: Optional[DocumentsResponse] = None
