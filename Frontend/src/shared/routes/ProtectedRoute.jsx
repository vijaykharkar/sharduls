import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@shared/context/AuthContext';
import { Loader2 } from 'lucide-react';

/**
 * ProtectedRoute — enforces authentication AND role-based access.
 *
 * Behaviour:
 *   - Not authenticated          → redirect to /login (with state.from for redirect-back)
 *   - Authenticated, role OK     → render children
 *   - Authenticated, wrong role  → redirect to /unauthorized (NEVER to role home)
 *
 * allowedRoles should always be explicit:
 *   <ProtectedRoute allowedRoles={['buyer']}>   ← buyer-only page
 *   <ProtectedRoute allowedRoles={['supplier']}> ← supplier-only layout
 */
function ProtectedRoute({ children, allowedRoles }) {
  const { isAuthenticated, loading, role } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 size={28} className="animate-spin text-[#d4a853]" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && allowedRoles.length > 0) {
    if (!allowedRoles.includes((role || '').toLowerCase())) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return children;
}

export default ProtectedRoute;
