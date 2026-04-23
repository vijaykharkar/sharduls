import React from 'react';
import useAuth from '../../hooks/useAuth';
import { Loader2 } from 'lucide-react';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, authLoading, openAuthModal } = useAuth();

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 size={32} className="animate-spin text-[#d4a853]" />
      </div>
    );
  }

  if (!isAuthenticated) {
    /* trigger modal and show a prompt */
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="w-20 h-20 bg-[#d4a853]/10 rounded-full flex items-center justify-center mb-4">
          <Loader2 size={32} className="text-[#d4a853]" />
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Login Required</h2>
        <p className="text-sm text-gray-500 mb-4">Please login to access this page</p>
        <button onClick={() => openAuthModal('login')}
          className="px-6 py-2.5 bg-[#0a1929] text-white rounded-xl text-sm font-semibold hover:bg-[#102a43] transition-colors cursor-pointer">
          Login
        </button>
      </div>
    );
  }

  return children;
}
