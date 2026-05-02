import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, ShieldCheck, Clock, FileText, ArrowRight, Loader2, Package, CheckCircle } from 'lucide-react';
import adminService from '../../api/adminService';

const StatCard = ({ icon: Icon, label, value, color, sub }) => (
  <motion.div whileHover={{ y: -3, boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}
    className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
    <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-3 ${color}`}>
      <Icon size={20} />
    </div>
    <p className="text-2xl font-bold text-gray-800">{value}</p>
    <p className="text-xs text-gray-500 mt-0.5">{label}</p>
    {sub && <p className="text-[10px] text-gray-400 mt-1">{sub}</p>}
  </motion.div>
);

const AdminDashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    adminService.getDashboard()
      .then((res) => setStats(res.data))
      .catch((err) => setError(err?.response?.data?.detail || 'Failed to load'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex items-center justify-center min-h-[60vh]"><Loader2 size={32} className="animate-spin text-violet-500" /></div>;
  if (error) return <div className="text-center py-20 text-red-500 text-sm">{error}</div>;

  const s = stats || {};

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage suppliers & platform overview</p>
        </div>
        <Link to="/admin/suppliers" className="inline-flex items-center gap-2 text-xs text-violet-600 font-semibold hover:text-violet-700 bg-violet-50 px-4 py-2 rounded-xl border border-violet-200 transition-colors">
          View All Suppliers <ArrowRight size={13} />
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users}       label="Total Suppliers"    value={s.total_suppliers || 0}    color="bg-blue-100 text-blue-600" />
        <StatCard icon={Clock}       label="Pending Approvals"  value={s.pending_approvals || 0}  color="bg-amber-100 text-amber-600" />
        <StatCard icon={ShieldCheck} label="Approved Suppliers" value={s.approved_suppliers || 0} color="bg-green-100 text-green-600" />
        <StatCard icon={Package}     label="Total Products"     value={s.total_products || 0}     color="bg-violet-100 text-violet-600" />
      </div>

      {/* Product Stats Row */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-gray-200 p-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center"><Clock size={16} /></div>
          <div><p className="text-lg font-bold text-gray-800">{s.pending_products || 0}</p><p className="text-[10px] text-gray-500">Products Pending Review</p></div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-green-100 text-green-600 flex items-center justify-center"><CheckCircle size={16} /></div>
          <div><p className="text-lg font-bold text-gray-800">{s.approved_products || 0}</p><p className="text-[10px] text-gray-500">Approved Products</p></div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-red-100 text-red-600 flex items-center justify-center"><FileText size={16} /></div>
          <div><p className="text-lg font-bold text-gray-800">{s.rejected_products || 0}</p><p className="text-[10px] text-gray-500">Rejected Products</p></div>
        </div>
      </div>

      {/* Pending Reviews Alert */}
      {(s.pending_approvals || 0) > 0 && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 bg-amber-50 border border-amber-200 rounded-2xl px-6 py-4">
          <div className="w-11 h-11 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
            <Clock size={20} className="text-amber-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-amber-800">New Supplier Registrations</p>
            <p className="text-xs text-amber-600 mt-0.5">
              {s.pending_approvals} supplier{s.pending_approvals !== 1 ? 's' : ''} registered and awaiting your review. Please verify their details, documents, and approve or send feedback.
            </p>
          </div>
          <Link to="/admin/suppliers?status=pending" className="flex items-center gap-1.5 px-4 py-2 bg-amber-500 text-white text-xs font-bold rounded-xl hover:bg-amber-600 transition-colors flex-shrink-0">
            Review Now <ArrowRight size={13} />
          </Link>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-sm font-bold text-gray-800 mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <Link to="/admin/suppliers?status=pending" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-amber-50 border border-amber-200 hover:bg-amber-100 transition-colors">
              <Clock size={18} className="text-amber-600" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-amber-800">Review Pending Profiles</p>
                <p className="text-xs text-amber-600">{s.pending_approvals || 0} supplier(s) awaiting approval</p>
              </div>
              <ArrowRight size={16} className="text-amber-500" />
            </Link>
            <Link to="/admin/suppliers" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-colors">
              <Users size={18} className="text-blue-600" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-blue-800">Manage All Suppliers</p>
                <p className="text-xs text-blue-600">{s.total_suppliers || 0} registered supplier(s)</p>
              </div>
              <ArrowRight size={16} className="text-blue-500" />
            </Link>
            <Link to="/admin/products?status=pending" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-violet-50 border border-violet-200 hover:bg-violet-100 transition-colors">
              <Package size={18} className="text-violet-600" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-violet-800">Review Pending Products</p>
                <p className="text-xs text-violet-600">{s.pending_products || 0} product(s) awaiting review</p>
              </div>
              <ArrowRight size={16} className="text-violet-500" />
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-sm font-bold text-gray-800 mb-4">Platform Overview</h2>
          <div className="space-y-3">
            {[
              { label: 'Total Users', value: s.total_users || 0 },
              { label: 'Active Suppliers', value: s.active_suppliers || 0 },
              { label: 'Approved Suppliers', value: s.approved_suppliers || 0 },
              { label: 'Total Documents', value: s.total_documents || 0 },
              { label: 'Total Products', value: s.total_products || 0 },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <span className="text-xs text-gray-500">{item.label}</span>
                <span className="text-sm font-bold text-gray-800">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
