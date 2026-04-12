import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import ProtectedRoute from './ProtectedRoute';
import ProfileGuard from './ProfileGuard';
import Sidebar from '../components/layout/Sidebar';
import Navbar from '../components/layout/Navbar';

import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import DashboardPage from '../pages/DashboardPage';
import ProfilePage from '../pages/ProfilePage';
import OrdersPage from '../pages/OrdersPage';
import ProductsPage from '../pages/ProductsPage';
import PaymentsPage from '../pages/PaymentsPage';
import SupportPage from '../pages/SupportPage';
import NotFoundPage from '../pages/NotFoundPage';

const PageWrap = ({ children }) => (
  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
    {children}
  </motion.div>
);

const SupplierLayout = ({ children }) => (
  <div className="flex min-h-screen">

    {/* Sidebar */}
    <aside className="w-64 min-h-screen">
      <Sidebar />
    </aside>

    {/* Main */}
    <div className="flex-1 bg-white rounded-3xl">

      {/* 🔥 Main Rounded Container */}
      <div className="flex flex-col overflow-hidden">

        {/* Navbar */}
        <Navbar />

        {/* Content */}
        <main className="flex-1 p-6">
          {children}
        </main>

      </div>

    </div>
  </div>
);

const AdminLayout = ({ children }) => (
  <div className="flex min-h-screen">
    <Sidebar />
    <div className="flex-1 flex flex-col min-h-screen">
      <Navbar />
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

        {/* Admin placeholder */}
        <Route path="/admin/*" element={
          <ProtectedRoute allowedRole="admin">
            <AdminLayout>
              <PageWrap>
                <div className="flex items-center justify-center min-h-[60vh]">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-2xl chrome-gradient flex items-center justify-center"><span className="text-background text-2xl">🛡️</span></div>
                    <h2 className="text-xl font-bold text-highlight mb-2">Admin Panel</h2>
                    <p className="text-muted text-sm">Admin features coming soon.</p>
                  </div>
                </div>
              </PageWrap>
            </AdminLayout>
          </ProtectedRoute>
        } />

        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<PageWrap><NotFoundPage /></PageWrap>} />
      </Routes>
    </AnimatePresence>
  );
};

export default AppRouter;
