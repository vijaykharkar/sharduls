import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import SupplierDashboard from './SupplierDashboard';
import BuyerDashboard from './BuyerDashboard';

const Dashboard = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem('supplier_role') || 'admin';
  const user = localStorage.getItem('supplier_user');

  if (!user) {
    navigate('/login');
    return null;
  }

  switch (role) {
    case 'supplier':
      return <SupplierDashboard />;
    case 'buyer':
      return <BuyerDashboard />;
    case 'admin':
    default:
      return <AdminDashboard />;
  }
};

export default Dashboard;
