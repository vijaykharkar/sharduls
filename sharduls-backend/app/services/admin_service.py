from typing import Optional
from sqlalchemy.orm import Session
from app.models.user import User
from app.repositories import admin_repository as arepo
from app.repositories import product_repository as prepo
from app.services import profile_service as psvc


def dashboard_stats(db: Session) -> dict:
    stats = arepo.get_dashboard_stats(db)
    stats.update(prepo.get_product_stats(db))
    return stats


def _serialize_supplier(db: Session, user: User) -> dict:
    """Build a lightweight supplier dict for list views."""
    profile = psvc.get_full_profile(db, user)
    return {
        "id": user.id,
        "full_name": user.full_name,
        "email": user.email,
        "phone": user.phone,
        "role": user.role,
        "is_active": user.is_active,
        "is_verified": user.is_verified,
        "is_profile_complete": user.is_profile_complete,
        "is_profile_approved": user.is_profile_approved,
        "profile_completion": profile.get("profile_completion", 0),
        "created_at": str(user.created_at) if user.created_at else None,
        "updated_at": str(user.updated_at) if user.updated_at else None,
    }


def list_suppliers(
    db: Session, skip: int = 0, limit: int = 50,
    search: Optional[str] = None, status: Optional[str] = None,
) -> dict:
    result = arepo.list_suppliers(db, skip, limit, search, status)
    items = [_serialize_supplier(db, u) for u in result["items"]]
    return {
        "items": items,
        "total": result["total"],
        "skip": result["skip"],
        "limit": result["limit"],
    }


def get_supplier_detail(db: Session, user_id: int) -> Optional[dict]:
    user = arepo.get_supplier_detail(db, user_id)
    if not user:
        return None
    return psvc.get_full_profile(db, user)


def update_supplier(db: Session, user_id: int, updates: dict) -> Optional[dict]:
    user = arepo.get_supplier_detail(db, user_id)
    if not user:
        return None
    allowed = {"full_name", "email", "phone", "is_active", "is_verified", "is_profile_approved", "role"}
    filtered = {k: v for k, v in updates.items() if k in allowed and v is not None}
    if filtered:
        user = arepo.update_user_field(db, user, **filtered)
    return psvc.get_full_profile(db, user)


def delete_supplier(db: Session, user_id: int) -> bool:
    user = arepo.get_supplier_detail(db, user_id)
    if not user:
        return False
    arepo.delete_user(db, user)
    return True


def toggle_supplier_status(db: Session, user_id: int) -> Optional[dict]:
    user = arepo.get_supplier_detail(db, user_id)
    if not user:
        return None
    user = arepo.update_user_field(db, user, is_active=not user.is_active)
    return psvc.get_full_profile(db, user)


def approve_supplier(db: Session, user_id: int) -> Optional[dict]:
    user = arepo.get_supplier_detail(db, user_id)
    if not user:
        return None
    user = arepo.update_user_field(db, user, is_profile_approved=True)
    return psvc.get_full_profile(db, user)


def reject_supplier(db: Session, user_id: int) -> Optional[dict]:
    user = arepo.get_supplier_detail(db, user_id)
    if not user:
        return None
    user = arepo.update_user_field(db, user, is_profile_approved=False)
    return psvc.get_full_profile(db, user)
