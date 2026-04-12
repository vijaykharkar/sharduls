import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSupplier } from '../context/SupplierContext';

const ProfileGuard = ({ children }) => {
  const { apiProfile, profileLoading } = useSupplier();

  if (profileLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-10 h-10 border-3 border-violet-300 border-t-violet-600 rounded-full animate-spin" />
      </div>
    );
  }

  const approved = apiProfile?.is_profile_approved;

  if (!approved) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center max-w-md mx-auto p-8 bg-white rounded-2xl border border-gray-200 shadow-sm">
          <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-amber-50 flex items-center justify-center">
            <span className="text-4xl">🔒</span>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Profile Approval Pending</h2>
          <p className="text-sm text-gray-500 mb-4">
            Your profile must be 100% complete and approved by an admin before you can access this section.
          </p>
          <p className="text-xs text-gray-400 mb-6">
            Profile completion: <span className="font-bold text-violet-600">{apiProfile?.profile_completion ?? 0}%</span>
          </p>
          <a href="/profile" className="inline-block px-6 py-2.5 bg-violet-600 text-white font-semibold rounded-xl hover:bg-violet-700 transition-colors">
            Complete Profile
          </a>
        </div>
      </div>
    );
  }

  return children;
};

export default ProfileGuard;
