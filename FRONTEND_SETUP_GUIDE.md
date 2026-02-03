# Frontend Setup Guide

## Installation

### Buyer Portal (Redux)

```bash
cd buyer-portal
npm install axios @reduxjs/toolkit react-redux react-router-dom
```

### Company Site (Context API)

```bash
cd company-site
npm install axios react-router-dom
```

## Environment Setup

Create `.env` file in each project root:

### buyer-portal/.env
```
VITE_API_BASE_URL=http://localhost:8000
```

### company-site/.env
```
VITE_API_BASE_URL=http://localhost:8000
```

## Project Structure

### Buyer Portal (Redux)
```
buyer-portal/
├── src/
│   ├── api/
│   │   ├── axiosInstance.js      # Axios config with interceptors
│   │   └── authService.js        # Auth API methods
│   ├── store/
│   │   ├── index.js              # Redux store configuration
│   │   └── slices/
│   │       └── authSlice.js      # Auth state management
│   ├── components/
│   │   └── auth/
│   │       └── LoginModal.jsx    # Login component (updated)
│   └── main.jsx                  # Redux Provider wrapper
```

### Company Site (Context API)
```
company-site/
├── src/
│   ├── api/
│   │   ├── axiosInstance.js      # Axios config with interceptors
│   │   └── authService.js        # Auth API methods
│   ├── context/
│   │   ├── AuthContext.jsx       # Auth Context Provider
│   │   └── index.js              # Context exports
│   ├── supplier/
│   │   ├── pages/
│   │   │   ├── SignInPage.jsx    # Login page
│   │   │   └── SignUpPage.jsx    # Registration page
│   │   └── components/
│   └── main.jsx                  # AuthProvider wrapper
```

## Features Implemented

### Both Portals
✅ Axios instance with automatic token refresh
✅ Request/Response interceptors
✅ Automatic token management
✅ Error handling
✅ Logout on authentication failure

### Buyer Portal (Redux)
✅ Complete Redux store with async thunks
✅ Multiple authentication methods:
  - Email & Password
  - Phone & OTP
  - Email & OTP
✅ Persistent authentication state
✅ Loading and error states
✅ OTP state management

### Company Site (Context API)
✅ React Context for state management
✅ Supplier authentication
✅ Persistent authentication state
✅ Loading and error states
✅ Simple and clean API

## Usage Examples

### Buyer Portal - Using Redux

#### Login with Email & Password
```jsx
import { useDispatch, useSelector } from 'react-redux';
import { loginEmailPassword } from '../store/slices/authSlice';

function LoginModal() {
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector(state => state.auth);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginEmailPassword({
        email: email,
        password: password
      })).unwrap();
      // Success - user is now authenticated
      navigate('/');
    } catch (err) {
      // Error handled in Redux state
      console.error('Login failed:', err);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      {/* Form fields */}
      {error && <div className="error">{error}</div>}
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
```

#### Login with Phone OTP
```jsx
import { useDispatch, useSelector } from 'react-redux';
import { sendPhoneOTP, loginPhoneOTP, resetOtpState } from '../store/slices/authSlice';

function PhoneOTPLogin() {
  const dispatch = useDispatch();
  const { otpSent, otpLoading, loading, error } = useSelector(state => state.auth);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');

  const handleSendOTP = async () => {
    try {
      await dispatch(sendPhoneOTP(phone)).unwrap();
      // OTP sent successfully
    } catch (err) {
      console.error('Failed to send OTP:', err);
    }
  };

  const handleVerifyOTP = async () => {
    try {
      await dispatch(loginPhoneOTP({ phone, otp })).unwrap();
      // Success - user is authenticated
      navigate('/');
    } catch (err) {
      console.error('OTP verification failed:', err);
    }
  };

  return (
    <div>
      {!otpSent ? (
        <div>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} />
          <button onClick={handleSendOTP} disabled={otpLoading}>
            {otpLoading ? 'Sending...' : 'Send OTP'}
          </button>
        </div>
      ) : (
        <div>
          <input value={otp} onChange={(e) => setOtp(e.target.value)} />
          <button onClick={handleVerifyOTP} disabled={loading}>
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
          <button onClick={() => dispatch(resetOtpState())}>
            Resend OTP
          </button>
        </div>
      )}
      {error && <div className="error">{error}</div>}
    </div>
  );
}
```

#### Registration
```jsx
import { useDispatch } from 'react-redux';
import { register } from '../store/slices/authSlice';

function RegisterForm() {
  const dispatch = useDispatch();

  const handleRegister = async (formData) => {
    try {
      await dispatch(register({
        email: formData.email,
        password: formData.password,
        full_name: formData.fullName,
        phone: formData.phone
      })).unwrap();
      // Success
      navigate('/');
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };
}
```

