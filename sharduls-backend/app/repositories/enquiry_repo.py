from sqlalchemy.orm import Session
from typing import Optional, List
from app.models.enquiry import BulkEnquiry, EnquiryStatus


def create_bulk_enquiry(db: Session, enquiry_data: dict) -> BulkEnquiry:
    """Create a new bulk enquiry."""
    enquiry = BulkEnquiry(**enquiry_data)
    db.add(enquiry)
    db.commit()
    db.refresh(enquiry)
    return enquiry


def get_by_id(db: Session, enquiry_id: int) -> Optional[BulkEnquiry]:
    """Get bulk enquiry by ID."""
    return db.query(BulkEnquiry).filter(BulkEnquiry.id == enquiry_id).first()


def get_all(db: Session, skip: int = 0, limit: int = 50) -> List[BulkEnquiry]:
    """Get all bulk enquiries ordered by creation date."""
    return db.query(BulkEnquiry).order_by(BulkEnquiry.created_at.desc()).offset(skip).limit(limit).all()


def get_total_count(db: Session) -> int:
    """Get total count of bulk enquiries."""
    return db.query(BulkEnquiry).count()


def update_status(db: Session, enquiry_id: int, new_status: EnquiryStatus, admin_notes: str = None) -> Optional[BulkEnquiry]:
    """Update status of a bulk enquiry."""
    enquiry = db.query(BulkEnquiry).filter(BulkEnquiry.id == enquiry_id).first()
    if enquiry:
        enquiry.status = new_status
        if admin_notes:
            enquiry.admin_notes = admin_notes
        db.commit()
        db.refresh(enquiry)
    return enquiry
