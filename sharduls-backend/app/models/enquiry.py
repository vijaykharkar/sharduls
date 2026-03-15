from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean, Enum as SQLEnum
from datetime import datetime
from app.core.database import Base
import enum


class EnquiryStatus(str, enum.Enum):
    PENDING = "pending"
    REVIEWED = "reviewed"
    QUOTED = "quoted"
    CLOSED = "closed"


class BulkEnquiry(Base):
    __tablename__ = "bulk_enquiries"

    id = Column(Integer, primary_key=True, index=True)
    company_name = Column(String, nullable=False)
    contact_person = Column(String, nullable=False)
    email = Column(String, nullable=False, index=True)
    phone = Column(String, nullable=False)
    product_category = Column(String, nullable=True)
    product_name = Column(String, nullable=False)
    quantity = Column(String, nullable=False)
    unit = Column(String, default="pieces")
    delivery_timeline = Column(String, nullable=True)
    description = Column(Text, nullable=True)
    status = Column(SQLEnum(EnquiryStatus), default=EnquiryStatus.PENDING, nullable=False)
    admin_notes = Column(Text, nullable=True)
    is_email_sent = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
