import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import ProtectedRoute from './ProtectedRoute';
import ProfileGuard from './ProfileGuard';
import Sidebar from '../components/layout/Sidebar';
import Navbar from '../components/layout/Navbar';
import AdminSidebar from '../components/layout/AdminSidebar';
import AdminNavbar from '../components/layout/AdminNavbar';

import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import DashboardPage from '../pages/DashboardPage';
import ProfilePage from '../pages/ProfilePage';
import OrdersPage from '../pages/OrdersPage';
import ProductsPage from '../pages/ProductsPage';
import PaymentsPage from '../pages/PaymentsPage';
import SupportPage from '../pages/SupportPage';
import NotFoundPage from '../pages/NotFoundPage';

import AdminDashboardPage from '../pages/admin/AdminDashboardPage';
import AdminSuppliersPage from '../pages/admin/AdminSuppliersPage';
import AdminSupplierDetailPage from '../pages/admin/AdminSupplierDetailPage';
import AdminSettingsPage from '../pages/admin/AdminSettingsPage';

const PageWrap = ({ children }) => (
  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
    {children}
  </motion.div>
);

const SupplierLayout = ({ children }) => (
  <div className="flex min-h-screen">
    <aside className="w-64 min-h-screen">
      <Sidebar />
    </aside>
    <div className="flex-1 bg-white rounded-3xl">
      <div className="flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  </div>
);

const AdminLayout = ({ children }) => (
  <div className="flex min-h-screen bg-gray-50">
    <aside className="w-64 min-h-screen">
      <AdminSidebar />
    </aside>
    <div className="flex-1 flex flex-col min-h-screen">
      <AdminNavbar />
      <main className="flex-1 p-4 sm:p-6 pb-20 lg:pb-6">{children}</main>
    </div>
  </div>
);

const AppRouter = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/login" element={<PageWrap><LoginPage /></PageWrap>} />
        <Route path="/register" element={<PageWrap><RegisterPage /></PageWrap>} />

        {/* Supplier routes */}
        <Route path="/dashboard" element={<ProtectedRoute allowedRole="supplier"><SupplierLayout><PageWrap><DashboardPage /></PageWrap></SupplierLayout></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute allowedRole="supplier"><SupplierLayout><PageWrap><ProfilePage /></PageWrap></SupplierLayout></ProtectedRoute>} />
        <Route path="/orders" element={<ProtectedRoute allowedRole="supplier"><SupplierLayout><ProfileGuard><PageWrap><OrdersPage /></PageWrap></ProfileGuard></SupplierLayout></ProtectedRoute>} />
        <Route path="/products" element={<ProtectedRoute allowedRole="supplier"><SupplierLayout><ProfileGuard><PageWrap><ProductsPage /></PageWrap></ProfileGuard></SupplierLayout></ProtectedRoute>} />
        <Route path="/payments" element={<ProtectedRoute allowedRole="supplier"><SupplierLayout><ProfileGuard><PageWrap><PaymentsPage /></PageWrap></ProfileGuard></SupplierLayout></ProtectedRoute>} />
        <Route path="/support" element={<ProtectedRoute allowedRole="supplier"><SupplierLayout><PageWrap><SupportPage /></PageWrap></SupplierLayout></ProtectedRoute>} />

        {/* Admin routes */}
        <Route path="/admin" element={<ProtectedRoute allowedRole={['admin', 'superadmin']}><AdminLayout><PageWrap><AdminDashboardPage /></PageWrap></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/suppliers" element={<ProtectedRoute allowedRole={['admin', 'superadmin']}><AdminLayout><PageWrap><AdminSuppliersPage /></PageWrap></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/suppliers/:id" element={<ProtectedRoute allowedRole={['admin', 'superadmin']}><AdminLayout><PageWrap><AdminSupplierDetailPage /></PageWrap></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/settings" element={<ProtectedRoute allowedRole={['admin', 'superadmin']}><AdminLayout><PageWrap><AdminSettingsPage /></PageWrap></AdminLayout></ProtectedRoute>} />

        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<PageWrap><NotFoundPage /></PageWrap>} />
      </Routes>
    </AnimatePresence>
  );
};

export default AppRouter;
