import enum
from sqlalchemy import (
    Column, Integer, String, Boolean, Text, Enum, ForeignKey,
    DateTime, Float, func,
)
from sqlalchemy.orm import relationship
from app.core.database import Base
from app.models.base import TimestampMixin


class UserRole(str, enum.Enum):
    superadmin = "superadmin"
    admin = "admin"
    supplier = "supplier"
    buyer = "buyer"


class User(Base, TimestampMixin):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(150), nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    phone = Column(String(20), unique=True, index=True, nullable=True)
    password_hash = Column(String(255), nullable=True)
    role = Column(String(150), nullable=False, default="buyer")
    is_active = Column(Boolean, default=True, nullable=False)
    is_verified = Column(Boolean, default=False, nullable=False)
    avatar_url = Column(String(500), nullable=True)
    is_profile_complete = Column(Boolean, default=False, nullable=False)
    is_profile_approved = Column(Boolean, default=False, nullable=False)

    # OTP fields
    otp_code = Column(String(10), nullable=True)
    otp_expires_at = Column(DateTime(timezone=True), nullable=True)

    # Refresh token (stored hashed; one active refresh per user for simplicity)
    refresh_token = Column(String(500), nullable=True)

    # Relationships
    addresses = relationship("Address", back_populates="user", cascade="all, delete-orphan")
    reviews = relationship("Review", back_populates="user", cascade="all, delete-orphan")
    wishlist_items = relationship("Wishlist", back_populates="user", cascade="all, delete-orphan")
    business_profile = relationship("UserBusinessProfile", back_populates="user", uselist=False, cascade="all, delete-orphan")
    contacts = relationship("SupplierContact", back_populates="user", cascade="all, delete-orphan")
    bank_details = relationship("BankDetails", back_populates="user", uselist=False, cascade="all, delete-orphan")
    documents = relationship("UserDocument", back_populates="user", cascade="all, delete-orphan")
    catalogs = relationship("Catalog", back_populates="user", cascade="all, delete-orphan")


class Address(Base, TimestampMixin):
    __tablename__ = "addresses"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    address_type = Column(String(20), nullable=False, default="billing")  # billing / pickup
    label = Column(String(50), nullable=True)  # e.g. Home, Office
    address_line1 = Column(String(255), nullable=False)
    address_line2 = Column(String(255), nullable=True)
    city = Column(String(100), nullable=False)
    state = Column(String(100), nullable=False)
    pincode = Column(String(10), nullable=False)
    country = Column(String(100), default="India", nullable=False)
    phone = Column(String(20), nullable=True)
    is_default = Column(Boolean, default=False)

    user = relationship("User", back_populates="addresses")


class Review(Base, TimestampMixin):
    __tablename__ = "reviews"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    product_id = Column(Integer, nullable=False)  # FK added when product model exists
    rating = Column(Float, nullable=False)
    comment = Column(Text, nullable=True)

    user = relationship("User", back_populates="reviews")


class Wishlist(Base, TimestampMixin):
    __tablename__ = "wishlists"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    product_id = Column(Integer, nullable=False)

    user = relationship("User", back_populates="wishlist_items")


class UserBusinessProfile(Base, TimestampMixin):
    __tablename__ = "user_business_profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)
    legal_name = Column(String(255), nullable=True)
    trade_name = Column(String(255), nullable=True)
    company_name = Column(String(255), nullable=True)
    gst_number = Column(String(20), nullable=True)
    pan_number = Column(String(15), nullable=True)
    tan_number = Column(String(15), nullable=True)
    business_type = Column(String(100), nullable=True)    # entity type
    pincode = Column(String(10), nullable=True)
    state = Column(String(100), nullable=True)
    city = Column(String(100), nullable=True)
    country = Column(String(100), default="India", nullable=True)
    product_categories = Column(Text, nullable=True)  # JSON array of categories
    brands = Column(Text, nullable=True)              # JSON array of brand names
    brand_details = Column(Text, nullable=True)        # JSON array of brand detail rows
    has_udyam = Column(Boolean, default=False)
    udyam_file_url = Column(String(500), nullable=True)
    website = Column(String(255), nullable=True)
    description = Column(Text, nullable=True)

    user = relationship("User", back_populates="business_profile")


class SupplierContact(Base, TimestampMixin):
    __tablename__ = "supplier_contacts"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    is_primary = Column(Boolean, default=False, nullable=False)
    contact_name = Column(String(150), nullable=False)
    phone = Column(String(20), nullable=False)
    email = Column(String(255), nullable=False)
    alt_email = Column(String(255), nullable=True)
    pickup_time = Column(String(50), nullable=True)
    location = Column(String(255), nullable=True)

    user = relationship("User", back_populates="contacts")


class BankDetails(Base, TimestampMixin):
    __tablename__ = "bank_details"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)
    account_holder_name = Column(String(150), nullable=False)
    account_number = Column(String(30), nullable=False)
    account_type = Column(String(20), default="Savings", nullable=False)
    ifsc_code = Column(String(15), nullable=False)
    bank_name = Column(String(150), nullable=True)
    branch = Column(String(150), nullable=True)
    city = Column(String(100), nullable=True)
    cheque_file_url = Column(String(500), nullable=True)

    user = relationship("User", back_populates="bank_details")


class UserDocument(Base, TimestampMixin):
    __tablename__ = "user_documents"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    document_type = Column(String(50), nullable=False)  # panCard, gstinCert, bankLetter, etc.
    document_url = Column(String(500), nullable=False)
    file_name = Column(String(255), nullable=True)
    file_size = Column(Integer, nullable=True)
    is_verified = Column(Boolean, default=False)

    user = relationship("User", back_populates="documents")


class Catalog(Base, TimestampMixin):
    __tablename__ = "catalogs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    title = Column(String(255), nullable=False)
    file_url = Column(String(500), nullable=False)
    description = Column(Text, nullable=True)

    user = relationship("User", back_populates="catalogs")
