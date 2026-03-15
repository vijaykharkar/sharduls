from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.services import enquiry_service
from app.schemas.enquiry import BulkEnquiryCreate, BulkEnquiryResponse, BulkEnquiryListResponse

router = APIRouter()


@router.post("/bulk", response_model=BulkEnquiryResponse, status_code=status.HTTP_201_CREATED)
async def create_bulk_enquiry(enquiry_data: BulkEnquiryCreate, db: Session = Depends(get_db)):
    """
    Submit a new bulk enquiry.
    Sends confirmation email to customer and notification to admin.
    """
    enquiry = enquiry_service.create_bulk_enquiry(db, enquiry_data)
    return enquiry


@router.get("/bulk", response_model=BulkEnquiryListResponse)
async def get_all_enquiries(
    skip: int = 0,
    limit: int = 50,
    db: Session = Depends(get_db)
):
    """Get all bulk enquiries (admin endpoint)."""
    result = enquiry_service.get_all_enquiries(db, skip, limit)
    return result
