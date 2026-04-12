"""Repository layer for supplier profile CRUD."""
from typing import Optional, List
from sqlalchemy.orm import Session
from app.models.user import (
    User, UserBusinessProfile, SupplierContact, Address, BankDetails, UserDocument,
)


# ── Business profile ────────────────────────────────────────────

def get_business_profile(db: Session, user_id: int) -> Optional[UserBusinessProfile]:
    return db.query(UserBusinessProfile).filter(UserBusinessProfile.user_id == user_id).first()


def upsert_business_profile(db: Session, user_id: int, **kwargs) -> UserBusinessProfile:
    bp = get_business_profile(db, user_id)
    if bp:
        for k, v in kwargs.items():
            setattr(bp, k, v)
    else:
        bp = UserBusinessProfile(user_id=user_id, **kwargs)
        db.add(bp)
    db.commit()
    db.refresh(bp)
    return bp


# ── Contacts ─────────────────────────────────────────────────────

def get_contacts(db: Session, user_id: int) -> List[SupplierContact]:
    return db.query(SupplierContact).filter(SupplierContact.user_id == user_id).order_by(SupplierContact.is_primary.desc()).all()


def replace_contacts(db: Session, user_id: int, contacts_data: list) -> List[SupplierContact]:
    db.query(SupplierContact).filter(SupplierContact.user_id == user_id).delete()
    result = []
    for c in contacts_data:
        obj = SupplierContact(user_id=user_id, **c)
        db.add(obj)
        result.append(obj)
    db.commit()
    for obj in result:
        db.refresh(obj)
    return result


# ── Addresses ────────────────────────────────────────────────────

def get_addresses(db: Session, user_id: int) -> List[Address]:
    return db.query(Address).filter(Address.user_id == user_id).order_by(Address.address_type, Address.is_default.desc()).all()


def get_address_by_id(db: Session, address_id: int, user_id: int) -> Optional[Address]:
    return db.query(Address).filter(Address.id == address_id, Address.user_id == user_id).first()


def replace_addresses(db: Session, user_id: int, billing_data: Optional[dict], pickup_list: list) -> List[Address]:
    db.query(Address).filter(Address.user_id == user_id).delete()
    result = []
    if billing_data:
        obj = Address(user_id=user_id, address_type="billing", **billing_data)
        db.add(obj)
        result.append(obj)
    for p in pickup_list:
        obj = Address(user_id=user_id, address_type="pickup", **p)
        db.add(obj)
        result.append(obj)
    db.commit()
    for obj in result:
        db.refresh(obj)
    return result


# ── Bank details ─────────────────────────────────────────────────

def get_bank_details(db: Session, user_id: int) -> Optional[BankDetails]:
    return db.query(BankDetails).filter(BankDetails.user_id == user_id).first()


def upsert_bank_details(db: Session, user_id: int, **kwargs) -> BankDetails:
    bd = get_bank_details(db, user_id)
    if bd:
        for k, v in kwargs.items():
            setattr(bd, k, v)
    else:
        bd = BankDetails(user_id=user_id, **kwargs)
        db.add(bd)
    db.commit()
    db.refresh(bd)
    return bd


# ── Documents ────────────────────────────────────────────────────

def get_documents(db: Session, user_id: int) -> List[UserDocument]:
    return db.query(UserDocument).filter(UserDocument.user_id == user_id).all()


def get_document_by_type(db: Session, user_id: int, doc_type: str) -> Optional[UserDocument]:
    return db.query(UserDocument).filter(UserDocument.user_id == user_id, UserDocument.document_type == doc_type).first()


def upsert_document(db: Session, user_id: int, doc_type: str, **kwargs) -> UserDocument:
    doc = get_document_by_type(db, user_id, doc_type)
    if doc:
        for k, v in kwargs.items():
            setattr(doc, k, v)
    else:
        doc = UserDocument(user_id=user_id, document_type=doc_type, **kwargs)
        db.add(doc)
    db.commit()
    db.refresh(doc)
    return doc
