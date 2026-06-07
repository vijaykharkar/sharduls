import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldX } from 'lucide-react';
import { useAuth } from '@shared/context/AuthContext';
import { getRoleHome } from '@shared/utils/roleUtils';

/**
 * UnauthorizedPage — shown when an authenticated user attempts to access
 * a portal they are not permitted to enter.
 *
 * Route: /unauthorized
 */
export default function UnauthorizedPage() {
  const navigate = useNavigate();
  const { isAuthenticated, role } = useAuth();

  const handleGoHome = () => {
    if (isAuthenticated && role) {
      navigate(getRoleHome(role), { replace: true });
    } else {
      navigate('/login', { replace: true });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-lg p-10 text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-red-50 flex items-center justify-center">
          <ShieldX size={40} className="text-red-500" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
        <p className="text-sm text-gray-500 mb-1">
          You don't have permission to access this page.
        </p>
        {isAuthenticated && role && (
          <p className="text-xs text-gray-400 mb-8">
            Your account role ({role}) is not authorised for this portal.
          </p>
        )}
        <button
          onClick={handleGoHome}
          className="px-8 py-3 bg-[#0a1929] text-white rounded-xl text-sm font-bold hover:bg-[#102a43] transition-colors cursor-pointer"
        >
          {isAuthenticated ? 'Go to My Portal' : 'Go to Login'}
        </button>
      </div>
    </div>
  );
}
