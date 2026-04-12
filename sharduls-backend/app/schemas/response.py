from typing import Any, Optional
from pydantic import BaseModel


class APIResponse(BaseModel):
    """Standard API response envelope."""
    success: bool = True
    message: str = "OK"
    data: Optional[Any] = None


def success_response(data: Any = None, message: str = "OK") -> dict:
    return {"success": True, "message": message, "data": data}


def error_response(message: str = "Error", data: Any = None) -> dict:
    return {"success": False, "message": message, "data": data}
