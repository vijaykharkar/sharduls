from sqlalchemy.orm import Session
from app.repositories import enquiry_repo
from app.schemas.enquiry import BulkEnquiryCreate
from app.utils import email as email_utils
from app.core.config import settings


def create_bulk_enquiry(db: Session, enquiry_data: BulkEnquiryCreate) -> dict:
    """Create a bulk enquiry and send notification emails."""
    enquiry = enquiry_repo.create_bulk_enquiry(db, enquiry_data.model_dump())

    try:
        _send_customer_confirmation(enquiry_data)
    except Exception as e:
        print(f"Failed to send customer confirmation email: {e}")

    try:
        _send_admin_notification(enquiry_data)
    except Exception as e:
        print(f"Failed to send admin notification email: {e}")

    return enquiry


def get_all_enquiries(db: Session, skip: int = 0, limit: int = 50) -> dict:
    """Get all bulk enquiries with total count."""
    enquiries = enquiry_repo.get_all(db, skip, limit)
    total = enquiry_repo.get_total_count(db)
    return {"total": total, "enquiries": enquiries}


def _send_customer_confirmation(enquiry_data: BulkEnquiryCreate):
    """Send confirmation email to the customer."""
    subject = f"Bulk Enquiry Received - {settings.APP_NAME}"
    body = (
        f"Dear {enquiry_data.contact_person},\n\n"
        f"Thank you for submitting your bulk enquiry with {settings.APP_NAME}.\n\n"
        f"Enquiry Details:\n"
        f"- Company: {enquiry_data.company_name}\n"
        f"- Product: {enquiry_data.product_name}\n"
        f"- Category: {enquiry_data.product_category or 'N/A'}\n"
        f"- Quantity: {enquiry_data.quantity} {enquiry_data.unit}\n"
        f"- Timeline: {enquiry_data.delivery_timeline or 'Not specified'}\n\n"
        f"Our sales team will review your requirements and get back to you within 24 hours "
        f"with a competitive quote.\n\n"
        f"Best regards,\n"
        f"Sales Team\n"
        f"{settings.APP_NAME}"
    )
    email_utils.send_email([enquiry_data.email], subject, body)


def _send_admin_notification(enquiry_data: BulkEnquiryCreate):
    """Send notification email to admin/sales team."""
    subject = f"New Bulk Enquiry - {enquiry_data.company_name}"
    body = (
        f"New bulk enquiry received:\n\n"
        f"Company: {enquiry_data.company_name}\n"
        f"Contact: {enquiry_data.contact_person}\n"
        f"Email: {enquiry_data.email}\n"
        f"Phone: {enquiry_data.phone}\n"
        f"Product Category: {enquiry_data.product_category or 'N/A'}\n"
        f"Product: {enquiry_data.product_name}\n"
        f"Quantity: {enquiry_data.quantity} {enquiry_data.unit}\n"
        f"Timeline: {enquiry_data.delivery_timeline or 'Not specified'}\n"
        f"Description: {enquiry_data.description or 'N/A'}\n"
    )
    admin_email = settings.SMTP_FROM_EMAIL or "director@shardulge.com"
    email_utils.send_email([admin_email], subject, body)
