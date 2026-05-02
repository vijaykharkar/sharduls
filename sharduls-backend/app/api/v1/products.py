import os
import uuid
from pathlib import Path
from typing import Optional, List
from fastapi import APIRouter, Depends, HTTPException, Query, UploadFile, File, Request
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import get_current_user, require_roles
from app.core.config import settings
from app.schemas.response import success_response
import app.services.product_service as psvc

ALLOWED_IMAGE_EXTS = {"jpg", "jpeg", "png", "webp", "gif", "bmp"}

router = APIRouter(tags=["Products"])

admin_dep = require_roles("admin", "superadmin")
supplier_dep = require_roles("supplier")


# ── Schemas ──

class ProductCreate(BaseModel):
    name: str
    category: str
    description: Optional[str] = None
    brand: Optional[str] = None
    sku: Optional[str] = None
    price: float
    mrp: Optional[float] = None
    stock: int = 0
    images: Optional[list] = []
    specs: Optional[dict] = {}


class ProductUpdate(BaseModel):
    name: Optional[str] = None
    category: Optional[str] = None
    description: Optional[str] = None
    brand: Optional[str] = None
    sku: Optional[str] = None
    price: Optional[float] = None
    mrp: Optional[float] = None
    stock: Optional[int] = None
    images: Optional[list] = None
    specs: Optional[dict] = None


class AdminPricingUpdate(BaseModel):
    admin_price: Optional[float] = None
    platform_fee: Optional[float] = None
    discount_pct: Optional[float] = None
    admin_notes: Optional[str] = None
    mrp: Optional[float] = None
    is_featured: Optional[bool] = None


class BulkApproveRequest(BaseModel):
    product_ids: List[int]


class BulkPricingRequest(BaseModel):
    product_ids: List[int]
    admin_price: Optional[float] = None
    platform_fee: Optional[float] = None
    discount_pct: Optional[float] = None


class RejectRequest(BaseModel):
    reason: str = ""


# ── Public endpoints (buyer-facing) ──

@router.get("/products")
def public_products(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=200),
    category: Optional[str] = Query(None),
    brand: Optional[str] = Query(None),
    search: Optional[str] = Query(None, alias="q"),
    sort: Optional[str] = Query(None),
    db: Session = Depends(get_db),
):
    return success_response(
        data=psvc.public_list_products(db, skip, limit, category, brand, search, sort),
        message="Products",
    )


@router.get("/products/categories")
def public_categories(db: Session = Depends(get_db)):
    return success_response(data=psvc.public_get_categories(db), message="Categories")


@router.get("/products/brands")
def public_brands(db: Session = Depends(get_db)):
    return success_response(data=psvc.public_get_brands(db), message="Brands")


@router.get("/products/{product_id}")
def public_product_detail(product_id: int, db: Session = Depends(get_db)):
    data = psvc.public_get_product(db, product_id)
    if not data:
        raise HTTPException(404, "Product not found")
    return success_response(data=data, message="Product detail")


# ── Supplier endpoints ──

@router.get("/supplier/products")
def supplier_products(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=200),
    db: Session = Depends(get_db),
    user=Depends(supplier_dep),
):
    return success_response(
        data=psvc.list_supplier_products(db, user.id, skip, limit),
        message="Your products",
    )


@router.post("/supplier/products")
def supplier_create_product(
    payload: ProductCreate,
    db: Session = Depends(get_db),
    user=Depends(supplier_dep),
):
    data = psvc.create_product(db, user.id, payload.model_dump())
    return success_response(data=data, message="Product created")


@router.patch("/supplier/products/{product_id}")
def supplier_update_product(
    product_id: int,
    payload: ProductUpdate,
    db: Session = Depends(get_db),
    user=Depends(supplier_dep),
):
    data = psvc.update_product(db, product_id, user.id, payload.model_dump(exclude_none=True))
    if not data:
        raise HTTPException(404, "Product not found")
    return success_response(data=data, message="Product updated")


@router.delete("/supplier/products/{product_id}")
def supplier_delete_product(
    product_id: int,
    db: Session = Depends(get_db),
    user=Depends(supplier_dep),
):
    ok = psvc.delete_product(db, product_id, user.id)
    if not ok:
        raise HTTPException(404, "Product not found")
    return success_response(message="Product deleted")


