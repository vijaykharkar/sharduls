import json
import os
import uuid

from sqlalchemy.orm import Session

from app.models.user import User
from app.repositories import profile_repository as prepo
from app.schemas.profile import (
    BusinessDetailsSave, BusinessDetailsResponse,
    ContactDetailsSave, ContactDetailsResponse, ContactItemResponse,
    CategoryBrandSave, CategoryBrandResponse, BrandDetailRow,
    AddressesSave, AddressesResponse, AddressItemResponse,
    BankDetailsSave, BankDetailsResponse,
    DocumentItemResponse, DocumentsResponse,
    ProfileStepsStatus, FullProfileResponse,
)
from app.core.config import settings

REQUIRED_DOC_TYPES = [
    "panCard", "gstinCert", "bankLetter", "bankStatement",
    "addressProof", "pickupAddressProof", "signature",
]


# ── helpers ──────────────────────────────────────────────────────

def _json_load(raw):
    if not raw:
        return []
    try:
        return json.loads(raw)
    except Exception:
        return []


def _steps(user: User, db: Session) -> ProfileStepsStatus:
    bp = prepo.get_business_profile(db, user.id)
    contacts = prepo.get_contacts(db, user.id)
    addresses = prepo.get_addresses(db, user.id)
    bank = prepo.get_bank_details(db, user.id)
    docs = prepo.get_documents(db, user.id)
    doc_types = {d.document_type for d in docs}

    return ProfileStepsStatus(
        business_details=bool(bp and bp.legal_name and bp.gst_number and bp.business_type),
        contact_details=bool(any(c.is_primary for c in contacts)),
        category_brand=bool(bp and bp.product_categories and len(_json_load(bp.product_categories)) > 0),
        addresses=bool(any(a.address_type == "billing" for a in addresses)),
        bank_details=bool(bank and bank.account_number),
        documents=all(dt in doc_types for dt in REQUIRED_DOC_TYPES),
    )


def _completion(steps: ProfileStepsStatus) -> int:
    vals = [steps.business_details, steps.contact_details, steps.category_brand,
            steps.addresses, steps.bank_details, steps.documents]
    return round((sum(vals) / len(vals)) * 100)


def _sync_profile_complete(db: Session, user: User, steps: ProfileStepsStatus):
    complete = all([
        steps.business_details, steps.contact_details, steps.category_brand,
        steps.addresses, steps.bank_details, steps.documents,
    ])
    if user.is_profile_complete != complete:
        user.is_profile_complete = complete
        db.commit()


# ── Build full response ──────────────────────────────────────────

def _build_business(bp) -> BusinessDetailsResponse | None:
    if not bp:
        return None
    return BusinessDetailsResponse(
        legal_name=bp.legal_name, trade_name=bp.trade_name,
        gstin=bp.gst_number, country=bp.country, pincode=bp.pincode,
        state=bp.state, city=bp.city, tan=bp.tan_number,
        entity_type=bp.business_type, has_udyam=bool(bp.has_udyam),
        udyam_file_url=bp.udyam_file_url,
    )


def _build_contacts(contacts) -> ContactDetailsResponse:
    primary = None
    others = []
    for c in contacts:
        item = ContactItemResponse.model_validate(c)
        if c.is_primary:
            primary = item
        else:
            others.append(item)
    return ContactDetailsResponse(primary=primary, others=others)


def _build_category_brand(bp) -> CategoryBrandResponse | None:
    if not bp:
        return None
    return CategoryBrandResponse(
        categories=_json_load(bp.product_categories),
        brands=_json_load(bp.brands),
        brand_rows=[BrandDetailRow(**r) for r in _json_load(bp.brand_details)],
    )


def _build_addresses(addresses) -> AddressesResponse:
    billing = None
    pickup = []
    for a in addresses:
        item = AddressItemResponse.model_validate(a)
        if a.address_type == "billing":
            billing = item
        else:
            pickup.append(item)
    return AddressesResponse(billing=billing, pickup=pickup)


def _build_bank(bank) -> BankDetailsResponse | None:
    if not bank:
        return None
    return BankDetailsResponse.model_validate(bank)


def _build_documents(docs) -> DocumentsResponse:
    return DocumentsResponse(items=[DocumentItemResponse.model_validate(d) for d in docs])


# ── Public API ───────────────────────────────────────────────────

