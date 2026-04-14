import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Bell, ChevronDown, LogOut, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const pageTitles = {
  '/admin': 'Dashboard',
  '/admin/suppliers': 'Suppliers',
  '/admin/settings': 'Settings',
};

const AdminNavbar = () => {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropOpen, setDropOpen] = useState(false);

  const title = Object.entries(pageTitles).find(([k]) => pathname.startsWith(k) && (k !== '/admin' || pathname === '/admin'))?.[1]
    || (pathname.startsWith('/admin/suppliers/') ? 'Supplier Detail' : 'Admin');

  return (
    <header className="h-16 flex items-center justify-between px-6 gap-4 sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-gray-100">
      <h1 className="text-lg font-bold text-gray-800 hidden sm:block">{title}</h1>

      <div className="flex items-center gap-3 ml-auto">
        <button className="relative p-2 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-violet-500 rounded-full" />
        </button>

        <div className="relative">
          <button onClick={() => setDropOpen(!dropOpen)} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 rounded-xl px-2 py-1.5 transition-colors">
            <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center text-violet-600 font-bold text-xs">
              {user?.name?.[0] || user?.full_name?.[0] || 'A'}
            </div>
            <span className="hidden sm:block text-sm font-medium text-gray-700">{(user?.full_name || user?.name || 'Admin').split(' ')[0]}</span>
            <ChevronDown size={14} className="text-gray-400" />
          </button>
          {dropOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setDropOpen(false)} />
              <div className="absolute right-0 top-12 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-50 py-1">
                <button onClick={() => { setDropOpen(false); navigate('/admin/settings'); }} className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer">
                  <User size={16} /> Settings
                </button>
                <button onClick={() => { setDropOpen(false); logout(); navigate('/login'); }} className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors cursor-pointer">
                  <LogOut size={16} /> Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
