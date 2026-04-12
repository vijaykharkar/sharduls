import json

from sqlalchemy.orm import Session

from app.models.user import User, UserBusinessProfile, BankDetails
from app.repositories import user_repository as repo
from app.schemas.user import SupplierProfileResponse, BusinessProfileResponse, SupplierProfileUpdate
from app.core.errors import raise_error


# --------------- Completion helpers ---------------

def _compute_completion(user: User) -> int:
    """Return profile completion % (0–100) based on 6 supplier-profile sections."""
    checks = [
        # 1. Basic info: full name + avatar
        bool(user.full_name and user.avatar_url),
        # 2. Contact: phone verified
        bool(user.phone),
        # 3. Business details: company name or business type
        bool(
            user.business_profile and (
                user.business_profile.company_name or user.business_profile.business_type
            )
        ),
        # 4. Category/brand: product categories set
        bool(user.business_profile and user.business_profile.product_categories),
        # 5. Compliance: GST number present
        bool(user.business_profile and user.business_profile.gst_number),
        # 6. Bank details: bank account added
        bool(user.bank_details),
    ]
    return round((sum(checks) / len(checks)) * 100)


def _build_response(user: User) -> dict:
    bp = user.business_profile
    bp_data = None
    if bp:
        cats = None
        if bp.product_categories:
            try:
                cats = json.loads(bp.product_categories)
            except Exception:
                cats = [bp.product_categories]
        bp_data = BusinessProfileResponse(
            company_name=bp.company_name,
            business_type=bp.business_type,
            product_categories=cats,
            gst_number=bp.gst_number,
            pan_number=bp.pan_number,
            website=bp.website,
            description=bp.description,
        )

    return SupplierProfileResponse(
        id=user.id,
        full_name=user.full_name,
        email=user.email,
        phone=user.phone,
        role=user.role if isinstance(user.role, str) else user.role.value,
        is_active=user.is_active,
        is_verified=user.is_verified,
        avatar_url=user.avatar_url,
        created_at=user.created_at,
        business_profile=bp_data,
        profile_completion=_compute_completion(user),
    ).model_dump()


# --------------- Public service functions ---------------

def get_profile(db: Session, user: User) -> dict:
    return _build_response(user)


def update_profile(db: Session, user: User, payload: SupplierProfileUpdate) -> dict:
    # Update user fields
    user_fields = {k: v for k, v in {
        "full_name": payload.full_name,
        "phone": payload.phone,
        "avatar_url": payload.avatar_url,
    }.items() if v is not None}
    if user_fields:
        repo.update_user(db, user, **user_fields)

    # Update or create business profile
    bp_fields = {k: v for k, v in {
        "company_name": payload.company_name,
        "business_type": payload.business_type,
        "gst_number": payload.gst_number,
        "pan_number": payload.pan_number,
        "website": payload.website,
        "description": payload.description,
    }.items() if v is not None}

    if payload.product_categories is not None:
        bp_fields["product_categories"] = json.dumps(payload.product_categories)

    if bp_fields:
        bp = user.business_profile
        if bp:
            for k, v in bp_fields.items():
                setattr(bp, k, v)
            db.commit()
            db.refresh(bp)
        else:
            repo.create_business_profile(db, user_id=user.id, **bp_fields)

    db.refresh(user)
    return _build_response(user)
