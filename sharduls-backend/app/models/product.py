import enum
from sqlalchemy import (
    Column, Integer, String, Boolean, Text, Float, ForeignKey,
    DateTime, func, JSON,
)
from sqlalchemy.orm import relationship
from app.core.database import Base
from app.models.base import TimestampMixin


class ProductStatus(str, enum.Enum):
    draft = "draft"
    pending = "pending"          # submitted by supplier, awaiting admin
    approved = "approved"        # admin approved → visible to buyers
    rejected = "rejected"        # admin rejected
    inactive = "inactive"        # supplier deactivated


class Product(Base, TimestampMixin):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    supplier_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)

    # Basic info (set by supplier)
    name = Column(String(255), nullable=False)
    slug = Column(String(300), unique=True, index=True, nullable=False)
    description = Column(Text, nullable=True)
    category = Column(String(100), nullable=False, index=True)
    brand = Column(String(100), nullable=True)
    sku = Column(String(50), nullable=True)
    images = Column(JSON, default=list)          # list of image URLs
    specs = Column(JSON, default=dict)           # key-value spec pairs

    # Pricing (supplier sets base, admin can override)
    supplier_price = Column(Float, nullable=False, default=0)
    mrp = Column(Float, nullable=True)           # maximum retail price
    admin_price = Column(Float, nullable=True)   # admin-adjusted selling price (if set, overrides supplier_price)
    platform_fee = Column(Float, nullable=True, default=0)   # flat fee added by admin
    discount_pct = Column(Float, nullable=True, default=0)   # discount percentage set by admin
    admin_notes = Column(Text, nullable=True)    # internal notes from admin about pricing

    # Computed final price is: (admin_price or supplier_price) + platform_fee - discount
    # Computed on read, not stored

    # Stock
    stock = Column(Integer, nullable=False, default=0)
    low_stock_threshold = Column(Integer, default=5)

    # Status & approval
    status = Column(String(20), nullable=False, default="pending", index=True)
    is_featured = Column(Boolean, default=False)
    admin_approved_at = Column(DateTime(timezone=True), nullable=True)
    admin_rejection_reason = Column(Text, nullable=True)

    # Relationships
    supplier = relationship("User", backref="products")
