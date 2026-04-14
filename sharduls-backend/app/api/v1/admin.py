from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import require_roles
from app.schemas.response import success_response
import app.services.admin_service as admin_svc

router = APIRouter(prefix="/admin", tags=["Admin"])

admin_dep = require_roles("admin", "superadmin")


# ── Schemas ──────────────────────────────────────────────────

class SupplierUpdate(BaseModel):
    full_name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    is_active: Optional[bool] = None
    is_verified: Optional[bool] = None
    is_profile_approved: Optional[bool] = None
    role: Optional[str] = None


# ── Dashboard ────────────────────────────────────────────────

@router.get("/dashboard")
def admin_dashboard(db: Session = Depends(get_db), _=Depends(admin_dep)):
    return success_response(data=admin_svc.dashboard_stats(db), message="Dashboard stats")


# ── Suppliers CRUD ───────────────────────────────────────────

@router.get("/suppliers")
def list_suppliers(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=200),
    search: Optional[str] = Query(None),
    status: Optional[str] = Query(None),
    db: Session = Depends(get_db),
    _=Depends(admin_dep),
):
    return success_response(data=admin_svc.list_suppliers(db, skip, limit, search, status), message="Suppliers list")


@router.get("/suppliers/{user_id}")
def get_supplier(user_id: int, db: Session = Depends(get_db), _=Depends(admin_dep)):
    data = admin_svc.get_supplier_detail(db, user_id)
    if not data:
        raise HTTPException(status_code=404, detail="Supplier not found")
    return success_response(data=data, message="Supplier profile")


@router.patch("/suppliers/{user_id}")
def update_supplier(user_id: int, payload: SupplierUpdate, db: Session = Depends(get_db), _=Depends(admin_dep)):
    data = admin_svc.update_supplier(db, user_id, payload.model_dump(exclude_none=True))
    if not data:
        raise HTTPException(status_code=404, detail="Supplier not found")
    return success_response(data=data, message="Supplier updated")


@router.delete("/suppliers/{user_id}")
def delete_supplier(user_id: int, db: Session = Depends(get_db), _=Depends(admin_dep)):
    ok = admin_svc.delete_supplier(db, user_id)
    if not ok:
        raise HTTPException(status_code=404, detail="Supplier not found")
    return success_response(message="Supplier deleted")


@router.post("/suppliers/{user_id}/toggle-status")
def toggle_status(user_id: int, db: Session = Depends(get_db), _=Depends(admin_dep)):
    data = admin_svc.toggle_supplier_status(db, user_id)
    if not data:
        raise HTTPException(status_code=404, detail="Supplier not found")
    return success_response(data=data, message="Status toggled")


@router.post("/suppliers/{user_id}/approve")
def approve_supplier(user_id: int, db: Session = Depends(get_db), _=Depends(admin_dep)):
    data = admin_svc.approve_supplier(db, user_id)
    if not data:
        raise HTTPException(status_code=404, detail="Supplier not found")
    return success_response(data=data, message="Supplier approved")


@router.post("/suppliers/{user_id}/reject")
def reject_supplier(user_id: int, db: Session = Depends(get_db), _=Depends(admin_dep)):
    data = admin_svc.reject_supplier(db, user_id)
    if not data:
        raise HTTPException(status_code=404, detail="Supplier not found")
    return success_response(data=data, message="Supplier rejected")
