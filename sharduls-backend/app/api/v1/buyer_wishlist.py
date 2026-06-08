"""
Buyer Wishlist API.

Endpoints:
  GET    /wishlist                    — List user's wishlist (returns full product details)
  POST   /wishlist/{product_id}       — Add product to wishlist
  DELETE /wishlist/{product_id}       — Remove product from wishlist
  POST   /wishlist/{product_id}/toggle — Add if absent, remove if present
"""
import logging

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import require_roles
from app.models.user import Wishlist
from app.models.product import Product
from app.schemas.response import success_response

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/wishlist", tags=["Buyer Wishlist"])

buyer_dep = require_roles("buyer")


# ── Helpers ────────────────────────────────────────────────────────────────

def _serialize_product(p: Product) -> dict:
    base_price  = p.admin_price if p.admin_price is not None else p.supplier_price
    final_price = base_price + (p.platform_fee or 0)
    if (p.discount_pct or 0) > 0:
        final_price = final_price * (1 - p.discount_pct / 100)
    return {
        "id":           p.id,
        "name":         p.name,
        "slug":         p.slug,
        "category":     p.category,
        "brand":        p.brand,
        "image":        (p.images or [None])[0],
        "images":       p.images or [],
        "mrp":          p.mrp,
        "price":        round(final_price, 2),
        "discount":     round(p.discount_pct or 0),
        "discount_pct": p.discount_pct or 0,
        "stock":        p.stock,
        "inStock":      p.stock > 0,
        "status":       p.status,
    }


def _get_wishlist_item(db: Session, user_id: int, product_id: int):
    return db.query(Wishlist).filter(
        Wishlist.user_id == user_id,
        Wishlist.product_id == product_id,
    ).first()


# ── Routes ─────────────────────────────────────────────────────────────────

@router.get("")
def get_wishlist(
    db: Session = Depends(get_db),
    current_user=Depends(buyer_dep),
):
    wish_items = (
        db.query(Wishlist)
        .filter(Wishlist.user_id == current_user.id)
        .order_by(Wishlist.id.desc())
        .all()
    )
    if not wish_items:
        return success_response(data=[])

    product_ids = [w.product_id for w in wish_items]
    products    = db.query(Product).filter(
        Product.id.in_(product_ids),
        Product.status == "approved",
    ).all()
    product_map = {p.id: p for p in products}

    result = [
        _serialize_product(product_map[w.product_id])
        for w in wish_items
        if w.product_id in product_map
    ]
    return success_response(data=result)


@router.post("/{product_id}")
def add_to_wishlist(
    product_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(buyer_dep),
):
    product = db.query(Product).filter(
        Product.id == product_id,
        Product.status == "approved",
    ).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found or not available")

    existing = _get_wishlist_item(db, current_user.id, product_id)
    if existing:
        return success_response(data=_serialize_product(product), message="Already in wishlist")

    item = Wishlist(user_id=current_user.id, product_id=product_id)
    db.add(item)
    db.commit()
    logger.info("Wishlist add: user=%s product=%s", current_user.id, product_id)
    return success_response(data=_serialize_product(product), message="Added to wishlist")


@router.delete("/{product_id}")
def remove_from_wishlist(
    product_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(buyer_dep),
):
    item = _get_wishlist_item(db, current_user.id, product_id)
    if not item:
        raise HTTPException(status_code=404, detail="Item not in wishlist")
    db.delete(item)
    db.commit()
    logger.info("Wishlist remove: user=%s product=%s", current_user.id, product_id)
    return success_response(data={"product_id": product_id}, message="Removed from wishlist")


@router.post("/{product_id}/toggle")
def toggle_wishlist(
    product_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(buyer_dep),
):
    product = db.query(Product).filter(
        Product.id == product_id,
        Product.status == "approved",
    ).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found or not available")

    existing = _get_wishlist_item(db, current_user.id, product_id)
    if existing:
        db.delete(existing)
        db.commit()
        return success_response(
            data={"product_id": product_id, "in_wishlist": False},
            message="Removed from wishlist",
        )
    else:
        item = Wishlist(user_id=current_user.id, product_id=product_id)
        db.add(item)
        db.commit()
        return success_response(
            data={"product_id": product_id, "in_wishlist": True, "product": _serialize_product(product)},
            message="Added to wishlist",
        )
