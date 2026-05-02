import React, { useState, useEffect, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Package, Search, Filter, ChevronDown, CheckCircle, Clock, XCircle,
  ArrowUpDown, Eye, Loader2, AlertTriangle, Check, X, DollarSign,
  ShieldCheck, Trash2, MoreHorizontal,
} from 'lucide-react';
import adminService from '../../api/adminService';
import { useToast } from '../../context/ToastContext';
import ConfirmModal from '../../components/ui/ConfirmModal';

const STATUS_OPTIONS = [
  { value: '', label: 'All Status' },
  { value: 'pending', label: 'Pending' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
];

const SORT_OPTIONS = [
  { value: '', label: 'Newest First' },
  { value: 'price_low', label: 'Price: Low → High' },
  { value: 'price_high', label: 'Price: High → Low' },
  { value: 'name_asc', label: 'Name: A → Z' },
];

const statusBadge = (status) => {
  const map = {
    pending: { bg: 'bg-amber-100 text-amber-700', icon: Clock },
    approved: { bg: 'bg-green-100 text-green-700', icon: CheckCircle },
    rejected: { bg: 'bg-red-100 text-red-700', icon: XCircle },
    draft: { bg: 'bg-gray-100 text-gray-600', icon: Package },
    inactive: { bg: 'bg-gray-100 text-gray-500', icon: XCircle },
  };
  const m = map[status] || map.draft;
  const Icon = m.icon;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${m.bg}`}>
      <Icon size={10} /> {status}
    </span>
  );
};

const formatPrice = (n) => n != null ? `₹${Number(n).toLocaleString('en-IN')}` : '—';

const AdminProductsPage = () => {
  const [searchParams] = useSearchParams();
  const { addToast } = useToast();

  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  // Filters
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState(searchParams.get('status') || '');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [supplierFilter, setSupplierFilter] = useState('');
  const [sort, setSort] = useState('');
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  // Selection
  const [selected, setSelected] = useState(new Set());
  const [bulkModal, setBulkModal] = useState(null); // 'approve' | 'pricing' | null
  const [bulkPricing, setBulkPricing] = useState({ discount_pct: '', platform_fee: '' });
  const [bulkLoading, setBulkLoading] = useState(false);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = { limit: 200 };
      if (search) params.search = search;
      if (statusFilter) params.status = statusFilter;
      if (categoryFilter) params.category = categoryFilter;
      if (supplierFilter) params.supplier_id = supplierFilter;
      if (sort) params.sort = sort;

      const [prodRes, statsRes] = await Promise.all([
        adminService.listProducts(params),
        adminService.getProductStats(),
      ]);
      setProducts(prodRes.data?.items || []);
      setTotal(prodRes.data?.total || 0);
      setStats(statsRes.data || {});

      // Extract unique categories and suppliers
      const items = prodRes.data?.items || [];
      const cats = [...new Set(items.map((p) => p.category).filter(Boolean))];
      const sups = [...new Map(items.map((p) => [p.supplier_id, { id: p.supplier_id, name: p.supplier_name }])).values()];
      setCategories(cats);
      setSuppliers(sups);
    } catch (e) {
      addToast('Failed to load products', 'error');
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter, categoryFilter, supplierFilter, sort]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const toggleSelect = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };
  const toggleAll = () => {
    if (selected.size === products.length) setSelected(new Set());
    else setSelected(new Set(products.map((p) => p.id)));
  };

  const handleBulkApprove = async () => {
    setBulkLoading(true);
    try {
      const res = await adminService.bulkApproveProducts([...selected]);
      addToast(`${res.data?.approved_count || 0} products approved`, 'success');
      setSelected(new Set());
      setBulkModal(null);
      fetchProducts();
    } catch { addToast('Bulk approve failed', 'error'); }
    finally { setBulkLoading(false); }
  };

  const handleBulkPricing = async () => {
    setBulkLoading(true);
    try {
      const pricing = {};
      if (bulkPricing.discount_pct !== '') pricing.discount_pct = parseFloat(bulkPricing.discount_pct);
      if (bulkPricing.platform_fee !== '') pricing.platform_fee = parseFloat(bulkPricing.platform_fee);
      const res = await adminService.bulkPricingProducts([...selected], pricing);
      addToast(`${res.data?.updated_count || 0} products updated`, 'success');
      setSelected(new Set());
      setBulkModal(null);
      setBulkPricing({ discount_pct: '', platform_fee: '' });
      fetchProducts();
    } catch { addToast('Bulk pricing failed', 'error'); }
    finally { setBulkLoading(false); }
  };

  const handleQuickApprove = async (id) => {
    try {
      await adminService.approveProduct(id);
      addToast('Product approved', 'success');
      fetchProducts();
    } catch { addToast('Approve failed', 'error'); }
  };

  const ic = 'px-3 py-2 border border-gray-200 rounded-xl text-xs outline-none focus:ring-1 focus:ring-violet-400 bg-white';

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Products</h1>
          <p className="text-xs text-gray-500 mt-0.5">Manage all supplier products — approve, set pricing, or reject</p>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Products', value: stats.total_products || 0, color: 'bg-blue-100 text-blue-600', icon: Package },
          { label: 'Pending Review', value: stats.pending_products || 0, color: 'bg-amber-100 text-amber-600', icon: Clock },
          { label: 'Approved', value: stats.approved_products || 0, color: 'bg-green-100 text-green-600', icon: CheckCircle },
          { label: 'Rejected', value: stats.rejected_products || 0, color: 'bg-red-100 text-red-600', icon: XCircle },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-gray-200 p-4 flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color}`}>
              <s.icon size={18} />
            </div>
            <div>
              <p className="text-lg font-bold text-gray-800">{s.value}</p>
              <p className="text-[10px] text-gray-500 font-medium">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters + Bulk Actions */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 space-y-3">
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products…"
              className={`${ic} pl-9 w-full`} />
          </div>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className={ic}>
            {STATUS_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className={ic}>
            <option value="">All Categories</option>
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={supplierFilter} onChange={(e) => setSupplierFilter(e.target.value)} className={ic}>
            <option value="">All Suppliers</option>
            {suppliers.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
          <select value={sort} onChange={(e) => setSort(e.target.value)} className={ic}>
            {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>

        {/* Bulk bar */}
        {selected.size > 0 && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 bg-violet-50 border border-violet-200 rounded-xl px-4 py-2.5">
            <span className="text-xs font-bold text-violet-700">{selected.size} selected</span>
            <div className="flex gap-2 ml-auto">
              <button onClick={() => setBulkModal('approve')} className="flex items-center gap-1 px-3 py-1.5 bg-green-500 text-white text-xs font-bold rounded-lg hover:bg-green-600 transition-colors cursor-pointer">
                <CheckCircle size={12} /> Approve All
              </button>
              <button onClick={() => setBulkModal('pricing')} className="flex items-center gap-1 px-3 py-1.5 bg-violet-500 text-white text-xs font-bold rounded-lg hover:bg-violet-600 transition-colors cursor-pointer">
                <DollarSign size={12} /> Bulk Pricing
              </button>
              <button onClick={() => setSelected(new Set())} className="px-3 py-1.5 text-xs font-semibold text-gray-500 hover:text-gray-700 cursor-pointer">
                Clear
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={28} className="animate-spin text-violet-500" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <Package size={40} className="mx-auto text-gray-300 mb-3" />
            <p className="text-sm font-semibold text-gray-500">No products found</p>
            <p className="text-xs text-gray-400 mt-1">Products added by suppliers will appear here</p>
          </div>
        ) : (
          <>
            {/* Desktop */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="w-10 px-4 py-3">
                      <input type="checkbox" checked={selected.size === products.length && products.length > 0}
                        onChange={toggleAll} className="rounded border-gray-300 cursor-pointer" />
                    </th>
                    <th className="text-left px-4 py-3 text-[10px] font-bold text-gray-500 uppercase">Product</th>
                    <th className="text-left px-4 py-3 text-[10px] font-bold text-gray-500 uppercase">Supplier</th>
                    <th className="text-left px-4 py-3 text-[10px] font-bold text-gray-500 uppercase">Category</th>
                    <th className="text-left px-4 py-3 text-[10px] font-bold text-gray-500 uppercase">Supplier Price</th>
                    <th className="text-left px-4 py-3 text-[10px] font-bold text-gray-500 uppercase">Final Price</th>
                    <th className="text-left px-4 py-3 text-[10px] font-bold text-gray-500 uppercase">Stock</th>
                    <th className="text-left px-4 py-3 text-[10px] font-bold text-gray-500 uppercase">Status</th>
                    <th className="text-left px-4 py-3 text-[10px] font-bold text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <input type="checkbox" checked={selected.has(p.id)} onChange={() => toggleSelect(p.id)}
                          className="rounded border-gray-300 cursor-pointer" />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          {p.image ? (
                            <img src={p.image} alt="" className="w-10 h-10 rounded-lg object-cover border border-gray-200" />
                          ) : (
                            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                              <Package size={16} className="text-gray-400" />
                            </div>
                          )}
                          <div>
                            <Link to={`/admin/products/${p.id}`} className="font-semibold text-gray-800 hover:text-violet-600 transition-colors">
                              {p.name}
                            </Link>
                            {p.sku && <p className="text-[10px] text-gray-400">SKU: {p.sku}</p>}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-600">{p.supplier_name || '—'}</td>
                      <td className="px-4 py-3 text-xs text-gray-600">{p.category}</td>
                      <td className="px-4 py-3 text-xs font-semibold text-gray-700">{formatPrice(p.supplier_price)}</td>
                      <td className="px-4 py-3">
                        <span className="text-xs font-bold text-violet-700">{formatPrice(p.price)}</span>
                        {p.discount_pct > 0 && <span className="text-[10px] text-green-600 ml-1">-{p.discount_pct}%</span>}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-semibold ${p.stock === 0 ? 'text-red-500' : p.stock < 5 ? 'text-amber-600' : 'text-gray-700'}`}>
                          {p.stock}
                        </span>
                      </td>
                      <td className="px-4 py-3">{statusBadge(p.status)}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <Link to={`/admin/products/${p.id}`} className="p-1.5 text-gray-400 hover:text-violet-600 cursor-pointer" title="View">
                            <Eye size={14} />
                          </Link>
                          {p.status === 'pending' && (
                            <button onClick={() => handleQuickApprove(p.id)} className="p-1.5 text-gray-400 hover:text-green-600 cursor-pointer" title="Approve">
                              <CheckCircle size={14} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="lg:hidden space-y-3 p-4">
              {products.map((p) => (
                <div key={p.id} className="border border-gray-200 rounded-xl p-4 space-y-2">
                  <div className="flex items-center gap-3">
                    <input type="checkbox" checked={selected.has(p.id)} onChange={() => toggleSelect(p.id)}
                      className="rounded border-gray-300 cursor-pointer" />
                    {p.image ? (
                      <img src={p.image} alt="" className="w-12 h-12 rounded-lg object-cover border border-gray-200" />
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                        <Package size={16} className="text-gray-400" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <Link to={`/admin/products/${p.id}`} className="text-sm font-semibold text-gray-800 truncate block hover:text-violet-600">{p.name}</Link>
                      <p className="text-[10px] text-gray-500">{p.supplier_name} · {p.category}</p>
                    </div>
                    {statusBadge(p.status)}
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Price: <span className="font-bold text-gray-800">{formatPrice(p.price)}</span></span>
                    <span className="text-gray-500">Stock: <span className="font-semibold">{p.stock}</span></span>
                    {p.status === 'pending' && (
                      <button onClick={() => handleQuickApprove(p.id)} className="text-green-600 font-bold cursor-pointer">Approve</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Bulk Approve Modal */}
      <AnimatePresence>
        {bulkModal === 'approve' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/40" onClick={() => setBulkModal(null)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white rounded-2xl border border-gray-200 shadow-xl max-w-md w-full p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Bulk Approve</h3>
              <p className="text-sm text-gray-500 mb-4">Approve <strong>{selected.size}</strong> selected products? They will become visible to buyers.</p>
              <div className="flex gap-3 justify-end">
                <button onClick={() => setBulkModal(null)} className="px-4 py-2 text-sm font-semibold text-gray-500 hover:text-gray-700 cursor-pointer">Cancel</button>
                <button onClick={handleBulkApprove} disabled={bulkLoading}
                  className="flex items-center gap-1.5 px-4 py-2 bg-green-500 text-white text-sm font-bold rounded-xl hover:bg-green-600 disabled:opacity-50 cursor-pointer">
                  {bulkLoading ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle size={14} />} Approve All
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Bulk Pricing Modal */}
      <AnimatePresence>
        {bulkModal === 'pricing' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/40" onClick={() => setBulkModal(null)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white rounded-2xl border border-gray-200 shadow-xl max-w-md w-full p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Bulk Pricing Update</h3>
              <p className="text-sm text-gray-500 mb-4">Apply pricing changes to <strong>{selected.size}</strong> selected products.</p>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Discount %</label>
                  <input type="number" value={bulkPricing.discount_pct} onChange={(e) => setBulkPricing({ ...bulkPricing, discount_pct: e.target.value })}
                    className={ic + ' w-full'} placeholder="e.g. 10" min="0" max="100" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Platform Fee (₹)</label>
                  <input type="number" value={bulkPricing.platform_fee} onChange={(e) => setBulkPricing({ ...bulkPricing, platform_fee: e.target.value })}
                    className={ic + ' w-full'} placeholder="e.g. 50" min="0" />
                </div>
              </div>
              <div className="flex gap-3 justify-end mt-4">
                <button onClick={() => setBulkModal(null)} className="px-4 py-2 text-sm font-semibold text-gray-500 hover:text-gray-700 cursor-pointer">Cancel</button>
                <button onClick={handleBulkPricing} disabled={bulkLoading}
                  className="flex items-center gap-1.5 px-4 py-2 bg-violet-500 text-white text-sm font-bold rounded-xl hover:bg-violet-600 disabled:opacity-50 cursor-pointer">
                  {bulkLoading ? <Loader2 size={14} className="animate-spin" /> : <DollarSign size={14} />} Apply Pricing
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminProductsPage;