#### Logout
```jsx
import { useDispatch } from 'react-redux';
import { logoutUser } from '../store/slices/authSlice';

function LogoutButton() {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate('/login');
  };

  return <button onClick={handleLogout}>Logout</button>;
}
```

#### Protected Routes
```jsx
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useSelector(state => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
}
```

---

### Company Site - Using Context API

#### Login (Supplier)
```jsx
import { useAuth } from '../context';

function SignInPage() {
  const { login, loading, error, clearError } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({
        email: email,
        password: password
      });
      // Success - navigate to dashboard
      navigate('/supplier/dashboard');
    } catch (err) {
      // Error is automatically set in context
      console.error('Login failed:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      {error && (
        <div className="error">
          {error}
          <button onClick={clearError}>×</button>
        </div>
      )}
      <button type="submit" disabled={loading}>
        {loading ? 'Signing In...' : 'Sign In'}
      </button>
    </form>
  );
}
```

#### Registration (Supplier)
```jsx
import { useAuth } from '../context';

function SignUpStep2() {
  const { register, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (formData) => {
    try {
      await register({
        email: formData.email,
        password: formData.password,
        full_name: formData.fullName,
        phone: formData.phone
      });
      // Success - navigate to dashboard
      navigate('/supplier/dashboard');
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      {error && <div className="error">{error}</div>}
      <button type="submit" disabled={loading}>
        {loading ? 'Creating Account...' : 'Sign Up'}
      </button>
    </form>
  );
}
```

#### Get Current User
```jsx
import { useEffect } from 'react';
import { useAuth } from '../context';

function Dashboard() {
  const { user, isAuthenticated, fetchCurrentUser } = useAuth();

  useEffect(() => {
    if (isAuthenticated && !user) {
      fetchCurrentUser();
    }
  }, [isAuthenticated, user, fetchCurrentUser]);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1>Welcome, {user.full_name}</h1>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
    </div>
  );
}
```

#### Logout
```jsx
import { useAuth } from '../context';

function DashboardLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/supplier/signin');
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
}
```

#### Protected Routes
```jsx
import { useAuth } from '../context';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/supplier/signin" />;
  }

  return children;
}
```

#### Access User in Any Component
```jsx
import { useAuth } from '../context';

function AnyComponent() {
  const { user, isAuthenticated } = useAuth();

  return (
    <div>
      {isAuthenticated ? (
        <p>Hello, {user.full_name}</p>
      ) : (
        <p>Please login</p>
      )}
    </div>
  );
}
```

---

## Token Storage

### Buyer Portal
- Access Token: `access_token`
- Refresh Token: `refresh_token`
- User Data: `user`

### Company Site (Supplier)
- Access Token: `supplier_access_token`
- Refresh Token: `supplier_refresh_token`
- User Data: `supplier_user`

## Automatic Token Refresh

Both portals have automatic token refresh implemented:

1. When API returns 401 Unauthorized
2. Axios interceptor catches the error
3. Attempts to refresh token using refresh_token
4. If successful, retries the original request
5. If fails, logs out and redirects to login

## API Endpoints Used

All endpoints from `API_AUTHENTICATION_GUIDE.md`:

**Buyer Portal:**
- `/api/v1/auth/customer/register`
- `/api/v1/auth/customer/login`
- `/api/v1/auth/customer/login/phone-otp`
- `/api/v1/auth/customer/login/email-otp`
- `/api/v1/auth/otp/send/phone`
- `/api/v1/auth/otp/send/email`
- `/api/v1/auth/refresh`
- `/api/v1/auth/me`
- `/api/v1/auth/logout`

**Company Site (Supplier):**
- `/api/v1/auth/supplier/register`
- `/api/v1/auth/supplier/login`
- `/api/v1/auth/refresh`
- `/api/v1/auth/me`
- `/api/v1/auth/logout`

## Next Steps

1. Update LoginModal.jsx in buyer-portal to use Redux
2. Update SignInPage.jsx and SignUpPage.jsx in company-site to use Context API
3. Add protected routes to both applications
4. Test all authentication flows
5. Add error handling UI components
6. Add loading states UI components

## Troubleshooting

### CORS Issues
Make sure your backend allows requests from your frontend origins:
```python
# backend config.py
CORS_ORIGINS = [
    "http://localhost:3000",
    "http://localhost:5173",
    "http://localhost:5174"
]
```

### Token Not Being Sent
Check that tokens are being saved in localStorage and axios interceptor is working.

### 401 Errors
Verify that:
1. Token is valid and not expired
2. Token is being sent in Authorization header
3. Backend is correctly validating the token

### Cannot Read Properties of Null
Make sure providers are wrapped correctly in main.jsx files.
