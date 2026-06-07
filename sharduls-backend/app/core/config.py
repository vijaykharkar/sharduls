from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore",
        case_sensitive=True,
    )

    APP_NAME: str
    APP_VERSION: str
    DEBUG: bool
    API_V1_PREFIX: str

    # Database
    DATABASE_URL: str
    DATABASE_POOL_SIZE: int
    DATABASE_MAX_OVERFLOW: int

    # Redis
    REDIS_URL: str
    CACHE_EXPIRE_TIME: int

    # JWT
    SECRET_KEY: str
    ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int
    REFRESH_TOKEN_EXPIRE_DAYS: int

    # CORS
    CORS_ORIGINS: List[str]

    # Email
    SMTP_HOST: str
    SMTP_PORT: int
    SMTP_USER: str
    SMTP_PASSWORD: str
    SMTP_FROM_EMAIL: str
    SMTP_FROM_NAME: str

    # File Upload
    UPLOAD_DIR: str
    MAX_UPLOAD_SIZE: int
    ALLOWED_EXTENSIONS: str

    # Security
    PASSWORD_MIN_LENGTH: int
    PASSWORD_REQUIRE_UPPERCASE: bool
    PASSWORD_REQUIRE_LOWERCASE: bool
    PASSWORD_REQUIRE_DIGIT: bool
    PASSWORD_REQUIRE_SPECIAL: bool

    # OTP
    OTP_EXPIRE_MINUTES: int
    OTP_LENGTH: int

    # Razorpay
    RAZORPAY_KEY_ID: str
    RAZORPAY_SECRET: str
    RAZORPAY_WEBHOOK_SECRET: str
    RAZORPAY_CURRENCY: str

    # URLs
    FRONTEND_URL: str
    BACKEND_URL: str

    # Pagination
    DEFAULT_PAGE_SIZE: int
    MAX_PAGE_SIZE: int


settings = Settings()


def validate_razorpay_config() -> None:
    missing = []

    if not settings.RAZORPAY_KEY_ID:
        missing.append("RAZORPAY_KEY_ID")

    if not settings.RAZORPAY_SECRET:
        missing.append("RAZORPAY_SECRET")

    if not settings.RAZORPAY_WEBHOOK_SECRET:
        missing.append("RAZORPAY_WEBHOOK_SECRET")

    if missing:
        raise RuntimeError(
            f"Missing required Razorpay env vars: {', '.join(missing)}"
        )