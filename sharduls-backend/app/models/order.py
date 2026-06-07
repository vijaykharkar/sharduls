import enum
from sqlalchemy import (
    Column, Integer, String, Text, ForeignKey,
    DateTime, JSON,
)
from sqlalchemy.orm import relationship
from app.core.database import Base
from app.models.base import TimestampMixin


class OrderStatus(str, enum.Enum):
    pending    = "pending"
    confirmed  = "confirmed"
    processing = "processing"
    shipped    = "shipped"
    delivered  = "delivered"
    cancelled  = "cancelled"
    refunded   = "refunded"


class Order(Base, TimestampMixin):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)

    # Human-readable order number (e.g., ORD-20260510-00042)
    order_number = Column(String(50), unique=True, nullable=False, index=True)

    # Delivery address snapshot (frozen at order time — immune to future address edits)
    shipping_address = Column(JSON, nullable=False)

    # Totals (all amounts in smallest currency unit: paise for INR)
    subtotal        = Column(Integer, nullable=False)
    discount_amount = Column(Integer, nullable=False, default=0)
    shipping_amount = Column(Integer, nullable=False, default=0)
    total_amount    = Column(Integer, nullable=False)

    currency = Column(String(3), nullable=False, default="INR")
    status   = Column(String(20), nullable=False, default="pending", index=True)
    notes    = Column(Text, nullable=True)

    confirmed_at = Column(DateTime(timezone=True), nullable=True)
    shipped_at   = Column(DateTime(timezone=True), nullable=True)
    delivered_at = Column(DateTime(timezone=True), nullable=True)
    cancelled_at = Column(DateTime(timezone=True), nullable=True)

    user    = relationship("User", backref="orders")
    items   = relationship("OrderItem", back_populates="order", cascade="all, delete-orphan")
    payment = relationship("Payment", back_populates="order", uselist=False, cascade="all, delete-orphan")


class OrderItem(Base, TimestampMixin):
    __tablename__ = "order_items"

    id         = Column(Integer, primary_key=True, index=True)
    order_id   = Column(Integer, ForeignKey("orders.id", ondelete="CASCADE"), nullable=False, index=True)
    product_id = Column(Integer, ForeignKey("products.id", ondelete="SET NULL"), nullable=True)

    # Snapshot at order time (product may change later)
    product_name  = Column(String(255), nullable=False)
    product_image = Column(String(500), nullable=True)
    product_sku   = Column(String(50),  nullable=True)

    quantity    = Column(Integer, nullable=False)
    unit_price  = Column(Integer, nullable=False)   # price per unit in paise
    total_price = Column(Integer, nullable=False)   # unit_price * quantity

    order = relationship("Order", back_populates="items")
