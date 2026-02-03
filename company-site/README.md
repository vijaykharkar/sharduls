# Company Site - Supplier Portal

Supplier portal for SHARDUL-GE B2B marketplace built with React, Vite, TailwindCSS, and Context API.

## Features

- ✅ Supplier Authentication (Sign In/Sign Up)
- ✅ Dashboard with Statistics
- ✅ Profile Management
- ✅ Document Upload
- ✅ Catalog Upload
- ✅ Support Center
- ✅ Context API for State Management
- ✅ Axios Integration with Auto Token Refresh

## Tech Stack

- **React 18** - UI Framework
- **Vite** - Build Tool
- **TailwindCSS** - Styling
- **Context API** - State Management
- **Axios** - HTTP Client
- **Lucide React** - Icons
- **React Router** - Routing

## Installation

```bash
# Install dependencies
npm install

# Create .env file
echo "VITE_API_BASE_URL=http://localhost:8000" > .env

# Start development server
npm run dev
```

## Project Structure

```
src/
├── api/
│   ├── axiosInstance.js       # Axios configuration
│   └── authService.js         # Auth API methods
├── context/
│   ├── AuthContext.jsx        # Auth Context Provider
│   └── index.js               # Context exports
├── supplier/
│   ├── components/
│   │   ├── DashboardLayout.jsx
│   │   ├── SignUpStep1.jsx
│   │   ├── SignUpStep2.jsx
│   │   └── profile/
│   │       └── DocumentsStep.jsx
│   └── pages/
│       ├── SignInPage.jsx
│       ├── SignUpPage.jsx
│       ├── DashboardHome.jsx
│       ├── ProfilePage.jsx
│       ├── CatalogUploadPage.jsx
│       └── SupportPage.jsx
├── App.jsx                     # Main App component
├── main.jsx                    # Entry point
└── index.css                   # Global styles
```

## Available Routes

- `/supplier/signin` - Supplier sign in
- `/supplier/signup` - Supplier registration
- `/supplier/dashboard` - Dashboard home
- `/supplier/profile` - Profile management
- `/supplier/catalog` - Catalog upload
- `/supplier/support` - Support center

## Usage

### Using Auth Context

```jsx
import { useAuth } from './context';

function MyComponent() {
  const { user, login, logout, loading, error } = useAuth();

  const handleLogin = async () => {
    await login({ email, password });
  };

  return (
    <div>
      {isAuthenticated ? (
        <p>Welcome, {user.full_name}</p>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
}
```

## Environment Variables

```env
VITE_API_BASE_URL=http://localhost:8000
```

## Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## License

MIT
