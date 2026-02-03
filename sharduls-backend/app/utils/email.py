from typing import List
from app.core.config import settings


class EmailService:
    """Email service for sending emails"""
    
    @staticmethod
    def send_email(to: List[str], subject: str, body: str, html: str = None):
        """Send email"""
        # TODO: Implement actual email sending logic
        # For now, just print to console
        print(f"📧 Email sent to {to}")
        print(f"Subject: {subject}")
        print(f"Body: {body}")
        pass
    
    @staticmethod
    def send_welcome_email(email: str, full_name: str):
        """Send welcome email to new user"""
        subject = f"Welcome to {settings.APP_NAME}!"
        body = f"Hello {full_name},\n\nWelcome to {settings.APP_NAME}. Thank you for registering!"
        
        EmailService.send_email([email], subject, body)
    
    @staticmethod
    def send_otp_email(email: str, otp: str):
        """Send OTP email"""
        subject = f"Your OTP for {settings.APP_NAME}"
        body = f"Your OTP is: {otp}\n\nThis OTP will expire in {settings.OTP_EXPIRE_MINUTES} minutes."
        
        EmailService.send_email([email], subject, body)
    
    @staticmethod
    def send_password_reset_email(email: str, reset_token: str):
        """Send password reset email"""
        subject = f"Password Reset - {settings.APP_NAME}"
        body = f"Click the link to reset your password: {reset_token}"
        
        EmailService.send_email([email], subject, body)