def get_full_profile(db: Session, user: User) -> dict:
    bp = prepo.get_business_profile(db, user.id)
    contacts = prepo.get_contacts(db, user.id)
    addresses = prepo.get_addresses(db, user.id)
    bank = prepo.get_bank_details(db, user.id)
    docs = prepo.get_documents(db, user.id)
    steps = _steps(user, db)
    _sync_profile_complete(db, user, steps)

    return FullProfileResponse(
        user_id=user.id,
        full_name=user.full_name,
        email=user.email,
        phone=user.phone,
        avatar_url=user.avatar_url,
        is_profile_complete=user.is_profile_complete,
        is_profile_approved=user.is_profile_approved,
        profile_completion=_completion(steps),
        steps=steps,
        business_details=_build_business(bp),
        contact_details=_build_contacts(contacts),
        category_brand=_build_category_brand(bp),
        addresses=_build_addresses(addresses),
        bank_details=_build_bank(bank),
        documents=_build_documents(docs),
    ).model_dump()


# ── Section saves ────────────────────────────────────────────────

def save_business_details(db: Session, user: User, payload: BusinessDetailsSave) -> dict:
    prepo.upsert_business_profile(
        db, user.id,
        legal_name=payload.legal_name,
        trade_name=payload.trade_name,
        gst_number=payload.gstin,
        country=payload.country,
        pincode=payload.pincode,
        state=payload.state,
        city=payload.city,
        tan_number=payload.tan,
        business_type=payload.entity_type,
        has_udyam=payload.has_udyam,
        udyam_file_url=payload.udyam_file_url,
    )
    return get_full_profile(db, user)


def save_contact_details(db: Session, user: User, payload: ContactDetailsSave) -> dict:
    contacts_data = []
    p = payload.primary
    contacts_data.append(dict(
        is_primary=True, contact_name=p.contact_name, phone=p.phone,
        email=p.email, alt_email=p.alt_email, pickup_time=p.pickup_time,
    ))
    for o in payload.others:
        contacts_data.append(dict(
            is_primary=False, contact_name=o.contact_name, phone=o.phone,
            email=o.email, alt_email=o.alt_email, pickup_time=o.pickup_time,
            location=o.location,
        ))
    prepo.replace_contacts(db, user.id, contacts_data)
    return get_full_profile(db, user)


def save_category_brand(db: Session, user: User, payload: CategoryBrandSave) -> dict:
    prepo.upsert_business_profile(
        db, user.id,
        product_categories=json.dumps(payload.categories),
        brands=json.dumps(payload.brands),
        brand_details=json.dumps([r.model_dump() for r in payload.brand_rows]),
    )
    return get_full_profile(db, user)


def save_addresses(db: Session, user: User, payload: AddressesSave) -> dict:
    billing_data = None
    if payload.billing:
        b = payload.billing
        billing_data = dict(
            country=b.country, pincode=b.pincode, state=b.state, city=b.city,
            address_line1=b.address_line1, address_line2=b.address_line2,
            phone=b.phone, is_default=b.is_default,
        )
    pickup_list = []
    for p in payload.pickup:
        pickup_list.append(dict(
            country=p.country, pincode=p.pincode, state=p.state, city=p.city,
            address_line1=p.address_line1, address_line2=p.address_line2,
            phone=p.phone, is_default=p.is_default,
        ))
    prepo.replace_addresses(db, user.id, billing_data, pickup_list)
    return get_full_profile(db, user)


def save_bank_details(db: Session, user: User, payload: BankDetailsSave) -> dict:
    prepo.upsert_bank_details(
        db, user.id,
        account_holder_name=payload.account_holder_name,
        account_number=payload.account_number,
        account_type=payload.account_type,
        ifsc_code=payload.ifsc_code,
        bank_name=payload.bank_name,
        branch=payload.branch,
        city=payload.city,
        cheque_file_url=payload.cheque_file_url,
    )
    return get_full_profile(db, user)


def upload_document(db: Session, user: User, doc_type: str, file_url: str,
                    file_name: str, file_size: int) -> dict:
    prepo.upsert_document(
        db, user.id, doc_type,
        document_url=file_url, file_name=file_name, file_size=file_size,
    )
    return get_full_profile(db, user)


def save_file_to_disk(user_id: int, file_bytes: bytes, original_name: str) -> str:
    """Save uploaded file to uploads/<user_id>/ and return relative URL path."""
    project_root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    upload_dir = os.path.join(project_root, settings.UPLOAD_DIR, str(user_id))
    os.makedirs(upload_dir, exist_ok=True)
    ext = os.path.splitext(original_name)[1]
    filename = f"{uuid.uuid4().hex}{ext}"
    filepath = os.path.join(upload_dir, filename)
    with open(filepath, "wb") as f:
        f.write(file_bytes)
    return f"/uploads/{user_id}/{filename}"


# ── Admin approval ───────────────────────────────────────────────

def approve_profile(db: Session, user: User) -> dict:
    user.is_profile_approved = True
    db.commit()
    db.refresh(user)
    return get_full_profile(db, user)


def reject_profile(db: Session, user: User) -> dict:
    user.is_profile_approved = False
    db.commit()
    db.refresh(user)
    return get_full_profile(db, user)
