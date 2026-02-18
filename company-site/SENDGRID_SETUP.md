# SendGrid Email Setup Guide

This guide will help you set up SendGrid for the contact form email functionality.

## Prerequisites
- A SendGrid account (free tier available)
- Node.js installed

## Step 1: Create SendGrid Account
1. Go to [SendGrid](https://sendgrid.com/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Create API Key
1. Log in to your SendGrid account
2. Go to **Settings** > **API Keys**
3. Click **Create API Key**
4. Choose **Full Access** or **Restricted Access** (with Mail Send permission)
5. Name your API key (e.g., "Company Website Contact Form")
6. Click **Create & View**
7. **Copy the API key** (you won't be able to see it again!)

## Step 3: Verify Sender Identity
1. Go to **Settings** > **Sender Authentication**
2. Choose one of these options:
   - **Single Sender Verification** (Quick, for testing)
   - **Domain Authentication** (Recommended for production)

### For Single Sender Verification:
1. Click **Verify a Single Sender**
2. Fill in the form with your details
3. Use the email: `noreply@shardulge.com` or your company email
4. Check your email and verify

### For Domain Authentication (Production):
1. Click **Authenticate Your Domain**
2. Follow the DNS setup instructions
3. Add the provided DNS records to your domain

## Step 4: Configure Environment Variables
1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` file with your details:
   ```env
   SENDGRID_API_KEY=SG.your_actual_api_key_here
   SENDER_EMAIL=noreply@shardulge.com
   RECIPIENT_EMAIL=director@shardulge.com
   PORT=3001
   ```

## Step 5: Install Dependencies
```bash
npm install
```

## Step 6: Run the Application

### Development Mode (Frontend + Backend):
```bash
npm run dev:all
```

This will start:
- Vite development server on `http://localhost:5173` (or 5174)
- Express backend server on `http://localhost:3001`

### Run Separately:
```bash
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend
npm run server
```

## Testing the Contact Form
1. Open the website in your browser
2. Navigate to the Contact page
3. Fill out the form
4. Optionally attach a file (max 5MB)
5. Click "Send Message"
6. Check your recipient email inbox

## File Upload Support
The contact form supports these file types:
- PDF (.pdf)
- Word Documents (.doc, .docx)
- Images (.jpg, .jpeg, .png)
- Text files (.txt)

**Maximum file size:** 5MB

## Email Template
The email will be sent with:
- Professional HTML formatting
- All user details (name, email, phone, subject, message)
- Attached file (if provided)
- Timestamp in IST timezone
- Reply-to set to user's email

## Troubleshooting

### Email not sending
1. Check your SendGrid API key is correct
2. Verify your sender email is verified in SendGrid
3. Check server console for error messages
4. Ensure backend server is running on port 3001

### File upload issues
1. Check file size is under 5MB
2. Verify file type is allowed
3. Check server has write permissions for `uploads/` folder

### Common Errors
- **"Sender email is not verified"**: Verify your sender email in SendGrid
- **"Invalid API key"**: Double-check your API key in `.env` file
- **"CORS error"**: Ensure backend server is running and vite proxy is configured

## Production Deployment
1. Set up domain authentication in SendGrid
2. Use environment variables in your hosting platform
3. Never commit `.env` file to version control
4. Use a production-ready web server (PM2, etc.)

## Support
For SendGrid support:
- [SendGrid Documentation](https://docs.sendgrid.com/)
- [SendGrid Support](https://support.sendgrid.com/)

For technical issues with the contact form, contact your development team.
