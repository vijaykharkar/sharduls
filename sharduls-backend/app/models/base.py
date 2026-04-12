from sqlalchemy import Column, Integer, DateTime, func
from app.core.database import Base


class TimestampMixin:
    """Provides created_at / updated_at columns."""
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)
