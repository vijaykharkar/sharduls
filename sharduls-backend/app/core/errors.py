from fastapi import Request, HTTPException
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError


# --------------- Base exception ---------------

class AppError(Exception):
    """Single base exception. Always raised via raise_error(key)."""

    def __init__(self, status_code: int, message: str, error_code: str, details: dict = None):
        self.status_code = status_code
        self.message = message
        self.error_code = error_code
        self.details = details or {}
        super().__init__(message)


# --------------- Central error registry ---------------

ERROR_REGISTRY = {
    'BAD_REQUEST':       {'status_code': 400, 'error_code': 'BAD_REQUEST',       'default_message': 'Bad request'},
    'UNAUTHORIZED':      {'status_code': 401, 'error_code': 'UNAUTHORIZED',      'default_message': 'Not authenticated'},
    'FORBIDDEN':         {'status_code': 403, 'error_code': 'FORBIDDEN',         'default_message': 'Permission denied'},
    'NOT_FOUND':         {'status_code': 404, 'error_code': 'NOT_FOUND',         'default_message': 'Resource not found'},
    'CONFLICT':          {'status_code': 409, 'error_code': 'CONFLICT',          'default_message': 'Resource already exists'},
    'VALIDATION_FAILED': {'status_code': 422, 'error_code': 'VALIDATION_FAILED', 'default_message': 'Validation failed'},
    'INTERNAL_ERROR':    {'status_code': 500, 'error_code': 'INTERNAL_ERROR',    'default_message': 'Internal server error'},
}


def raise_error(key: str, message: str = None, details: dict = None):
    """Raise an AppError looked up from ERROR_REGISTRY by key."""
    cfg = ERROR_REGISTRY.get(key, ERROR_REGISTRY['INTERNAL_ERROR'])
    raise AppError(
        status_code=cfg['status_code'],
        message=message or cfg['default_message'],
        error_code=cfg['error_code'],
        details=details,
    )


# --------------- Exception handlers ---------------

def _error_response(status_code: int, message: str, error_code: str, details: dict = None):
    body = {
        "success": False,
        "message": message,
        "error_code": error_code,
    }
    if details:
        body["details"] = details
    return JSONResponse(status_code=status_code, content=body)


async def app_error_handler(request: Request, exc: AppError):
    return _error_response(exc.status_code, exc.message, exc.error_code, exc.details)


async def http_exception_handler(request: Request, exc: HTTPException):
    return _error_response(exc.status_code, str(exc.detail), "HTTP_ERROR")


async def validation_exception_handler(request: Request, exc: RequestValidationError):
    field_errors = {}
    for err in exc.errors():
        loc = err.get("loc", [])
        field = loc[-1] if loc else "unknown"
        field_errors[str(field)] = err.get("msg", "Invalid value")
    return _error_response(422, "Validation failed", "VALIDATION_FAILED", field_errors)


async def generic_exception_handler(request: Request, exc: Exception):
    return _error_response(500, "An unexpected error occurred", "INTERNAL_ERROR")


def register_error_handlers(app):
    """Register all custom exception handlers on the FastAPI app."""
    app.add_exception_handler(AppError, app_error_handler)
    app.add_exception_handler(HTTPException, http_exception_handler)
    app.add_exception_handler(RequestValidationError, validation_exception_handler)
    app.add_exception_handler(Exception, generic_exception_handler)
