from sqlalchemy.orm import Session
from typing import Optional, List
from app.models.user import User, Address, UserRole
from app.core.security import SecurityUtils


class UserRepository:
    @staticmethod
    def create(
        db: Session,
        email: str,
        password: str,
        full_name: str,
        phone: Optional[str] = None,
        role: UserRole = UserRole.CUSTOMER
    ) -> User:
        """Create a new user."""
        password_hash = SecurityUtils.get_password_hash(password)
        
        user = User(
            email=email,
            password_hash=password_hash,
            full_name=full_name,
            phone=phone,
            role=role
        )
        
        db.add(user)
        db.commit()
        db.refresh(user)
        return user

    @staticmethod
    def get_by_id(db: Session, user_id: int) -> Optional[User]:
        """Get user by ID."""
        return db.query(User).filter(User.id == user_id).first()

    @staticmethod
    def get_by_email(db: Session, email: str) -> Optional[User]:
        """Get user by email."""
        return db.query(User).filter(User.email == email).first()

    @staticmethod
    def get_by_phone(db: Session, phone: str) -> Optional[User]:
        """Get user by phone."""
        return db.query(User).filter(User.phone == phone).first()

    @staticmethod
    def get_all(db: Session, skip: int = 0, limit: int = 100) -> List[User]:
        """Get all users."""
        return db.query(User).offset(skip).limit(limit).all()

    @staticmethod
    def update(db: Session, user: User, **kwargs) -> User:
        """Update user."""
        for key, value in kwargs.items():
            if hasattr(user, key) and value is not None:
                setattr(user, key, value)
        
        db.commit()
        db.refresh(user)
        return user

    @staticmethod
    def delete(db: Session, user: User) -> bool:
        """Delete user."""
        db.delete(user)
        db.commit()
        return True

    @staticmethod
    def get_by_role(db: Session, role: UserRole, skip: int = 0, limit: int = 100) -> List[User]:
        """Get users by role."""
        return db.query(User).filter(User.role == role).offset(skip).limit(limit).all()

    @staticmethod
    def create_address(db: Session, user_id: int, address_data: dict) -> Address:
        """Create address for user."""
        address = Address(user_id=user_id, **address_data)
        db.add(address)
        db.commit()
        db.refresh(address)
        return address

    @staticmethod
    def get_user_addresses(db: Session, user_id: int) -> List[Address]:
        """Get all addresses for a user."""
        return db.query(Address).filter(Address.user_id == user_id).all()
