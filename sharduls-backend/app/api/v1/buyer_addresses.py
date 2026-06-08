"""
Buyer Shipping Address API.

Endpoints:
  GET    /addresses              — List current buyer's saved addresses
  POST   /addresses              — Create a new address
  PUT    /addresses/{id}         — Update an existing address
  DELETE /addresses/{id}         — Delete an address
  PATCH  /addresses/{id}/default — Set an address as default
"""
import logging
from typing import Optional, List

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import require_roles
from app.models.user import Address
from app.schemas.response import success_response

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/addresses", tags=["Buyer Addresses"])

buyer_dep = require_roles("buyer")

ADDRESS_TYPE = "shipping"


# ── Schemas ────────────────────────────────────────────────────────────────

class AddressIn(BaseModel):
    label: Optional[str]      = Field(None, max_length=50)
    address_line1: str        = Field(..., min_length=1, max_length=255)
    address_line2: Optional[str] = Field(None, max_length=255)
    city: str                 = Field(..., min_length=1, max_length=100)
    state: str                = Field(..., min_length=1, max_length=100)
    pincode: str              = Field(..., min_length=4, max_length=10)
    country: str              = Field(default="India", max_length=100)
    phone: Optional[str]      = Field(None, max_length=20)
    is_default: bool          = False


def _serialize(addr: Address) -> dict:
    return {
        "id":            addr.id,
        "label":         addr.label,
        "address_line1": addr.address_line1,
        "address_line2": addr.address_line2,
        "city":          addr.city,
        "state":         addr.state,
        "pincode":       addr.pincode,
        "country":       addr.country,
        "phone":         addr.phone,
        "is_default":    addr.is_default,
    }


def _get_addr_or_404(db: Session, address_id: int, user_id: int) -> Address:
    addr = db.query(Address).filter(
        Address.id == address_id,
        Address.user_id == user_id,
        Address.address_type == ADDRESS_TYPE,
    ).first()
    if not addr:
        raise HTTPException(status_code=404, detail="Address not found")
    return addr


# ── Routes ─────────────────────────────────────────────────────────────────

@router.get("")
def list_addresses(
    db: Session = Depends(get_db),
    current_user=Depends(buyer_dep),
):
    addresses = (
        db.query(Address)
        .filter(Address.user_id == current_user.id, Address.address_type == ADDRESS_TYPE)
        .order_by(Address.is_default.desc(), Address.id.asc())
        .all()
    )
    return success_response(data=[_serialize(a) for a in addresses])


@router.post("")
def create_address(
    payload: AddressIn,
    db: Session = Depends(get_db),
    current_user=Depends(buyer_dep),
):
    if payload.is_default:
        db.query(Address).filter(
            Address.user_id == current_user.id,
            Address.address_type == ADDRESS_TYPE,
        ).update({"is_default": False})

    addr = Address(
        user_id=current_user.id,
        address_type=ADDRESS_TYPE,
        label=payload.label,
        address_line1=payload.address_line1,
        address_line2=payload.address_line2,
        city=payload.city,
        state=payload.state,
        pincode=payload.pincode,
        country=payload.country,
        phone=payload.phone,
        is_default=payload.is_default,
    )
    db.add(addr)
    db.commit()
    db.refresh(addr)
    logger.info("Address created: id=%s user_id=%s", addr.id, current_user.id)
    return success_response(data=_serialize(addr))


@router.put("/{address_id}")
def update_address(
    address_id: int,
    payload: AddressIn,
    db: Session = Depends(get_db),
    current_user=Depends(buyer_dep),
):
    addr = _get_addr_or_404(db, address_id, current_user.id)

    if payload.is_default:
        db.query(Address).filter(
            Address.user_id == current_user.id,
            Address.address_type == ADDRESS_TYPE,
            Address.id != address_id,
        ).update({"is_default": False})

    addr.label         = payload.label
    addr.address_line1 = payload.address_line1
    addr.address_line2 = payload.address_line2
    addr.city          = payload.city
    addr.state         = payload.state
    addr.pincode       = payload.pincode
    addr.country       = payload.country
    addr.phone         = payload.phone
    addr.is_default    = payload.is_default
    db.commit()
    db.refresh(addr)
    return success_response(data=_serialize(addr))


@router.delete("/{address_id}")
def delete_address(
    address_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(buyer_dep),
):
    addr = _get_addr_or_404(db, address_id, current_user.id)
    db.delete(addr)
    db.commit()
    return success_response(data={"id": address_id})


@router.patch("/{address_id}/default")
def set_default_address(
    address_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(buyer_dep),
):
    addr = _get_addr_or_404(db, address_id, current_user.id)
    db.query(Address).filter(
        Address.user_id == current_user.id,
        Address.address_type == ADDRESS_TYPE,
    ).update({"is_default": False})
    addr.is_default = True
    db.commit()
    db.refresh(addr)
    return success_response(data=_serialize(addr))
