import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, UserCircle, ShoppingBag, Package, CreditCard, Headphones, LogOut, X, Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useSupplier } from '../../context/SupplierContext';
import ConfirmModal from '../ui/ConfirmModal';

const GearIcon = ({ className = '' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
    <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
  </svg>
);

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/profile', icon: UserCircle, label: 'My Profile', showBadge: true },
  { to: '/orders', icon: ShoppingBag, label: 'Orders' },
  { to: '/products', icon: Package, label: 'Products' },
  { to: '/payments', icon: CreditCard, label: 'Payments' },
  { to: '/support', icon: Headphones, label: 'Support' },
];

const SidebarContent = ({ onClose }) => {
  const { user, logout } = useAuth();
  const { completionPercentage } = useSupplier();
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <div className="h-full flex flex-col sidebar-gradient rounded-r-3xl overflow-hidden text-white">
      <div className="p-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <GearIcon className="w-8 h-8 text-primary animate-gearSpin" />
          </div>
          <div>
            <p className="font-bold text-sm tracking-wide text-highlight">NexaForge</p>
            <p className="text-primary text-[8px] tracking-[0.3em] uppercase border border-primary/30 px-1.5 py-0.5 rounded mt-0.5 inline-block">Supplier Portal</p>
          </div>
        </div>
        {onClose && <button onClick={onClose} className="lg:hidden text-muted hover:text-highlight cursor-pointer"><X size={20} /></button>}
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${isActive ? 'bg-accent/10 text-accent border-l-2 border-accent' : 'text-muted hover:text-primary hover:bg-white/5 hover:translate-x-1'
              }`
            }
          >
            <item.icon size={18} />
            <span className="flex-1">{item.label}</span>
            {item.showBadge && completionPercentage < 100 && (
              <span className="text-[9px] bg-accent text-white px-1.5 py-0.5 rounded-full font-bold">{completionPercentage}%</span>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-full border-2 border-primary/40 flex items-center justify-center text-primary font-bold text-sm flex-shrink-0">
            {user?.name?.[0] || 'S'}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-highlight truncate">{user?.name || 'Supplier'}</p>
            <p className="text-[10px] text-muted">{user?.id || 'SUP-000001'}</p>
          </div>
          <span className="text-[8px] bg-accent/20 text-accent font-bold px-1.5 py-0.5 rounded-full ml-auto">Supplier</span>
        </div>
        <button onClick={() => setShowLogout(true)} className="w-full flex items-center gap-2 px-4 py-2 rounded-xl text-xs text-red-400 hover:bg-red-500/10 cursor-pointer transition-colors">
          <LogOut size={16} /> Logout
        </button>
      </div>

      <ConfirmModal isOpen={showLogout} onClose={() => setShowLogout(false)} onConfirm={handleLogout} title="Logout" message="Are you sure you want to logout?" confirmText="Logout" danger />
    </div>
  );
};

const Sidebar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <aside className="hidden lg:block w-[260px] h-screen sticky top-0 flex-shrink-0">
        <SidebarContent />
      </aside>

      <button onClick={() => setMobileOpen(true)} className="lg:hidden fixed bottom-4 left-4 z-40 w-12 h-12 bg-sidebar text-primary rounded-full shadow-strong flex items-center justify-center cursor-pointer">
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

      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-surface border-t border-border flex items-center justify-around py-2 px-1">
        {navItems.slice(0, 5).map((item) => (
          <NavLink key={item.to} to={item.to} className={({ isActive }) => `flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg text-[10px] font-medium transition-colors ${isActive ? 'text-accent' : 'text-muted'}`}>
            <item.icon size={20} />
            {item.label.split(' ').pop()}
          </NavLink>
        ))}
      </nav>
    </>
  );
};

export default Sidebar;
