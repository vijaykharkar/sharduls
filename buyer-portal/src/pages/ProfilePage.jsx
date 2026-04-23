import React from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Phone, Package, Heart, MapPin, LogOut } from 'lucide-react';
import useAuth from '../hooks/useAuth';
import useCart from '../hooks/useCart';
import useWishlist from '../hooks/useWishlist';
import useAddress from '../hooks/useAddress';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { addresses } = useAddress();

  const quickLinks = [
    { to: '/orders', icon: Package, label: 'My Orders', desc: 'Track, return, cancel orders' },
    { to: '/wishlist', icon: Heart, label: 'Wishlist', desc: `${wishlistCount} saved item${wishlistCount !== 1 ? 's' : ''}` },
    { to: '/cart', icon: Package, label: 'Cart', desc: `${cartCount} item${cartCount !== 1 ? 's' : ''} in cart` },
    { to: '/checkout', icon: MapPin, label: 'Addresses', desc: `${addresses.length} saved address${addresses.length !== 1 ? 'es' : ''}` },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      {/* Profile Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6 flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-[#d4a853]/10 flex items-center justify-center flex-shrink-0">
          <User size={28} className="text-[#d4a853]" />
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-lg font-bold text-gray-800">{user?.full_name || user?.name || 'User'}</h1>
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mt-1">
            {user?.email && <span className="flex items-center gap-1 text-xs text-gray-500"><Mail size={12} /> {user.email}</span>}
            {user?.phone && <span className="flex items-center gap-1 text-xs text-gray-500"><Phone size={12} /> {user.phone}</span>}
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {quickLinks.map((l) => (
          <Link key={l.to} to={l.to} className="flex items-center gap-3 bg-white rounded-2xl border border-gray-100 shadow-card p-4 hover:shadow-soft hover:-translate-y-0.5 transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#d4a853]/10 flex items-center justify-center flex-shrink-0">
              <l.icon size={18} className="text-[#d4a853]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">{l.label}</p>
              <p className="text-[10px] text-gray-400">{l.desc}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Logout */}
      <button onClick={logout}
        className="w-full flex items-center justify-center gap-2 py-3 bg-white border border-red-200 rounded-2xl text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors cursor-pointer">
        <LogOut size={16} /> Logout
      </button>
    </div>
  );
}
