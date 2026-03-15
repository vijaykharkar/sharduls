from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime
from enum import Enum


class EnquiryStatus(str, Enum):
    PENDING = "pending"
    REVIEWED = "reviewed"
    QUOTED = "quoted"
    CLOSED = "closed"


class BulkEnquiryCreate(BaseModel):
    company_name: str = Field(..., min_length=1, max_length=200)
    contact_person: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    phone: str = Field(..., min_length=10, max_length=15)
    product_category: Optional[str] = None
    product_name: str = Field(..., min_length=1, max_length=200)
    quantity: str = Field(..., min_length=1)
    unit: str = "pieces"
    delivery_timeline: Optional[str] = None
    description: Optional[str] = None


class BulkEnquiryResponse(BaseModel):
    id: int
    company_name: str
    contact_person: str
    email: str
    phone: str
    product_category: Optional[str]
    product_name: str
    quantity: str
    unit: str
    delivery_timeline: Optional[str]
    description: Optional[str]
    status: EnquiryStatus
    created_at: datetime

    class Config:
        from_attributes = True


class BulkEnquiryListResponse(BaseModel):
    total: int
    enquiries: list[BulkEnquiryResponse]
