# Authentication API Guide

## Overview
This API provides comprehensive JWT-based authentication with multiple login methods and role-based access control.

## Authentication Methods

### 1. Email & Password
- Traditional login method
- Supports both suppliers and customers
- Password requirements enforced

### 2. Phone & OTP
- Send OTP to phone number
- Login with phone and OTP
- Ideal for mobile users

### 3. Email & OTP
- Send OTP to email address
- Login with email and OTP
- Passwordless authentication

## User Roles

- **customer**: Regular buyers on the platform
- **seller**: Suppliers who can sell products
- **admin**: Platform administrators

## API Endpoints

### Registration

#### 1. General Registration
```
POST /api/v1/auth/register
```
**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "full_name": "John Doe",
  "phone": "+1234567890",
  "role": "customer"
}
```

#### 2. Supplier Registration
```
POST /api/v1/auth/supplier/register
```
**Request Body:**
```json
{
  "email": "supplier@example.com",
  "password": "SecurePass123!",
  "full_name": "Supplier Name",
  "phone": "+1234567890"
}
```
*Note: Role is automatically set to "seller"*

#### 3. Customer Registration
```
POST /api/v1/auth/customer/register
```
**Request Body:**
```json
{
  "email": "customer@example.com",
  "password": "SecurePass123!",
  "full_name": "Customer Name",
  "phone": "+1234567890"
}
```
*Note: Role is automatically set to "customer"*

**Response (All Registration Endpoints):**
```json
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "token_type": "bearer",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "full_name": "John Doe",
    "phone": "+1234567890",
    "role": "customer",
    "is_active": true,
    "is_verified": false,
    "is_email_verified": false,
    "is_phone_verified": false,
    "profile_image": null,
    "created_at": "2026-01-24T14:30:00",
    "last_login": null
  }
}
```

---

### Login - Email & Password

#### 1. General Login
```
POST /api/v1/auth/login
POST /api/v1/auth/login/email-password
```
**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "role": "customer"  // Optional - validates user has this role
}
```

#### 2. Supplier Login
```
POST /api/v1/auth/supplier/login
```
**Request Body:**
```json
{
  "email": "supplier@example.com",
  "password": "SecurePass123!"
}
```
*Note: Only allows users with "seller" role*

#### 3. Customer Login
```
POST /api/v1/auth/customer/login
```
**Request Body:**
```json
{
  "email": "customer@example.com",
  "password": "SecurePass123!"
}
```
*Note: Only allows users with "customer" role*

---

### OTP - Send OTP

#### 1. Send OTP to Phone
```
POST /api/v1/auth/otp/send/phone
```
**Request Body:**
```json
{
  "phone": "+1234567890"
}
```

**Response:**
```json
{
  "message": "OTP sent to +1234567890",
  "expires_in": 600
}
```

