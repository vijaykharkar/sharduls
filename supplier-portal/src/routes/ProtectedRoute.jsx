import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRole }) => {
  const { isAuthenticated, loading, role } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center bg-cream"><div className="w-10 h-10 border-3 border-gold/30 border-t-gold rounded-full animate-spin" /></div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (allowedRole && role !== allowedRole) return <Navigate to="/dashboard" replace />;
  return children;
};

export default ProtectedRoute;
