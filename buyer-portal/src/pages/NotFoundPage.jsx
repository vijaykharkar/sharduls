import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <p className="text-6xl font-bold text-gray-200 mb-2">404</p>
      <h1 className="text-xl font-bold text-gray-800 mb-2">Page Not Found</h1>
      <p className="text-sm text-gray-500 mb-6">The page you're looking for doesn't exist or has been moved.</p>
      <Link to="/" className="px-6 py-2.5 bg-[#0a1929] text-white rounded-xl text-sm font-semibold hover:bg-[#102a43] transition-colors">
        Go Home
      </Link>
    </div>
  );
}
