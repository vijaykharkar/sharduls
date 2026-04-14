import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Users, ShieldCheck, Settings, LogOut, X, Menu, ChevronRight,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import ConfirmModal from '../ui/ConfirmModal';

const navItems = [
  { to: '/admin',          icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/admin/suppliers', icon: Users,           label: 'Suppliers' },
  { to: '/admin/settings',  icon: Settings,        label: 'Settings' },
];

const SidebarContent = ({ onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);
  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 rounded-r-3xl overflow-hidden text-white">
      {/* Header */}
      <div className="p-5 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-violet-600 flex items-center justify-center">
            <ShieldCheck size={18} className="text-white" />
          </div>
          <div>
            <p className="font-bold text-sm tracking-wide text-white">NexaForge</p>
            <p className="text-violet-400 text-[8px] tracking-[0.3em] uppercase border border-violet-500/30 px-1.5 py-0.5 rounded mt-0.5 inline-block">Admin Panel</p>
          </div>
        </div>
        {onClose && <button onClick={onClose} className="lg:hidden text-gray-400 hover:text-white cursor-pointer"><X size={20} /></button>}
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? 'bg-violet-600/20 text-violet-300 border-l-2 border-violet-400'
                  : 'text-gray-400 hover:text-white hover:bg-white/5 hover:translate-x-1'
              }`
            }
          >
            <item.icon size={18} />
            <span className="flex-1">{item.label}</span>
            <ChevronRight size={14} className="opacity-0 group-hover:opacity-60 transition-opacity" />
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-full bg-violet-600/30 border-2 border-violet-500/40 flex items-center justify-center text-violet-300 font-bold text-sm flex-shrink-0">
            {user?.name?.[0] || user?.full_name?.[0] || 'A'}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white truncate">{user?.full_name || user?.name || 'Admin'}</p>
            <p className="text-[10px] text-gray-500">{user?.email || 'admin'}</p>
          </div>
          <span className="text-[8px] bg-violet-600/30 text-violet-300 font-bold px-1.5 py-0.5 rounded-full ml-auto uppercase">Admin</span>
        </div>
        <button onClick={() => setShowLogout(true)} className="w-full flex items-center gap-2 px-4 py-2 rounded-xl text-xs text-red-400 hover:bg-red-500/10 cursor-pointer transition-colors">
          <LogOut size={16} /> Logout
        </button>
      </div>

      <ConfirmModal isOpen={showLogout} onClose={() => setShowLogout(false)} onConfirm={handleLogout} title="Logout" message="Are you sure you want to logout?" confirmText="Logout" danger />
    </div>
  );
};

const AdminSidebar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <aside className="hidden lg:block w-[260px] h-screen sticky top-0 flex-shrink-0">
        <SidebarContent />
      </aside>

      <button onClick={() => setMobileOpen(true)} className="lg:hidden fixed bottom-4 left-4 z-40 w-12 h-12 bg-slate-800 text-violet-400 rounded-full shadow-lg flex items-center justify-center cursor-pointer">
        <Menu size={20} />
      </button>

      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
            <motion.aside initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="absolute left-0 top-0 bottom-0 w-[260px] shadow-2xl">
              <SidebarContent onClose={() => setMobileOpen(false)} />
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdminSidebar;
