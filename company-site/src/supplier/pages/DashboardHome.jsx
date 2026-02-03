import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context';
import {
  TrendingUp,
  Package,
  ShoppingCart,
  DollarSign,
  ArrowRight,
  CheckCircle,
  Clock,
} from 'lucide-react';

const DashboardHome = () => {
  const { user } = useAuth();

  const stats = [
    { label: 'Total Products', value: '0', icon: Package, color: 'blue' },
    { label: 'Active Orders', value: '0', icon: ShoppingCart, color: 'green' },
    { label: 'Revenue', value: '₹0', icon: DollarSign, color: 'purple' },
    { label: 'Growth', value: '0%', icon: TrendingUp, color: 'orange' },
  ];

  const profileCompletion = 35; // Example completion percentage

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {user?.full_name}! 👋
        </h1>
        <p className="text-blue-100">
          Here's what's happening with your business today
        </p>
      </div>

      {/* Profile Completion Alert */}
      {profileCompletion < 100 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="h-5 w-5 text-yellow-600" />
                <h3 className="font-semibold text-gray-800">
                  Complete Your Profile
                </h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Complete your profile to start receiving orders and selling products
              </p>
              <div className="mb-2">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-semibold text-gray-800">{profileCompletion}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-500 h-2 rounded-full transition-all"
                    style={{ width: `${profileCompletion}%` }}
                  ></div>
                </div>
              </div>
            </div>
            <Link
              to="/supplier/profile"
              className="ml-4 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition flex items-center space-x-2"
            >
              <span>Complete Now</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div
                className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}
              >
                <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
              </div>
              <span className="text-green-600 text-sm font-medium">+0%</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</h3>
            <p className="text-gray-600 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link
              to="/supplier/catalog"
              className="flex items-center justify-between p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition"
            >
              <div className="flex items-center space-x-3">
                <Package className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-gray-800">Upload Catalog</span>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400" />
            </Link>
            <Link
              to="/supplier/profile"
              className="flex items-center justify-between p-4 bg-green-50 rounded-lg hover:bg-green-100 transition"
            >
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-medium text-gray-800">Complete Profile</span>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400" />
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
          <div className="text-center py-8">
            <p className="text-gray-500">No recent activity</p>
            <p className="text-sm text-gray-400 mt-2">
              Your recent orders and updates will appear here
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
