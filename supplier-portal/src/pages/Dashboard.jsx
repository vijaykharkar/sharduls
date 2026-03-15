import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, ShoppingCart, TrendingUp, Clock, LogOut, User, Bell } from 'lucide-react';
import supplierService from '../api/supplierService';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('supplier_user');
    if (!storedUser) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(storedUser));
  }, [navigate]);

  const handleLogout = () => {
    supplierService.logout();
    navigate('/login');
  };

  const stats = [
    { label: 'Total Products', value: '0', icon: <Package size={24} />, color: 'blue' },
    { label: 'Active Orders', value: '0', icon: <ShoppingCart size={24} />, color: 'green' },
    { label: 'Revenue', value: '₹0', icon: <TrendingUp size={24} />, color: 'purple' },
    { label: 'Pending', value: '0', icon: <Clock size={24} />, color: 'orange' },
  ];

  const colorMap = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    orange: 'bg-orange-50 text-orange-600',
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <div>
                <p className="font-bold text-gray-800">SHARDUL-GE</p>
                <p className="text-xs text-gray-500">Supplier Portal</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-500 hover:text-gray-700">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <User size={16} className="text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-700 hidden sm:block">
                  {user.full_name}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-6 md:p-8 text-white mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            Welcome, {user.full_name}!
          </h1>
          <p className="text-blue-100">
            Your supplier account is under review. You'll be notified once approved.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
            <Clock size={14} />
            Account Status: <span className="font-semibold">Pending Approval</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${colorMap[stat.color]}`}>
                {stat.icon}
              </div>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50/50 transition text-left">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Package size={18} className="text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm">Add Product</p>
                <p className="text-xs text-gray-500">List a new product</p>
              </div>
            </button>
            <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl hover:border-green-300 hover:bg-green-50/50 transition text-left">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <ShoppingCart size={18} className="text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm">View Orders</p>
                <p className="text-xs text-gray-500">Manage your orders</p>
              </div>
            </button>
            <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50/50 transition text-left">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <User size={18} className="text-purple-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm">Edit Profile</p>
                <p className="text-xs text-gray-500">Update business info</p>
              </div>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
