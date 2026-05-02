from typing import Optional, List
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.models.product import Product
from app.models.user import User


def create_product(db: Session, data: dict) -> Product:
    product = Product(**data)
    db.add(product)
    db.commit()
    db.refresh(product)
    return product


def get_product(db: Session, product_id: int) -> Optional[Product]:
    return db.query(Product).filter(Product.id == product_id).first()


def list_products(
    db: Session, skip: int = 0, limit: int = 50,
    supplier_id: Optional[int] = None,
    category: Optional[str] = None,
    status: Optional[str] = None,
    search: Optional[str] = None,
    sort: Optional[str] = None,
) -> dict:
    q = db.query(Product)

    if supplier_id:
        q = q.filter(Product.supplier_id == supplier_id)
    if category:
        q = q.filter(Product.category == category)
    if status:
        q = q.filter(Product.status == status)
    if search:
        q = q.filter(
            (Product.name.ilike(f"%{search}%")) |
            (Product.category.ilike(f"%{search}%")) |
            (Product.brand.ilike(f"%{search}%")) |
            (Product.sku.ilike(f"%{search}%"))
        )

    total = q.count()

    if sort == "price_low":
        q = q.order_by(Product.supplier_price.asc())
    elif sort == "price_high":
        q = q.order_by(Product.supplier_price.desc())
    elif sort == "newest":
        q = q.order_by(Product.created_at.desc())
    elif sort == "name_asc":
        q = q.order_by(Product.name.asc())
    else:
        q = q.order_by(Product.created_at.desc())

    items = q.offset(skip).limit(limit).all()
    return {"items": items, "total": total, "skip": skip, "limit": limit}


def list_public_products(
    db: Session, skip: int = 0, limit: int = 50,
    category: Optional[str] = None,
    brand: Optional[str] = None,
    search: Optional[str] = None,
    sort: Optional[str] = None,
) -> dict:
    """Only approved products visible to buyers."""
    q = db.query(Product).filter(Product.status == "approved")

    if category:
        q = q.filter(Product.category == category)
    if brand:
        q = q.filter(Product.brand == brand)
    if search:
        q = q.filter(
            (Product.name.ilike(f"%{search}%")) |
            (Product.category.ilike(f"%{search}%")) |
            (Product.brand.ilike(f"%{search}%")) |
            (Product.description.ilike(f"%{search}%"))
        )

    total = q.count()

    if sort == "price_low":
        q = q.order_by(func.coalesce(Product.admin_price, Product.supplier_price).asc())
    elif sort == "price_high":
        q = q.order_by(func.coalesce(Product.admin_price, Product.supplier_price).desc())
    elif sort == "newest":
        q = q.order_by(Product.created_at.desc())
    elif sort == "rating":
        q = q.order_by(Product.created_at.desc())  # placeholder
    elif sort == "discount":
        q = q.order_by(Product.discount_pct.desc().nullslast())
    else:
        q = q.order_by(Product.created_at.desc())

    items = q.offset(skip).limit(limit).all()
    return {"items": items, "total": total, "skip": skip, "limit": limit}


def update_product(db: Session, product: Product, data: dict) -> Product:
    for k, v in data.items():
        if hasattr(product, k):
            setattr(product, k, v)
    db.commit()
    db.refresh(product)
    return product


def delete_product(db: Session, product: Product) -> None:
    db.delete(product)
    db.commit()


def get_categories(db: Session, only_approved: bool = False) -> List[str]:
    q = db.query(Product.category).distinct()
    if only_approved:
        q = q.filter(Product.status == "approved")
    return [r[0] for r in q.all() if r[0]]


def get_brands(db: Session, only_approved: bool = False) -> List[str]:
    q = db.query(Product.brand).distinct()
    if only_approved:
        q = q.filter(Product.status == "approved")
    return [r[0] for r in q.all() if r[0]]


def get_product_stats(db: Session) -> dict:
    total = db.query(func.count(Product.id)).scalar() or 0
    pending = db.query(func.count(Product.id)).filter(Product.status == "pending").scalar() or 0
    approved = db.query(func.count(Product.id)).filter(Product.status == "approved").scalar() or 0
    rejected = db.query(func.count(Product.id)).filter(Product.status == "rejected").scalar() or 0
    return {
        "total_products": total,
        "pending_products": pending,
        "approved_products": approved,
        "rejected_products": rejected,
    }
