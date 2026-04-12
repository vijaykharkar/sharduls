import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search, Bell, ChevronDown, LogOut, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const pageTitles = {
  '/dashboard': 'Dashboard',
  '/profile': 'My Profile',
  '/orders': 'Orders',
  '/products': 'Products',
  '/payments': 'Payments',
  '/support': 'Support',
};

const Navbar = () => {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropOpen, setDropOpen] = useState(false);
  const title = pageTitles[pathname] || 'Dashboard';

  return (
    <header className="h-16 flex items-center justify-between px-6 gap-4 sticky top-0 z-30">
      <h1 className="text-lg font-bold text-highlight hidden sm:block">{title}</h1>

      <div className="flex-1 max-w-md ml-auto lg:ml-0">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input type="text" placeholder="Search orders, products…" className="w-full pl-10 pr-4 py-2 rounded-xl text-sm text-highlight border border-border focus:ring-1 focus:ring-primary outline-none placeholder-muted transition-all" />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="relative p-2 text-muted hover:text-highlight cursor-pointer transition-colors">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
        </button>

        <div className="relative">
          <button onClick={() => setDropOpen(!dropOpen)} className="flex items-center gap-2 cursor-pointer hover:bg-white/5 rounded-xl px-2 py-1.5 transition-colors">
            <div className="w-8 h-8 rounded-full border-2 border-primary/40 flex items-center justify-center text-primary font-bold text-xs">{user?.name?.[0] || 'S'}</div>
            <span className="hidden sm:block text-sm font-medium text-highlight">{user?.name?.split(' ')[0]}</span>
            <ChevronDown size={14} className="text-muted" />
          </button>

          {dropOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setDropOpen(false)} />
              <div className="absolute right-0 top-12 w-48 bg-surface border border-border rounded-xl shadow-strong z-50 py-1 animate-slideDown">
                <button onClick={() => { setDropOpen(false); navigate('/profile'); }} className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-highlight hover:bg-white/5 transition-colors cursor-pointer">
                  <User size={16} /> Profile
                </button>
                <button onClick={() => { setDropOpen(false); logout(); navigate('/login'); }} className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer">
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

export default Navbar;
