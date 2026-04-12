from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import get_current_user
from app.schemas.user import SupplierProfileUpdate
from app.schemas.response import success_response
import app.services.profile_service as profile_svc

router = APIRouter(prefix="/profile", tags=["Profile"])


@router.get("/me")
def get_my_profile(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    data = profile_svc.get_profile(db, current_user)
    return success_response(data=data, message="Profile fetched")


@router.patch("/me")
def update_my_profile(
    payload: SupplierProfileUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    data = profile_svc.update_profile(db, current_user, payload)
    return success_response(data=data, message="Profile updated")
