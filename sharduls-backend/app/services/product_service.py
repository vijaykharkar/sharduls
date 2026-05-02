import re
from typing import Optional
from datetime import datetime, timezone
from sqlalchemy.orm import Session
from app.models.product import Product
from app.models.user import User
from app.repositories import product_repository as prepo


def _slugify(text: str) -> str:
    slug = re.sub(r'[^\w\s-]', '', text.lower())
    return re.sub(r'[-\s]+', '-', slug).strip('-')


def _serialize(p: Product) -> dict:
    base_price = p.admin_price if p.admin_price is not None else p.supplier_price
    discount_amount = (base_price * (p.discount_pct or 0) / 100)
    final_price = base_price + (p.platform_fee or 0) - discount_amount

    return {
        "id": p.id,
        "supplier_id": p.supplier_id,
        "supplier_name": p.supplier.full_name if p.supplier else None,
        "name": p.name,
        "slug": p.slug,
        "description": p.description,
        "category": p.category,
        "brand": p.brand,
        "sku": p.sku,
        "images": p.images or [],
        "image": (p.images or [None])[0],
        "specs": p.specs or {},
        "supplier_price": p.supplier_price,
        "mrp": p.mrp,
        "admin_price": p.admin_price,
        "platform_fee": p.platform_fee or 0,
        "discount_pct": p.discount_pct or 0,
        "price": round(final_price, 2),
        "discount": round(p.discount_pct or 0),
        "admin_notes": p.admin_notes,
        "stock": p.stock,
        "low_stock_threshold": p.low_stock_threshold,
        "status": p.status,
        "is_featured": p.is_featured,
        "inStock": p.stock > 0,
        "rating": 0,
        "reviews": 0,
        "admin_approved_at": str(p.admin_approved_at) if p.admin_approved_at else None,
        "admin_rejection_reason": p.admin_rejection_reason,
        "created_at": str(p.created_at) if p.created_at else None,
        "updated_at": str(p.updated_at) if p.updated_at else None,
    }


# ── Supplier operations ──

def create_product(db: Session, supplier_id: int, data: dict) -> dict:
    slug = _slugify(data["name"])
    # Ensure unique slug
    existing = db.query(Product).filter(Product.slug == slug).first()
    if existing:
        slug = f"{slug}-{supplier_id}"
    product_data = {
        "supplier_id": supplier_id,
        "name": data["name"],
        "slug": slug,
        "description": data.get("description"),
        "category": data["category"],
        "brand": data.get("brand"),
        "sku": data.get("sku"),
        "images": data.get("images", []),
        "specs": data.get("specs", {}),
        "supplier_price": float(data.get("price", 0)),
        "mrp": float(data["mrp"]) if data.get("mrp") else None,
        "stock": int(data.get("stock", 0)),
        "status": "pending",
    }
    p = prepo.create_product(db, product_data)
    return _serialize(p)


def list_supplier_products(db: Session, supplier_id: int, skip: int = 0, limit: int = 50) -> dict:
    result = prepo.list_products(db, skip, limit, supplier_id=supplier_id)
    return {
        "items": [_serialize(p) for p in result["items"]],
        "total": result["total"],
        "skip": result["skip"],
        "limit": result["limit"],
    }


def update_product(db: Session, product_id: int, supplier_id: int, data: dict) -> Optional[dict]:
    p = prepo.get_product(db, product_id)
    if not p or p.supplier_id != supplier_id:
        return None
    allowed = {"name", "description", "category", "brand", "sku", "images", "specs", "stock"}
    updates = {k: v for k, v in data.items() if k in allowed and v is not None}
    if "price" in data:
        updates["supplier_price"] = float(data["price"])
    if "mrp" in data:
        updates["mrp"] = float(data["mrp"])
    if updates:
        # Reset to pending if supplier changes product
        updates["status"] = "pending"
        p = prepo.update_product(db, p, updates)
    return _serialize(p)


