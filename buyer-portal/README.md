# Buyer Portal - B2B Marketplace

Buyer portal for SHARDUL-GE B2B marketplace built with React, Redux Toolkit, TailwindCSS, and Vite.

## Features

- ✅ User Authentication (Multiple login methods)
- ✅ Redux State Management
- ✅ Shopping Cart
- ✅ Bulk Enquiry System
- ✅ Modern UI with Custom TailwindCSS Theme
- ✅ Responsive Design
- ✅ Axios Integration with Auto Token Refresh

## Tech Stack

- **React 18** - UI Framework
- **Redux Toolkit** - State Management
- **Vite** - Build Tool
- **TailwindCSS** - Styling with Custom Theme
- **Axios** - HTTP Client
- **Lucide React** - Icons
- **React Router** - Routing

## Custom Theme

The buyer portal includes a comprehensive custom TailwindCSS theme with:
- **Custom Color Palette:** Primary, Secondary, Success, Warning, Danger
- **Typography:** Custom font sizes and line heights
- **Animations:** Fade in, Slide up, Slide down
- **Components:** Buttons, Cards, Inputs, Badges
- **Utilities:** Gradients, Scrollbar hide, Text balance

### Using Theme Colors

```jsx
// Primary color
<button className="bg-primary-600 hover:bg-primary-700 text-white">
  Click Me
</button>

// Success badge
<span className="badge badge-success">Active</span>

// Custom gradient
<div className="gradient-primary p-8 text-white">
  Hero Section
</div>
```

## Installation

```bash
# Install dependencies
npm install

# Or use legacy peer deps if needed
npm install --legacy-peer-deps

# Start development server
npm run dev
```

## Project Structure

```
src/
├── api/
│   ├── axiosInstance.js       # Axios configuration
│   └── authService.js         # Auth API methods
├── store/
│   ├── index.js               # Redux store
│   └── slices/
│       ├── authSlice.js       # Auth state
│       ├── cartSlice.js       # Cart state
│       └── productSlice.js    # Product state
├── components/
│   ├── layout/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   └── Layout.jsx
│   └── auth/
│       └── LoginModal.jsx
├── pages/
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Cart.jsx
│   ├── BulkEnquiry.jsx
│   └── BecomeSupplier.jsx
├── App.jsx
├── main.jsx
└── index.css                   # Global styles + Custom theme
```

## Available Routes

- `/` - Home page
- `/login` - Login/Register
- `/cart` - Shopping cart
- `/bulk-enquiry` - Bulk order enquiry form
- `/become-supplier` - Supplier registration info

## Custom Components

The theme includes pre-built component classes:

### Buttons
```jsx
<button className="btn btn-primary">Primary Button</button>
<button className="btn btn-secondary">Secondary Button</button>
<button className="btn btn-outline">Outline Button</button>
```

### Cards
```jsx
<div className="card">
  <div className="card-body">
    <h3>Card Title</h3>
    <p>Card content</p>
  </div>
</div>
```

### Inputs
```jsx
<input type="text" className="input" placeholder="Enter text" />
<input type="text" className="input input-error" placeholder="Error state" />
```

### Badges
```jsx
<span className="badge badge-primary">New</span>
<span className="badge badge-success">Active</span>
<span className="badge badge-warning">Pending</span>
<span className="badge badge-danger">Inactive</span>
```

## Using Redux Store

```jsx
import { useDispatch, useSelector } from 'react-redux';
import { loginEmailPassword } from './store/slices/authSlice';

function MyComponent() {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const handleLogin = async () => {
    await dispatch(loginEmailPassword({ email, password }));
  };

  return <div>{user?.full_name}</div>;
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

- `npm run dev` - Start development server (Port 5173)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Theme Customization

Edit `tailwind.config.js` to customize:
- Colors
- Typography
- Spacing
- Animations
- And more...

## License

MIT
