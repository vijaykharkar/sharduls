from typing import List, Optional
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.models.user import (
    User, UserBusinessProfile, BankDetails, Address,
    UserDocument, SupplierContact, Catalog,
)


def get_dashboard_stats(db: Session) -> dict:
    total_suppliers = db.query(func.count(User.id)).filter(User.role == "supplier").scalar() or 0
    active_suppliers = db.query(func.count(User.id)).filter(User.role == "supplier", User.is_active == True).scalar() or 0
    pending_approvals = db.query(func.count(User.id)).filter(
        User.role == "supplier", User.is_profile_approved == False, User.is_active == True,
    ).scalar() or 0
    approved_suppliers = db.query(func.count(User.id)).filter(
        User.role == "supplier", User.is_profile_approved == True,
    ).scalar() or 0
    total_users = db.query(func.count(User.id)).scalar() or 0
    total_documents = db.query(func.count(UserDocument.id)).scalar() or 0
    return {
        "total_suppliers": total_suppliers,
        "active_suppliers": active_suppliers,
        "pending_approvals": pending_approvals,
        "approved_suppliers": approved_suppliers,
        "total_users": total_users,
        "total_documents": total_documents,
    }


def list_suppliers(
    db: Session, skip: int = 0, limit: int = 50,
    search: Optional[str] = None, status: Optional[str] = None,
) -> dict:
    q = db.query(User).filter(User.role == "supplier")
    if search:
        q = q.filter(
            (User.full_name.ilike(f"%{search}%")) |
            (User.email.ilike(f"%{search}%")) |
            (User.phone.ilike(f"%{search}%"))
        )
    if status == "approved":
        q = q.filter(User.is_profile_approved == True)
    elif status == "pending":
        q = q.filter(User.is_profile_approved == False)
    elif status == "inactive":
        q = q.filter(User.is_active == False)

    total = q.count()
    suppliers = q.order_by(User.created_at.desc()).offset(skip).limit(limit).all()
    return {"items": suppliers, "total": total, "skip": skip, "limit": limit}


def get_supplier_detail(db: Session, user_id: int) -> Optional[User]:
    return (
        db.query(User)
        .filter(User.id == user_id, User.role == "supplier")
        .first()
    )


def update_user_field(db: Session, user: User, **kwargs) -> User:
    for k, v in kwargs.items():
        if hasattr(user, k):
            setattr(user, k, v)
    db.commit()
    db.refresh(user)
    return user


def delete_user(db: Session, user: User) -> None:
    db.delete(user)
    db.commit()


def list_all_users(db: Session, skip: int = 0, limit: int = 50, search: Optional[str] = None) -> dict:
    q = db.query(User)
    if search:
        q = q.filter(
            (User.full_name.ilike(f"%{search}%")) |
            (User.email.ilike(f"%{search}%"))
        )
    total = q.count()
    users = q.order_by(User.created_at.desc()).offset(skip).limit(limit).all()
    return {"items": users, "total": total, "skip": skip, "limit": limit}


def get_recent_suppliers(db: Session, limit: int = 10) -> List[User]:
    return (
        db.query(User)
        .filter(User.role == "supplier")
        .order_by(User.created_at.desc())
        .limit(limit)
        .all()
    )