def delete_product(db: Session, product_id: int, supplier_id: int) -> bool:
    p = prepo.get_product(db, product_id)
    if not p or p.supplier_id != supplier_id:
        return False
    prepo.delete_product(db, p)
    return True


# ── Admin operations ──

def admin_list_products(
    db: Session, skip: int = 0, limit: int = 50,
    supplier_id: Optional[int] = None,
    category: Optional[str] = None,
    status: Optional[str] = None,
    search: Optional[str] = None,
    sort: Optional[str] = None,
) -> dict:
    result = prepo.list_products(db, skip, limit, supplier_id, category, status, search, sort)
    return {
        "items": [_serialize(p) for p in result["items"]],
        "total": result["total"],
        "skip": result["skip"],
        "limit": result["limit"],
    }


def admin_get_product(db: Session, product_id: int) -> Optional[dict]:
    p = prepo.get_product(db, product_id)
    if not p:
        return None
    return _serialize(p)


def admin_update_pricing(db: Session, product_id: int, data: dict) -> Optional[dict]:
    p = prepo.get_product(db, product_id)
    if not p:
        return None
    allowed = {"admin_price", "platform_fee", "discount_pct", "admin_notes", "mrp", "is_featured"}
    updates = {k: v for k, v in data.items() if k in allowed}
    if updates:
        p = prepo.update_product(db, p, updates)
    return _serialize(p)


def admin_approve_product(db: Session, product_id: int) -> Optional[dict]:
    p = prepo.get_product(db, product_id)
    if not p:
        return None
    p = prepo.update_product(db, p, {
        "status": "approved",
        "admin_approved_at": datetime.now(timezone.utc),
        "admin_rejection_reason": None,
    })
    return _serialize(p)


def admin_reject_product(db: Session, product_id: int, reason: str = "") -> Optional[dict]:
    p = prepo.get_product(db, product_id)
    if not p:
        return None
    p = prepo.update_product(db, p, {
        "status": "rejected",
        "admin_rejection_reason": reason,
    })
    return _serialize(p)


def admin_bulk_approve(db: Session, product_ids: list) -> int:
    count = 0
    for pid in product_ids:
        p = prepo.get_product(db, pid)
        if p and p.status != "approved":
            prepo.update_product(db, p, {
                "status": "approved",
                "admin_approved_at": datetime.now(timezone.utc),
                "admin_rejection_reason": None,
            })
            count += 1
    return count


def admin_bulk_pricing(db: Session, product_ids: list, pricing: dict) -> int:
    count = 0
    allowed = {"admin_price", "platform_fee", "discount_pct"}
    updates = {k: v for k, v in pricing.items() if k in allowed and v is not None}
    if not updates:
        return 0
    for pid in product_ids:
        p = prepo.get_product(db, pid)
        if p:
            prepo.update_product(db, p, updates)
            count += 1
    return count


def get_product_stats(db: Session) -> dict:
    return prepo.get_product_stats(db)


# ── Public (buyer) operations ──

def public_list_products(
    db: Session, skip: int = 0, limit: int = 50,
    category: Optional[str] = None,
    brand: Optional[str] = None,
    search: Optional[str] = None,
    sort: Optional[str] = None,
) -> dict:
    result = prepo.list_public_products(db, skip, limit, category, brand, search, sort)
    return {
        "items": [_serialize(p) for p in result["items"]],
        "total": result["total"],
        "skip": result["skip"],
        "limit": result["limit"],
    }


def public_get_product(db: Session, product_id: int) -> Optional[dict]:
    p = prepo.get_product(db, product_id)
    if not p or p.status != "approved":
        return None
    return _serialize(p)


def public_get_categories(db: Session) -> list:
    return prepo.get_categories(db, only_approved=True)


def public_get_brands(db: Session) -> list:
    return prepo.get_brands(db, only_approved=True)
