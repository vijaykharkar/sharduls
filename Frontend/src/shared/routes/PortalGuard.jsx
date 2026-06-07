import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@shared/context/AuthContext';

/**
 * PortalGuard — prevents authenticated users whose role is NOT in allowedRoles
 * from entering a portal, while still permitting unauthenticated guests.
 *
 * Use this on layout-level routes to enforce portal isolation.
 *
 * Behaviour matrix:
 *  - Unauthenticated           → allow through (guest browsing)
 *  - Authenticated + correct role → allow through
 *  - Authenticated + wrong role   → redirect to /unauthorized
 *
 * Example (App.jsx):
 *   <Route path="/buyer" element={<PortalGuard allowedRoles={['buyer']}><BuyerLayout /></PortalGuard>}>
 */
export default function PortalGuard({ allowedRoles = [], children }) {
  const { isAuthenticated, role, loading } = useAuth();

  if (loading) return null;

  if (isAuthenticated && role && !allowedRoles.includes(role.toLowerCase())) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
