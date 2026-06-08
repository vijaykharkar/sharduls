import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.core.config import settings
from app.core.errors import register_error_handlers
from app.api.v1.auth import router as auth_router
from app.api.v1.profile import router as profile_router
from app.api.v1.admin import router as admin_router
from app.api.v1.products import router as products_router
from app.api.v1.orders import router as orders_router
from app.api.v1.payments import router as payments_router
from app.api.v1.webhooks import router as webhooks_router
from app.api.v1.buyer_addresses import router as buyer_addresses_router
from app.api.v1.buyer_wishlist import router as buyer_wishlist_router
from app.core.database import engine, Base
import app.models  # noqa: F401 — registers all ORM models with Base.metadata
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    debug=settings.DEBUG
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register error handlers
register_error_handlers(app)

# Include routers
app.include_router(auth_router, prefix=settings.API_V1_PREFIX)
app.include_router(profile_router, prefix=settings.API_V1_PREFIX)
app.include_router(admin_router, prefix=settings.API_V1_PREFIX)
app.include_router(products_router, prefix=settings.API_V1_PREFIX)
app.include_router(orders_router, prefix=settings.API_V1_PREFIX)
app.include_router(payments_router, prefix=settings.API_V1_PREFIX)
# Webhook route is under /api/v1 but uses raw body — no auth middleware
app.include_router(webhooks_router, prefix=settings.API_V1_PREFIX)
app.include_router(buyer_addresses_router, prefix=settings.API_V1_PREFIX)
app.include_router(buyer_wishlist_router, prefix=settings.API_V1_PREFIX)

# Validate Razorpay config at startup (fail fast)
from app.core.config import validate_razorpay_config
try:
    validate_razorpay_config()
except RuntimeError as e:
    import logging
    logging.getLogger(__name__).warning("Razorpay config warning: %s", e)

# Serve uploaded files
upload_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), settings.UPLOAD_DIR)
os.makedirs(upload_dir, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=upload_dir), name="uploads")


@app.get("/")
async def root():
    return { 
        "message": f"Welcome to {settings.APP_NAME}",
        "version": settings.APP_VERSION,
        "docs": "/docs",
        "redoc": "/redoc"
    }


@app.get("/health")
async def health_check():
    return {"status": "healthy", "version": settings.APP_VERSION}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "app.main:app",   # file_name:app_instance
        host="localhost",
        port=8000,
        reload=True
    )