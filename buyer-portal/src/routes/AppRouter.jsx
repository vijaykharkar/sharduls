import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import ProtectedRoute from './ProtectedRoute';
import Sidebar from '../components/common/Sidebar';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import DashboardPage from '../pages/buyer/DashboardPage';
import ShopPage from '../pages/buyer/ShopPage';
import ProductDetailPage from '../pages/buyer/ProductDetailPage';
import CartPage from '../pages/buyer/CartPage';
import CheckoutPage from '../pages/buyer/CheckoutPage';
import OrdersPage from '../pages/buyer/OrdersPage';
import OrderDetailPage from '../pages/buyer/OrderDetailPage';
import WishlistPage from '../pages/buyer/WishlistPage';
import CustomArtPage from '../pages/buyer/CustomArtPage';
import ProfilePage from '../pages/buyer/ProfilePage';
import NotFoundPage from '../pages/NotFoundPage';

const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -8 }}
    transition={{ duration: 0.25 }}
  >
    {children}
  </motion.div>
);

const BuyerLayout = ({ children }) => (
  <div className="flex min-h-screen">
    <Sidebar />
    <div className="flex-1 flex flex-col min-h-screen lg:ml-0">
      <Navbar />
      <main className="flex-1 p-4 sm:p-6 pb-20 lg:pb-6">
        {children}
      </main>
      <Footer />
    </div>
  </div>
);

const AppRouter = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public */}
        <Route path="/login" element={<PageTransition><LoginPage /></PageTransition>} />
        <Route path="/register" element={<PageTransition><RegisterPage /></PageTransition>} />

        {/* Protected buyer routes */}
        <Route path="/dashboard" element={<ProtectedRoute><BuyerLayout><PageTransition><DashboardPage /></PageTransition></BuyerLayout></ProtectedRoute>} />
        <Route path="/shop" element={<ProtectedRoute><BuyerLayout><PageTransition><ShopPage /></PageTransition></BuyerLayout></ProtectedRoute>} />
        <Route path="/shop/:id" element={<ProtectedRoute><BuyerLayout><PageTransition><ProductDetailPage /></PageTransition></BuyerLayout></ProtectedRoute>} />
        <Route path="/cart" element={<ProtectedRoute><BuyerLayout><PageTransition><CartPage /></PageTransition></BuyerLayout></ProtectedRoute>} />
        <Route path="/checkout" element={<ProtectedRoute><BuyerLayout><PageTransition><CheckoutPage /></PageTransition></BuyerLayout></ProtectedRoute>} />
        <Route path="/orders" element={<ProtectedRoute><BuyerLayout><PageTransition><OrdersPage /></PageTransition></BuyerLayout></ProtectedRoute>} />
        <Route path="/orders/:id" element={<ProtectedRoute><BuyerLayout><PageTransition><OrderDetailPage /></PageTransition></BuyerLayout></ProtectedRoute>} />
        <Route path="/wishlist" element={<ProtectedRoute><BuyerLayout><PageTransition><WishlistPage /></PageTransition></BuyerLayout></ProtectedRoute>} />
        <Route path="/custom-art" element={<ProtectedRoute><BuyerLayout><PageTransition><CustomArtPage /></PageTransition></BuyerLayout></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><BuyerLayout><PageTransition><ProfilePage /></PageTransition></BuyerLayout></ProtectedRoute>} />

        {/* Redirects */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<PageTransition><NotFoundPage /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

export default AppRouter;