@router.post("/supplier/products/upload-images")
async def supplier_upload_images(
    request: Request,
    files: List[UploadFile] = File(...),
    user=Depends(supplier_dep),
):
    # Path(__file__) = .../sharduls-backend/app/api/v1/products.py
    # .parents[3]    = .../sharduls-backend
    project_root = Path(__file__).resolve().parents[3]
    upload_root = project_root / settings.UPLOAD_DIR / "products"
    upload_root.mkdir(parents=True, exist_ok=True)

    urls = []
    for file in files:
        ext = (file.filename or "").rsplit(".", 1)[-1].lower()
        if ext not in ALLOWED_IMAGE_EXTS:
            raise HTTPException(400, f"File type .{ext} not allowed")
        content = await file.read()
        if len(content) > settings.MAX_UPLOAD_SIZE:
            raise HTTPException(400, "File too large (max 10 MB)")
        filename = f"{uuid.uuid4().hex}.{ext}"
        filepath = upload_root / filename
        filepath.write_bytes(content)
        base_url = str(request.base_url).rstrip("/")
        urls.append(f"{base_url}/uploads/products/{filename}")

    return success_response(data=urls, message="Images uploaded")


# ── Admin endpoints ──

@router.get("/admin/products")
def admin_products(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=200),
    supplier_id: Optional[int] = Query(None),
    category: Optional[str] = Query(None),
    status: Optional[str] = Query(None),
    search: Optional[str] = Query(None),
    sort: Optional[str] = Query(None),
    db: Session = Depends(get_db),
    _=Depends(admin_dep),
):
    return success_response(
        data=psvc.admin_list_products(db, skip, limit, supplier_id, category, status, search, sort),
        message="All products",
    )


@router.get("/admin/products/stats")
def admin_product_stats(db: Session = Depends(get_db), _=Depends(admin_dep)):
    return success_response(data=psvc.get_product_stats(db), message="Product stats")


@router.get("/admin/products/{product_id}")
def admin_product_detail(product_id: int, db: Session = Depends(get_db), _=Depends(admin_dep)):
    data = psvc.admin_get_product(db, product_id)
    if not data:
        raise HTTPException(404, "Product not found")
    return success_response(data=data, message="Product detail")


@router.patch("/admin/products/{product_id}/pricing")
def admin_update_pricing(
    product_id: int,
    payload: AdminPricingUpdate,
    db: Session = Depends(get_db),
    _=Depends(admin_dep),
):
    data = psvc.admin_update_pricing(db, product_id, payload.model_dump(exclude_none=True))
    if not data:
        raise HTTPException(404, "Product not found")
    return success_response(data=data, message="Pricing updated")


@router.post("/admin/products/{product_id}/approve")
def admin_approve_product(product_id: int, db: Session = Depends(get_db), _=Depends(admin_dep)):
    data = psvc.admin_approve_product(db, product_id)
    if not data:
        raise HTTPException(404, "Product not found")
    return success_response(data=data, message="Product approved")


@router.post("/admin/products/{product_id}/reject")
def admin_reject_product(
    product_id: int,
    payload: RejectRequest,
    db: Session = Depends(get_db),
    _=Depends(admin_dep),
):
    data = psvc.admin_reject_product(db, product_id, payload.reason)
    if not data:
        raise HTTPException(404, "Product not found")
    return success_response(data=data, message="Product rejected")


@router.post("/admin/products/bulk-approve")
def admin_bulk_approve(
    payload: BulkApproveRequest,
    db: Session = Depends(get_db),
    _=Depends(admin_dep),
):
    count = psvc.admin_bulk_approve(db, payload.product_ids)
    return success_response(data={"approved_count": count}, message=f"{count} products approved")


@router.post("/admin/products/bulk-pricing")
def admin_bulk_pricing(
    payload: BulkPricingRequest,
    db: Session = Depends(get_db),
    _=Depends(admin_dep),
):
    count = psvc.admin_bulk_pricing(db, payload.product_ids, payload.model_dump(exclude={"product_ids"}))
    return success_response(data={"updated_count": count}, message=f"{count} products updated")
