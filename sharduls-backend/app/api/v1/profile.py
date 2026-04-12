from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import get_current_user
from app.core.config import settings
from app.schemas.profile import (
    BusinessDetailsSave, ContactDetailsSave, CategoryBrandSave,
    AddressesSave, BankDetailsSave,
)
from app.schemas.response import success_response
import app.services.profile_service as svc

router = APIRouter(prefix="/profile", tags=["Profile"])


# ── Full profile ─────────────────────────────────────────────────

@router.get("/me")
def get_my_profile(db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    return success_response(data=svc.get_full_profile(db, current_user), message="Profile fetched")


# ── Section saves ────────────────────────────────────────────────

@router.post("/business-details")
def save_business(payload: BusinessDetailsSave, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    return success_response(data=svc.save_business_details(db, current_user, payload), message="Business details saved")


@router.post("/contact-details")
def save_contacts(payload: ContactDetailsSave, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    return success_response(data=svc.save_contact_details(db, current_user, payload), message="Contact details saved")


@router.post("/category-brand")
def save_category_brand(payload: CategoryBrandSave, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    return success_response(data=svc.save_category_brand(db, current_user, payload), message="Category & brand saved")


@router.post("/addresses")
def save_addresses(payload: AddressesSave, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    return success_response(data=svc.save_addresses(db, current_user, payload), message="Addresses saved")


@router.post("/bank-details")
def save_bank(payload: BankDetailsSave, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    return success_response(data=svc.save_bank_details(db, current_user, payload), message="Bank details saved")


# ── File upload ──────────────────────────────────────────────────

@router.post("/upload")
async def upload_file(
    doc_type: str = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    allowed = settings.ALLOWED_EXTENSIONS.split(",")
    ext = file.filename.rsplit(".", 1)[-1].lower() if "." in file.filename else ""
    if ext not in allowed:
        raise HTTPException(status_code=400, detail=f"File type .{ext} not allowed. Allowed: {', '.join(allowed)}")

    contents = await file.read()
    if len(contents) > settings.MAX_UPLOAD_SIZE:
        raise HTTPException(status_code=400, detail=f"File too large. Max {settings.MAX_UPLOAD_SIZE // (1024*1024)}MB")

    file_url = svc.save_file_to_disk(current_user.id, contents, file.filename)
    data = svc.upload_document(db, current_user, doc_type, file_url, file.filename, len(contents))
    return success_response(data=data, message="Document uploaded")


# ── Admin endpoints ──────────────────────────────────────────────

@router.post("/admin/approve/{user_id}")
def admin_approve(user_id: int, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    if current_user.role not in ("admin", "superadmin"):
        raise HTTPException(status_code=403, detail="Admin access required")
    from app.repositories.user_repository import get_user_by_id
    target = get_user_by_id(db, user_id)
    if not target:
        raise HTTPException(status_code=404, detail="User not found")
    return success_response(data=svc.approve_profile(db, target), message="Profile approved")


@router.post("/admin/reject/{user_id}")
def admin_reject(user_id: int, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    if current_user.role not in ("admin", "superadmin"):
        raise HTTPException(status_code=403, detail="Admin access required")
    from app.repositories.user_repository import get_user_by_id
    target = get_user_by_id(db, user_id)
    if not target:
        raise HTTPException(status_code=404, detail="User not found")
    return success_response(data=svc.reject_profile(db, target), message="Profile rejected")
