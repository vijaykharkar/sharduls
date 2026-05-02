import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Bell, ChevronDown, LogOut, User, Clock, CheckCircle, Eye, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import adminService from '../../api/adminService';

const pageTitles = {
  '/admin': 'Dashboard',
  '/admin/suppliers': 'Suppliers',
  '/admin/products': 'Products',
  '/admin/orders': 'Orders',
  '/admin/payments': 'Payments',
  '/admin/settings': 'Settings',
};

const AdminNavbar = () => {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropOpen, setDropOpen] = useState(false);
  const [bellOpen, setBellOpen] = useState(false);
  const [pendingSuppliers, setPendingSuppliers] = useState([]);
  const [notifLoading, setNotifLoading] = useState(false);

  const title = Object.entries(pageTitles).find(([k]) => pathname.startsWith(k) && (k !== '/admin' || pathname === '/admin'))?.[1]
    || (pathname.startsWith('/admin/suppliers/') ? 'Supplier Detail'
      : pathname.startsWith('/admin/products/') ? 'Product Detail' : 'Admin');

  const fetchPending = useCallback(async () => {
    setNotifLoading(true);
    try {
      const res = await adminService.listSuppliers({ status: 'pending' });
      setPendingSuppliers((res.data?.items || []).slice(0, 10));
    } catch { /* ignore */ }
    finally { setNotifLoading(false); }
  }, []);

  useEffect(() => { fetchPending(); }, [fetchPending]);

  const pendingCount = pendingSuppliers.length;

  return (
    <header className="h-16 flex items-center justify-between px-6 gap-4 sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-gray-100">
      <h1 className="text-lg font-bold text-gray-800 hidden sm:block">{title}</h1>

      <div className="flex items-center gap-3 ml-auto">
        {/* Notification Bell */}
        <div className="relative">
          <button onClick={() => { setBellOpen(!bellOpen); setDropOpen(false); if (!bellOpen) fetchPending(); }}
            className="relative p-2 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors">
            <Bell size={20} />
            {pendingCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center bg-red-500 text-white text-[9px] font-bold rounded-full px-1">
                {pendingCount}
              </span>
            )}
          </button>

          <AnimatePresence>
            {bellOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setBellOpen(false)} />
                <motion.div initial={{ opacity: 0, y: -8, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  className="absolute right-0 top-12 w-80 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50">
                    <div className="flex items-center gap-2">
                      <Bell size={14} className="text-violet-600" />
                      <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Notifications</h3>
                    </div>
                    {pendingCount > 0 && <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">{pendingCount} pending</span>}
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifLoading ? (
                      <div className="py-8 text-center"><div className="w-5 h-5 border-2 border-violet-300 border-t-violet-600 rounded-full animate-spin mx-auto" /></div>
                    ) : pendingCount === 0 ? (
                      <div className="py-8 text-center">
                        <CheckCircle size={24} className="mx-auto text-green-400 mb-2" />
                        <p className="text-xs text-gray-500 font-medium">All caught up!</p>
                        <p className="text-[10px] text-gray-400">No pending supplier reviews</p>
                      </div>
                    ) : (
                      pendingSuppliers.map((s) => (
                        <Link key={s.id} to={`/admin/suppliers/${s.id}`} onClick={() => setBellOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-violet-50 transition-colors border-b border-gray-50 last:border-0">
                          <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 font-bold text-xs flex-shrink-0">
                            {s.full_name?.[0] || '?'}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-gray-800 truncate">{s.full_name}</p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="flex items-center gap-1 text-[10px] text-amber-600 font-semibold"><Clock size={9} /> Awaiting Review</span>
                              <span className="text-[10px] text-gray-400">{s.profile_completion || 0}% complete</span>
                            </div>
                          </div>
                          <Eye size={14} className="text-gray-400 flex-shrink-0" />
                        </Link>
                      ))
                    )}
                  </div>
                  {pendingCount > 0 && (
                    <Link to="/admin/suppliers?status=pending" onClick={() => setBellOpen(false)}
                      className="flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-violet-600 hover:bg-violet-50 border-t border-gray-100 transition-colors">
                      <Users size={13} /> View All Pending Suppliers
                    </Link>
                  )}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button onClick={() => { setDropOpen(!dropOpen); setBellOpen(false); }} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 rounded-xl px-2 py-1.5 transition-colors">
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
