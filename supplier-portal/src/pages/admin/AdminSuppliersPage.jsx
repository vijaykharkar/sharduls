import React, { useEffect, useState, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search, ChevronRight, Loader2, ShieldCheck, ShieldX,
  CheckCircle, XCircle, ToggleLeft, ToggleRight, Trash2, Eye,
  Users, Clock, Filter,
} from 'lucide-react';
import adminService from '../../api/adminService';
import ConfirmModal from '../../components/ui/ConfirmModal';

const Badge = ({ children, color }) => (
  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${color}`}>
    {children}
  </span>
);

const AdminSuppliersPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [suppliers, setSuppliers] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [statusFilter, setStatusFilter] = useState(searchParams.get('status') || '');
  const [actionLoading, setActionLoading] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const fetchSuppliers = useCallback(async () => {
    setLoading(true);
    try {
      const params = {};
      if (search) params.search = search;
      if (statusFilter) params.status = statusFilter;
      const res = await adminService.listSuppliers(params);
      setSuppliers(res.data?.items || []);
      setTotal(res.data?.total || 0);
    } catch { /* ignore */ }
    finally { setLoading(false); }
  }, [search, statusFilter]);

  useEffect(() => { fetchSuppliers(); }, [fetchSuppliers]);

  const handleApprove = async (id) => {
    setActionLoading(id);
    try { await adminService.approveSupplier(id); fetchSuppliers(); } catch { /* */ }
    finally { setActionLoading(null); }
  };
  const handleReject = async (id) => {
    setActionLoading(id);
    try { await adminService.rejectSupplier(id); fetchSuppliers(); } catch { /* */ }
    finally { setActionLoading(null); }
  };
  const handleToggle = async (id) => {
    setActionLoading(id);
    try { await adminService.toggleStatus(id); fetchSuppliers(); } catch { /* */ }
    finally { setActionLoading(null); }
  };
  const handleDelete = async () => {
    if (!deleteId) return;
    setActionLoading(deleteId);
    try { await adminService.deleteSupplier(deleteId); fetchSuppliers(); } catch { /* */ }
    finally { setActionLoading(null); setDeleteId(null); }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = {};
    if (search) params.search = search;
    if (statusFilter) params.status = statusFilter;
    setSearchParams(params);
    fetchSuppliers();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Suppliers</h1>
          <p className="text-sm text-gray-500">{total} supplier(s) total</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <form onSubmit={handleSearchSubmit} className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, phone…"
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-400 bg-white text-gray-800"
          />
        </form>
        <div className="flex gap-2">
          {['', 'pending', 'approved', 'inactive'].map((f) => (
            <button
              key={f}
              onClick={() => { setStatusFilter(f); }}
              className={`px-4 py-2 rounded-xl text-xs font-semibold border cursor-pointer transition-colors ${
                statusFilter === f
                  ? 'bg-violet-600 text-white border-violet-600'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-violet-300'
              }`}
            >
              {f === '' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center py-20"><Loader2 size={28} className="animate-spin text-violet-500" /></div>
      ) : suppliers.length === 0 ? (
        <div className="text-center py-20">
          <Users size={40} className="mx-auto text-gray-300 mb-3" />
          <p className="text-sm text-gray-500 font-semibold">No suppliers found</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-5 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Supplier</th>
                  <th className="text-left px-5 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider hidden md:table-cell">Contact</th>
                  <th className="text-left px-5 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Profile</th>
                  <th className="text-left px-5 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="text-left px-5 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Registered</th>
                  <th className="text-right px-5 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {suppliers.map((s) => (
                  <motion.tr key={s.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-violet-100 flex items-center justify-center text-violet-600 font-bold text-sm flex-shrink-0">
                          {s.full_name?.[0] || '?'}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-800 truncate">{s.full_name}</p>
                          <p className="text-[10px] text-gray-400">ID: {s.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 hidden md:table-cell">
                      <p className="text-xs text-gray-600 truncate">{s.email}</p>
                      <p className="text-[10px] text-gray-400">{s.phone || '—'}</p>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-violet-500 rounded-full" style={{ width: `${s.profile_completion || 0}%` }} />
                        </div>
                        <span className="text-[10px] font-bold text-gray-600">{s.profile_completion || 0}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex flex-col gap-1">
                        {s.is_profile_approved ? (
                          <Badge color="bg-green-100 text-green-700"><CheckCircle size={10} /> Approved</Badge>
                        ) : (
                          <Badge color="bg-amber-100 text-amber-700"><Clock size={10} /> Pending</Badge>
                        )}
                        {!s.is_active && <Badge color="bg-red-100 text-red-600"><XCircle size={10} /> Inactive</Badge>}
                      </div>
                    </td>
                    <td className="px-5 py-3 hidden lg:table-cell">
                      <p className="text-xs text-gray-500">{s.created_at ? new Date(s.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}</p>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <Link to={`/admin/suppliers/${s.id}`}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-violet-600 hover:bg-violet-50 transition-colors" title="View">
                          <Eye size={15} />
                        </Link>
                        {!s.is_profile_approved ? (
                          <button onClick={() => handleApprove(s.id)} disabled={actionLoading === s.id}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-green-600 hover:bg-green-50 transition-colors cursor-pointer" title="Approve">
                            <ShieldCheck size={15} />
                          </button>
                        ) : (
                          <button onClick={() => handleReject(s.id)} disabled={actionLoading === s.id}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-amber-600 hover:bg-amber-50 transition-colors cursor-pointer" title="Reject">
                            <ShieldX size={15} />
                          </button>
                        )}
                        <button onClick={() => handleToggle(s.id)} disabled={actionLoading === s.id}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer" title={s.is_active ? 'Deactivate' : 'Activate'}>
                          {s.is_active ? <ToggleRight size={15} /> : <ToggleLeft size={15} />}
                        </button>
                        <button onClick={() => setDeleteId(s.id)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer" title="Delete">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Supplier"
        message="This will permanently delete this supplier and all associated data. This cannot be undone."
        confirmText="Delete"
        danger
      />
    </div>
  );
};

export default AdminSuppliersPage;
