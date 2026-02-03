from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Enum as SQLEnum, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from app.core.database import Base
import enum


class PaymentMethod(str, enum.Enum):
    CREDIT_CARD = "credit_card"
    DEBIT_CARD = "debit_card"
    NET_BANKING = "net_banking"
    UPI = "upi"
    WALLET = "wallet"
    COD = "cod"
    RAZORPAY = "razorpay"
    STRIPE = "stripe"


class PaymentStatus(str, enum.Enum):
    PENDING = "pending"
    PROCESSING = "processing"
    COMPLETED = "completed"
    FAILED = "failed"
    REFUNDED = "refunded"
    CANCELLED = "cancelled"


class Payment(Base):
    __tablename__ = "payments"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"), nullable=False)
    
    payment_method = Column(SQLEnum(PaymentMethod), nullable=False)
    payment_status = Column(SQLEnum(PaymentStatus), default=PaymentStatus.PENDING)
    
    amount = Column(Float, nullable=False)
    currency = Column(String, default="INR")
    
    # Gateway details
    gateway_name = Column(String, nullable=True)
    transaction_id = Column(String, unique=True, nullable=True, index=True)
    gateway_order_id = Column(String, nullable=True)
    gateway_payment_id = Column(String, nullable=True)
    gateway_signature = Column(String, nullable=True)
    
    # Response
    gateway_response = Column(Text, nullable=True)
    failure_reason = Column(Text, nullable=True)
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    completed_at = Column(DateTime, nullable=True)

    order = relationship("Order", back_populates="payment")
