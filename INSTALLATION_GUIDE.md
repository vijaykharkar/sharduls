# Installation Guide - Complete Setup

## ✅ **All Files Successfully Recovered!**

All projects have been fully recovered with complete code.

---

## **📋 What Was Recovered**

### **Backend (sharduls-backend/)** - 25+ files
- ✅ All SQLAlchemy models (User, Product, Order, Cart, Payment)
- ✅ Core modules (config, security, database)
- ✅ Services (auth_service, otp_service)
- ✅ Repositories (user_repo)
- ✅ API endpoints (16 auth endpoints)
- ✅ Utilities (email service)
- ✅ All __init__.py files
- ✅ main.py, requirements.txt

### **Buyer Portal (buyer-portal/)** - 25+ files
- ✅ Complete Redux store with 3 slices
- ✅ Axios instance with auto token refresh
- ✅ All UI components (Header, Footer, Layout, LoginModal)
- ✅ All pages (Home, Login, Cart, BulkEnquiry, BecomeSupplier)
- ✅ Auth service with all API methods
- ✅ Configuration (package.json, vite, tailwind)

### **Company Site (company-site/)** - 20+ files
- ✅ Complete Context API setup
- ✅ Axios instance with supplier token handling
- ✅ All supplier pages (SignIn, SignUp, Dashboard, Profile, Catalog, Support)
- ✅ All components (DashboardLayout, SignUpSteps, DocumentsStep)
- ✅ Auth context with hooks
- ✅ Configuration (package.json, vite, tailwind)

---

## **🚀 Installation Instructions**

### **1. Backend Setup**

```bash
cd sharduls-backend

# Install dependencies
pip install -r requirements.txt

# Create .env file (copy .env.example and configure)
# Add your DATABASE_URL, SECRET_KEY, etc.

# Run database migrations (if using Alembic)
# alembic upgrade head

# Start the server
uvicorn app.main:app --reload --port 8000
```

**Backend will run on:** `http://localhost:8000`

---

### **2. Buyer Portal Setup**

```bash
cd buyer-portal

# Install dependencies
npm install

# .env file already created with:
# VITE_API_BASE_URL=http://localhost:8000

# Start development server
npm run dev
```

**Buyer Portal will run on:** `http://localhost:5173`

---

### **3. Company Site (Supplier Portal) Setup**

```bash
cd company-site

# Install dependencies
npm install

# .env file already created with:
# VITE_API_BASE_URL=http://localhost:8000

# Start development server
npm run dev
```

**Company Site will run on:** `http://localhost:5174`

---

## **📝 Notes About Lint Warnings**

The `@tailwind` warnings in CSS files are **normal and expected**. They occur because:
- TailwindCSS uses special directives (`@tailwind base`, `@tailwind components`, `@tailwind utilities`)
- Your IDE's CSS linter doesn't recognize these as standard CSS
- These warnings will **not affect** your application
- Once you run `npm install`, TailwindCSS will process these correctly

**You can safely ignore these warnings.**

---

## **🔑 Environment Variables**

### Backend (.env)
Create `sharduls-backend/.env` with:
```env
# Database
DATABASE_URL=postgresql://postgres:password@localhost:5432/ecommerce_db

# JWT
SECRET_KEY=your-secret-key-change-this-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
REFRESH_TOKEN_EXPIRE_DAYS=7

# OTP
OTP_EXPIRE_MINUTES=10
OTP_LENGTH=6

# CORS
CORS_ORIGINS=http://localhost:5173,http://localhost:5174
```

### Frontend (.env already created)
Both projects have `.env` files with:
```env
VITE_API_BASE_URL=http://localhost:8000
```

---

## **🧪 Testing the Setup**

### 1. Test Backend
```bash
# Visit in browser
http://localhost:8000/docs  # Swagger UI
http://localhost:8000/health  # Health check
```

### 2. Test Buyer Portal
```bash
# Visit in browser
http://localhost:5173  # Home page
```

### 3. Test Company Site
```bash
# Visit in browser  
http://localhost:5174/supplier/signin  # Supplier sign in
```

---

## **📂 Project Structure**

```
sharduls/
├── sharduls-backend/          # FastAPI Backend
│   ├── app/
│   │   ├── api/v1/            # API endpoints
│   │   ├── core/              # Config, security, database
│   │   ├── models/            # SQLAlchemy models
│   │   ├── schemas/           # Pydantic schemas
│   │   ├── services/          # Business logic
│   │   ├── repositories/      # Data access
│   │   ├── utils/             # Utilities
│   │   └── main.py            # Application entry
│   ├── requirements.txt
│   └── .env.example
│
├── buyer-portal/              # Buyer UI (Redux)
│   ├── src/
│   │   ├── api/               # Axios & services
│   │   ├── store/             # Redux store
│   │   ├── components/        # React components
│   │   ├── pages/             # Page components
│   │   └── main.jsx           # App entry
│   ├── package.json
│   └── .env
│
└── company-site/              # Supplier UI (Context API)
    ├── src/
    │   ├── api/               # Axios & services
    │   ├── context/           # Context providers
    │   ├── supplier/          # Supplier components
    │   └── main.jsx           # App entry
    ├── package.json
    └── .env
```

---

## **✅ Verification Checklist**

- [ ] Backend running on port 8000
- [ ] Can access `/docs` and see Swagger UI
- [ ] Buyer portal running on port 5173
- [ ] Company site running on port 5174
- [ ] All projects can connect to backend API
- [ ] No console errors in browser

---

## **🎯 Next Steps**

1. **Install all dependencies** in each project
2. **Configure database** in backend .env
3. **Run all three projects** simultaneously
4. **Test authentication flow**:
   - Register a supplier on company-site
   - Register a customer on buyer-portal
   - Test login on both portals
5. **Start development!**

---

## **💡 Tips**

- Use separate terminal windows for each project
- Backend must be running for frontends to work
- Clear browser cache if you see stale data
- Check browser console for any errors
- API documentation available at `http://localhost:8000/docs`

---

## **📞 Troubleshooting**

### Port already in use
```bash
# Kill process on port
# Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:8000 | xargs kill -9
```

### Module not found errors
```bash
# Reinstall dependencies
npm install  # or pip install -r requirements.txt
```

### CORS errors
- Check `CORS_ORIGINS` in backend .env
- Ensure frontend URLs match exactly

---

**🎉 You're all set! Happy coding!**
