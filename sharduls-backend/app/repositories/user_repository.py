from typing import Optional
from sqlalchemy.orm import Session
from app.models.user import User


def get_user_by_id(db: Session, user_id: int) -> Optional[User]:
    return db.query(User).filter(User.id == user_id).first()


def get_user_by_email(db: Session, email: str) -> Optional[User]:
    return db.query(User).filter(User.email == email).first()


def get_user_by_phone(db: Session, phone: str) -> Optional[User]:
    return db.query(User).filter(User.phone == phone).first()


def email_exists(db: Session, email: str) -> bool:
    return db.query(User).filter(User.email == email).first() is not None


def phone_exists(db: Session, phone: str) -> bool:
    return db.query(User).filter(User.phone == phone).first() is not None


def create_user(db: Session, **kwargs) -> User:
    user = User(**kwargs)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def update_user(db: Session, user: User, **kwargs) -> User:
    for key, value in kwargs.items():
        if hasattr(user, key):
            setattr(user, key, value)
    db.commit()
    db.refresh(user)
    return user


def set_user_otp(db: Session, user: User, otp_code: str, otp_expires_at) -> User:
    user.otp_code = otp_code
    user.otp_expires_at = otp_expires_at
    db.commit()
    db.refresh(user)
    return user


def clear_user_otp(db: Session, user: User) -> User:
    user.otp_code = None
    user.otp_expires_at = None
    db.commit()
    db.refresh(user)
    return user


def set_user_refresh_token(db: Session, user: User, token_hash: Optional[str]) -> User:
    user.refresh_token = token_hash
    db.commit()
    db.refresh(user)
    return user


def deactivate_user(db: Session, user: User) -> User:
    user.is_active = False
    db.commit()
    db.refresh(user)
    return user
