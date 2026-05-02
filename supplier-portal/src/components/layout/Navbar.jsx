import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Search, Bell, ChevronDown, LogOut, User, AlertCircle, CheckCircle, ClipboardCheck, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useSupplier } from '../../context/SupplierContext';
import supplierService from '../../api/supplierService';

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
  const { apiProfile } = useSupplier();
  const navigate = useNavigate();
  const [dropOpen, setDropOpen] = useState(false);
  const [bellOpen, setBellOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const title = pageTitles[pathname] || 'Dashboard';

  const isApproved = !!apiProfile?.is_profile_approved;

  const fetchNotifications = useCallback(async () => {
    try {
      // Build notifications from review data + approval status
      const notifs = [];
      if (isApproved) {
        notifs.push({ id: 'approved', type: 'success', title: 'Profile Approved', desc: 'You can now upload products and manage orders.' });
      } else {
        try {
          const res = await supplierService.getMyReview();
          const review = res?.data;
          if (review) {
            const rejectedCount = [
              ...Object.values(review.sections || {}).filter((v) => v.verdict === 'rejected'),
              ...Object.values(review.documents || {}).filter((v) => v.verdict === 'rejected'),
            ].length;
            if (rejectedCount > 0) {
              notifs.push({ id: 'review', type: 'error', title: 'Admin Review Feedback', desc: `${rejectedCount} item${rejectedCount !== 1 ? 's' : ''} need attention. Check your dashboard for details.`, link: '/dashboard' });
            }
          }
        } catch { /* no review yet */ }
        if (apiProfile && !isApproved) {
          notifs.push({ id: 'pending', type: 'warning', title: 'Approval Pending', desc: 'Complete your profile to get approved by admin.' });
        }
      }
      setNotifications(notifs);
    } catch { /* ignore */ }
  }, [apiProfile, isApproved]);

  useEffect(() => { fetchNotifications(); }, [fetchNotifications]);

  const notifCount = notifications.filter((n) => n.type === 'error').length;

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
        {/* Notification Bell */}
        <div className="relative">
          <button onClick={() => { setBellOpen(!bellOpen); setDropOpen(false); }}
            className="relative p-2 text-muted hover:text-highlight cursor-pointer transition-colors">
            <Bell size={20} />
            {notifCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center bg-red-500 text-white text-[9px] font-bold rounded-full px-1">
                {notifCount}
              </span>
            )}
            {notifCount === 0 && notifications.length > 0 && <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />}
          </button>

          <AnimatePresence>
            {bellOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setBellOpen(false)} />
                <motion.div initial={{ opacity: 0, y: -8, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  className="absolute right-0 top-12 w-80 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 overflow-hidden">
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100 bg-gray-50">
                    <Bell size={14} className="text-violet-600" />
                    <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Notifications</h3>
                  </div>
                  <div className="max-h-72 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="py-8 text-center">
                        <CheckCircle size={24} className="mx-auto text-green-400 mb-2" />
                        <p className="text-xs text-gray-500 font-medium">No notifications</p>
                      </div>
                    ) : (
                      notifications.map((n) => (
                        <Link key={n.id} to={n.link || '/dashboard'} onClick={() => setBellOpen(false)}
                          className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${n.type === 'error' ? 'bg-red-100' : n.type === 'success' ? 'bg-green-100' : 'bg-amber-100'}`}>
                            {n.type === 'error' ? <XCircle size={14} className="text-red-500" /> : n.type === 'success' ? <CheckCircle size={14} className="text-green-500" /> : <AlertCircle size={14} className="text-amber-500" />}
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-gray-800">{n.title}</p>
                            <p className="text-[10px] text-gray-500 mt-0.5">{n.desc}</p>
                          </div>
                        </Link>
                      ))
                    )}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button onClick={() => { setDropOpen(!dropOpen); setBellOpen(false); }} className="flex items-center gap-2 cursor-pointer hover:bg-white/5 rounded-xl px-2 py-1.5 transition-colors">
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