#### 2. Send OTP to Email
```
POST /api/v1/auth/otp/send/email
```
**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "message": "OTP sent to user@example.com",
  "expires_in": 600
}
```

---

### Login - OTP

#### 1. Login with Phone & OTP
```
POST /api/v1/auth/login/phone-otp
```
**Request Body:**
```json
{
  "phone": "+1234567890",
  "otp": "123456",
  "role": "customer"  // Optional
}
```

#### 2. Login with Email & OTP
```
POST /api/v1/auth/login/email-otp
```
**Request Body:**
```json
{
  "email": "user@example.com",
  "otp": "123456",
  "role": "customer"  // Optional
}
```

#### 3. Customer Login with Phone & OTP
```
POST /api/v1/auth/customer/login/phone-otp
```
**Request Body:**
```json
{
  "phone": "+1234567890",
  "otp": "123456"
}
```

#### 4. Customer Login with Email & OTP
```
POST /api/v1/auth/customer/login/email-otp
```
**Request Body:**
```json
{
  "email": "user@example.com",
  "otp": "123456"
}
```

**Response (All Login Endpoints):**
```json
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "token_type": "bearer",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "full_name": "John Doe",
    "role": "customer",
    ...
  }
}
```

---

### Token Management

#### Refresh Token
```
POST /api/v1/auth/refresh
```
**Request Body:**
```json
{
  "refresh_token": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

**Response:**
```json
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "token_type": "bearer"
}
```

---

### User Info

#### Get Current User
```
GET /api/v1/auth/me
```
**Headers:**
```
Authorization: Bearer <access_token>
```

**Response:**
```json
{
  "id": 1,
  "email": "user@example.com",
  "full_name": "John Doe",
  "phone": "+1234567890",
  "role": "customer",
  "is_active": true,
  "is_verified": false,
  "is_email_verified": false,
  "is_phone_verified": false,
  "profile_image": null,
  "created_at": "2026-01-24T14:30:00",
  "last_login": "2026-01-24T14:35:00"
}
```

---

### Logout

#### Logout User
```
POST /api/v1/auth/logout
```
**Headers:**
```
Authorization: Bearer <access_token>
```

**Response:**
```json
{
  "message": "Successfully logged out",
  "detail": "Please remove tokens from client storage"
}
```

---

## Frontend Integration Guide

### For Supplier Portal (company-site)

#### Registration Flow
```javascript
// SignUpStep1.jsx & SignUpStep2.jsx
const response = await fetch('http://localhost:8000/api/v1/auth/supplier/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: formData.email,
    password: formData.password,
    full_name: formData.fullName,
    phone: formData.phone
  })
});

const data = await response.json();
// Store tokens
localStorage.setItem('access_token', data.access_token);
localStorage.setItem('refresh_token', data.refresh_token);
localStorage.setItem('user', JSON.stringify(data.user));
```

#### Login Flow
```javascript
// SignInPage.jsx
const response = await fetch('http://localhost:8000/api/v1/auth/supplier/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: email,
    password: password
  })
});

const data = await response.json();
localStorage.setItem('access_token', data.access_token);
localStorage.setItem('refresh_token', data.refresh_token);
```

---

### For Buyer Portal (buyer-portal)

#### Email & Password Login
```javascript
// Login.jsx or LoginModal.jsx
const response = await fetch('http://localhost:8000/api/v1/auth/customer/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: email,
    password: password
  })
});
```

#### Phone OTP Login
```javascript
// Step 1: Send OTP
const otpResponse = await fetch('http://localhost:8000/api/v1/auth/otp/send/phone', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ phone: phoneNumber })
});

// Step 2: Verify OTP and Login
const loginResponse = await fetch('http://localhost:8000/api/v1/auth/customer/login/phone-otp', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    phone: phoneNumber,
    otp: otpCode
  })
});
```

#### Email OTP Login
```javascript
// Step 1: Send OTP
const otpResponse = await fetch('http://localhost:8000/api/v1/auth/otp/send/email', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: email })
});

// Step 2: Verify OTP and Login
const loginResponse = await fetch('http://localhost:8000/api/v1/auth/customer/login/email-otp', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: email,
    otp: otpCode
  })
});
```

---

## Protected Routes

To access protected endpoints, include the JWT token in the Authorization header:

```javascript
const response = await fetch('http://localhost:8000/api/v1/auth/me', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
    'Content-Type': 'application/json'
  }
});
```

---

## Token Refresh

When the access token expires, use the refresh token to get new tokens:

```javascript
const response = await fetch('http://localhost:8000/api/v1/auth/refresh', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    refresh_token: localStorage.getItem('refresh_token')
  })
});

const data = await response.json();
localStorage.setItem('access_token', data.access_token);
localStorage.setItem('refresh_token', data.refresh_token);
```

---

## Error Handling

All endpoints return appropriate HTTP status codes:

- **200**: Success
- **201**: Created (Registration)
- **400**: Bad Request (Invalid data)
- **401**: Unauthorized (Invalid credentials or expired token)
- **403**: Forbidden (Account inactive or wrong role)
- **404**: Not Found
- **500**: Internal Server Error

Example Error Response:
```json
{
  "detail": "Invalid email or password"
}
```

---

## Security Features

1. **JWT Token-based Authentication**: Secure and stateless
2. **Role-based Access Control**: Separate endpoints for suppliers and customers
3. **Password Strength Validation**: Enforced password requirements
4. **OTP Expiration**: OTPs expire after 10 minutes
5. **OTP Attempt Limiting**: Max 3 attempts per OTP
6. **Token Types**: Separate access and refresh tokens
7. **Token Expiration**: 
   - Access Token: 30 minutes
   - Refresh Token: 7 days

---

## Configuration

Set these environment variables in your `.env` file:

```env
SECRET_KEY=your-secret-key-change-this-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
REFRESH_TOKEN_EXPIRE_DAYS=7
OTP_EXPIRE_MINUTES=10
OTP_LENGTH=6
PASSWORD_MIN_LENGTH=8
PASSWORD_REQUIRE_UPPERCASE=True
PASSWORD_REQUIRE_LOWERCASE=True
PASSWORD_REQUIRE_DIGIT=True
PASSWORD_REQUIRE_SPECIAL=True
```

---

## Development Notes

- OTPs are currently printed to console in development
- For production, integrate SMS service (Twilio, AWS SNS) in `otp_service.py`
- For production, integrate email service in `otp_service.py`
- Consider implementing token blacklist for logout functionality
- Consider using Redis for OTP storage in production
