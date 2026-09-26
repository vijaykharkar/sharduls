import React, { useState, useEffect, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Package, Search, CheckCircle, Clock, XCircle,
  Eye, Loader2, DollarSign, Plus, Edit2, Trash2, X, Upload, ImagePlus, AlertCircle,
} from 'lucide-react';
import adminService from '../api/adminService';
import { useToast } from '@shared/context/ToastContext';
import ConfirmModal from '@shared/components/ui/ConfirmModal';

const STATUS_OPTIONS = [
  { value: '', label: 'All Status' },
  { value: 'pending', label: 'Pending' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
];

const SORT_OPTIONS = [
  { value: '', label: 'Newest First' },
  { value: 'price_low', label: 'Price: Low \u2192 High' },
  { value: 'price_high', label: 'Price: High \u2192 Low' },
  { value: 'name_asc', label: 'Name: A \u2192 Z' },
];

const PRODUCT_STATUS_OPTIONS = [
  { value: 'approved', label: 'Approved' },
  { value: 'pending', label: 'Pending' },
  { value: 'draft', label: 'Draft' },
  { value: 'inactive', label: 'Inactive' },
];

const CATEGORY_OPTIONS = [
  'Cable Management', 'Earthing Accessories', 'Fixings & Fasteners',
  'Lugs & Connectors', 'Switchboard Components', 'Electrical Components',
  'CNC Machining', '3D Printing', 'Kitting Products', 'Custom Parts',
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
  return <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${m.bg}`}><Icon size={10} /> {status}</span>;
};

const formatPrice = (n) => n != null ? `\u20B9${Number(n).toLocaleString('en-IN')}` : '\u2014';

const AdminProductsPage = () => {
  const [searchParams] = useSearchParams();
  const { addToast } = useToast();
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState(searchParams.get('status') || '');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [supplierFilter, setSupplierFilter] = useState('');
  const [sort, setSort] = useState('');
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [selected, setSelected] = useState(new Set());
  const [bulkModal, setBulkModal] = useState(null);
  const [bulkPricing, setBulkPricing] = useState({ discount_pct: '', platform_fee: '' });
  const [bulkLoading, setBulkLoading] = useState(false);

  // Add/Edit Product state
  const [modalOpen, setModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [imageItems, setImageItems] = useState([]);
  const [deleteId, setDeleteId] = useState(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = { limit: 200 };
      if (search) params.search = search;
      if (statusFilter) params.status = statusFilter;
      if (categoryFilter) params.category = categoryFilter;
      if (supplierFilter) params.supplier_id = supplierFilter;
      if (sort) params.sort = sort;
      const [prodRes, statsRes] = await Promise.all([adminService.listProducts(params), adminService.getProductStats()]);
      setProducts(prodRes.data?.items || []);
      setTotal(prodRes.data?.total || 0);
      setStats(statsRes.data || {});
      const items = prodRes.data?.items || [];
      setCategories([...new Set(items.map((p) => p.category).filter(Boolean))]);
      setSuppliers([...new Map(items.map((p) => [p.supplier_id, { id: p.supplier_id, name: p.supplier_name }])).values()]);
    } catch { addToast('Failed to load products', 'error'); }
    finally { setLoading(false); }
  }, [search, statusFilter, categoryFilter, supplierFilter, sort]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const toggleSelect = (id) => { setSelected((prev) => { const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id); return next; }); };
  const toggleAll = () => { selected.size === products.length ? setSelected(new Set()) : setSelected(new Set(products.map((p) => p.id))); };

  const handleBulkApprove = async () => { setBulkLoading(true); try { const res = await adminService.bulkApproveProducts([...selected]); addToast(`${res.data?.approved_count || 0} products approved`, 'success'); setSelected(new Set()); setBulkModal(null); fetchProducts(); } catch { addToast('Bulk approve failed', 'error'); } finally { setBulkLoading(false); } };
  const handleBulkPricing = async () => { setBulkLoading(true); try { const pricing = {}; if (bulkPricing.discount_pct !== '') pricing.discount_pct = parseFloat(bulkPricing.discount_pct); if (bulkPricing.platform_fee !== '') pricing.platform_fee = parseFloat(bulkPricing.platform_fee); const res = await adminService.bulkPricingProducts([...selected], pricing); addToast(`${res.data?.updated_count || 0} products updated`, 'success'); setSelected(new Set()); setBulkModal(null); setBulkPricing({ discount_pct: '', platform_fee: '' }); fetchProducts(); } catch { addToast('Bulk pricing failed', 'error'); } finally { setBulkLoading(false); } };
  const handleQuickApprove = async (id) => { try { await adminService.approveProduct(id); addToast('Product approved', 'success'); fetchProducts(); } catch { addToast('Approve failed', 'error'); } };

  // ── Add/Edit Product modal helpers ──

  const emptyProduct = {
    name: '', category: '', description: '', brand: '', sku: '',
    price: '', mrp: '', stock: '', status: 'approved', is_featured: false,
    admin_price: '', platform_fee: '', discount_pct: '', admin_notes: '',
  };

  const openAdd = () => { setEditProduct({ ...emptyProduct }); setImageItems([]); setModalOpen(true); };
  const openEdit = (p) => {
    setEditProduct({
      id: p.id, name: p.name || '', category: p.category || '',
      description: p.description || '', brand: p.brand || '',
      sku: p.sku || '', price: p.supplier_price ?? p.price ?? '',
      mrp: p.mrp ?? '', stock: p.stock ?? '',
      status: p.status || 'approved', is_featured: p.is_featured || false,
      admin_price: p.admin_price ?? '', platform_fee: p.platform_fee ?? '',
      discount_pct: p.discount_pct ?? '', admin_notes: p.admin_notes ?? '',
    });
    const existing = (p.images || []).map((url) => ({ type: 'url', url }));
    setImageItems(existing);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false); setEditProduct(null);
    imageItems.filter((i) => i.type === 'file').forEach((i) => URL.revokeObjectURL(i.preview));
    setImageItems([]);
  };

  const handleFilePick = (e) => {
    const files = Array.from(e.target.files || []);
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/bmp'];
    const valid = files.filter((f) => allowed.includes(f.type));
    if (valid.length !== files.length) addToast('Only image files are allowed (jpg, png, webp)', 'warning');
    const oversized = valid.filter((f) => f.size > 10 * 1024 * 1024);
    if (oversized.length > 0) { addToast('Some files exceed 10 MB and were skipped', 'warning'); }
    const okFiles = valid.filter((f) => f.size <= 10 * 1024 * 1024);
    const newItems = okFiles.map((file) => ({ type: 'file', file, preview: URL.createObjectURL(file) }));
    setImageItems((prev) => [...prev, ...newItems]);
    e.target.value = '';
  };

  const removeImage = (idx) => {
    setImageItems((prev) => {
      const item = prev[idx];
      if (item.type === 'file') URL.revokeObjectURL(item.preview);
      return prev.filter((_, i) => i !== idx);
    });
  };

  const handleSave = async () => {
    if (!editProduct.name?.trim()) { addToast('Product name is required', 'warning'); return; }
    if (!editProduct.category?.trim()) { addToast('Category is required', 'warning'); return; }
    if (!editProduct.price || parseFloat(editProduct.price) <= 0) { addToast('Price must be greater than 0', 'warning'); return; }
    if (editProduct.stock !== '' && parseInt(editProduct.stock) < 0) { addToast('Stock cannot be negative', 'warning'); return; }

    setSaving(true);
    try {
      const newFiles = imageItems.filter((i) => i.type === 'file').map((i) => i.file);
      let uploadedUrls = [];
      if (newFiles.length > 0) {
        setUploadingImages(true);
        const res = await adminService.uploadProductImages(newFiles);
        uploadedUrls = res.data || [];
        setUploadingImages(false);
      }
      const existingUrls = imageItems.filter((i) => i.type === 'url').map((i) => i.url);
      const allImages = [...existingUrls, ...uploadedUrls];

      const payload = {
        name: editProduct.name.trim(),
        category: editProduct.category.trim(),
        description: editProduct.description || '',
        brand: editProduct.brand || '',
        sku: editProduct.sku || '',
        price: parseFloat(editProduct.price),
        mrp: editProduct.mrp ? parseFloat(editProduct.mrp) : null,
        stock: parseInt(editProduct.stock || 0, 10),
        images: allImages,
        status: editProduct.status || 'approved',
        is_featured: editProduct.is_featured || false,
      };
      if (editProduct.admin_price !== '' && editProduct.admin_price !== null) payload.admin_price = parseFloat(editProduct.admin_price);
      if (editProduct.platform_fee !== '' && editProduct.platform_fee !== null) payload.platform_fee = parseFloat(editProduct.platform_fee);
      if (editProduct.discount_pct !== '' && editProduct.discount_pct !== null) payload.discount_pct = parseFloat(editProduct.discount_pct);
      if (editProduct.admin_notes) payload.admin_notes = editProduct.admin_notes;

      if (editProduct.id) {
        await adminService.updateProduct(editProduct.id, payload);
        addToast('Product updated!', 'success');
      } else {
        await adminService.createProduct(payload);
        addToast('Product created!', 'success');
      }
      closeModal(); fetchProducts();
    } catch (err) {
      setUploadingImages(false);
      addToast(err?.response?.data?.detail || err?.userMessage || 'Failed to save product', 'error');
    } finally { setSaving(false); }
  };

  const handleDelete = async () => {
    try {
      await adminService.deleteProduct(deleteId);
      setDeleteId(null); addToast('Product deleted', 'info'); fetchProducts();
    } catch { addToast('Failed to delete product', 'error'); setDeleteId(null); }
  };

  const ic = 'px-3 py-2 border border-gray-200 rounded-xl text-xs outline-none focus:ring-1 focus:ring-violet-400 bg-white';
  const icModal = 'w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:ring-1 focus:ring-violet-300 bg-white text-gray-800 placeholder-gray-400 transition-all';

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-xl font-bold text-gray-800">Products</h1><p className="text-xs text-gray-500 mt-0.5">Manage all products</p></div>
        <button onClick={openAdd} className="flex items-center gap-1.5 px-4 py-2.5 bg-violet-600 text-white text-sm font-bold rounded-xl hover:bg-violet-700 cursor-pointer transition-colors">
          <Plus size={16} /> Add Product
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[{ label: 'Total Products', value: stats.total_products || 0, color: 'bg-blue-100 text-blue-600', icon: Package }, { label: 'Pending Review', value: stats.pending_products || 0, color: 'bg-amber-100 text-amber-600', icon: Clock }, { label: 'Approved', value: stats.approved_products || 0, color: 'bg-green-100 text-green-600', icon: CheckCircle }, { label: 'Rejected', value: stats.rejected_products || 0, color: 'bg-red-100 text-red-600', icon: XCircle }].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-gray-200 p-4 flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color}`}><s.icon size={18} /></div>
            <div><p className="text-lg font-bold text-gray-800">{s.value}</p><p className="text-[10px] text-gray-500 font-medium">{s.label}</p></div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-4 space-y-3">
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px]"><Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products\u2026" className={`${ic} pl-9 w-full`} /></div>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className={ic}>{STATUS_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}</select>
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className={ic}><option value="">All Categories</option>{categories.map((c) => <option key={c} value={c}>{c}</option>)}</select>
          <select value={supplierFilter} onChange={(e) => setSupplierFilter(e.target.value)} className={ic}><option value="">All Suppliers</option>{suppliers.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}</select>
          <select value={sort} onChange={(e) => setSort(e.target.value)} className={ic}>{SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}</select>
        </div>
        {selected.size > 0 && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 bg-violet-50 border border-violet-200 rounded-xl px-4 py-2.5">
            <span className="text-xs font-bold text-violet-700">{selected.size} selected</span>
            <div className="flex gap-2 ml-auto">
              <button onClick={() => setBulkModal('approve')} className="flex items-center gap-1 px-3 py-1.5 bg-green-500 text-white text-xs font-bold rounded-lg hover:bg-green-600 cursor-pointer"><CheckCircle size={12} /> Approve All</button>
              <button onClick={() => setBulkModal('pricing')} className="flex items-center gap-1 px-3 py-1.5 bg-violet-500 text-white text-xs font-bold rounded-lg hover:bg-violet-600 cursor-pointer"><DollarSign size={12} /> Bulk Pricing</button>
              <button onClick={() => setSelected(new Set())} className="px-3 py-1.5 text-xs font-semibold text-gray-500 hover:text-gray-700 cursor-pointer">Clear</button>
            </div>
          </motion.div>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        {loading ? <div className="flex items-center justify-center py-20"><Loader2 size={28} className="animate-spin text-violet-500" /></div>
        : products.length === 0 ? (
          <div className="text-center py-20">
            <Package size={40} className="mx-auto text-gray-300 mb-3" />
            <p className="text-sm font-semibold text-gray-500">No products found</p>
            <p className="text-xs text-gray-400 mt-1">Add your first product to get started</p>
            <button onClick={openAdd} className="mt-4 px-4 py-2 bg-violet-600 text-white text-xs font-bold rounded-xl cursor-pointer hover:bg-violet-700">Add First Product</button>
          </div>
        ) : (
          <>
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="bg-gray-50 border-b border-gray-200">
                  <th className="w-10 px-4 py-3"><input type="checkbox" checked={selected.size === products.length && products.length > 0} onChange={toggleAll} className="rounded border-gray-300 cursor-pointer" /></th>
                  <th className="text-left px-4 py-3 text-[10px] font-bold text-gray-500 uppercase">Product</th>
                  <th className="text-left px-4 py-3 text-[10px] font-bold text-gray-500 uppercase">Supplier</th>
                  <th className="text-left px-4 py-3 text-[10px] font-bold text-gray-500 uppercase">Category</th>
                  <th className="text-left px-4 py-3 text-[10px] font-bold text-gray-500 uppercase">Supplier Price</th>
                  <th className="text-left px-4 py-3 text-[10px] font-bold text-gray-500 uppercase">Final Price</th>
                  <th className="text-left px-4 py-3 text-[10px] font-bold text-gray-500 uppercase">Stock</th>
                  <th className="text-left px-4 py-3 text-[10px] font-bold text-gray-500 uppercase">Status</th>
                  <th className="text-left px-4 py-3 text-[10px] font-bold text-gray-500 uppercase">Actions</th>
                </tr></thead>
                <tbody>{products.map((p) => (
                  <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3"><input type="checkbox" checked={selected.has(p.id)} onChange={() => toggleSelect(p.id)} className="rounded border-gray-300 cursor-pointer" /></td>
                    <td className="px-4 py-3"><div className="flex items-center gap-3">{p.image ? <img src={p.image} alt="" className="w-10 h-10 rounded-lg object-cover border border-gray-200" /> : <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center"><Package size={16} className="text-gray-400" /></div>}<div><Link to={`/admin/products/${p.id}`} className="font-semibold text-gray-800 hover:text-violet-600">{p.name}</Link>{p.sku && <p className="text-[10px] text-gray-400">SKU: {p.sku}</p>}</div></div></td>
                    <td className="px-4 py-3 text-xs text-gray-600">{p.supplier_name || '\u2014'}</td>
                    <td className="px-4 py-3 text-xs text-gray-600">{p.category}</td>
                    <td className="px-4 py-3 text-xs font-semibold text-gray-700">{formatPrice(p.supplier_price)}</td>
                    <td className="px-4 py-3"><span className="text-xs font-bold text-violet-700">{formatPrice(p.price)}</span>{p.discount_pct > 0 && <span className="text-[10px] text-green-600 ml-1">-{p.discount_pct}%</span>}</td>
                    <td className="px-4 py-3"><span className={`text-xs font-semibold ${p.stock === 0 ? 'text-red-500' : p.stock < 5 ? 'text-amber-600' : 'text-gray-700'}`}>{p.stock}</span></td>
                    <td className="px-4 py-3">{statusBadge(p.status)}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <Link to={`/admin/products/${p.id}`} className="p-1.5 text-gray-400 hover:text-violet-600 cursor-pointer" title="View"><Eye size={14} /></Link>
                        <button onClick={() => openEdit(p)} className="p-1.5 text-gray-400 hover:text-violet-600 cursor-pointer" title="Edit"><Edit2 size={14} /></button>
                        <button onClick={() => setDeleteId(p.id)} className="p-1.5 text-gray-400 hover:text-red-500 cursor-pointer" title="Delete"><Trash2 size={14} /></button>
                        {p.status === 'pending' && <button onClick={() => handleQuickApprove(p.id)} className="p-1.5 text-gray-400 hover:text-green-600 cursor-pointer" title="Approve"><CheckCircle size={14} /></button>}
                      </div>
                    </td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
            <div className="lg:hidden space-y-3 p-4">{products.map((p) => (
              <div key={p.id} className="border border-gray-200 rounded-xl p-4 space-y-2">
                <div className="flex items-center gap-3"><input type="checkbox" checked={selected.has(p.id)} onChange={() => toggleSelect(p.id)} className="rounded border-gray-300 cursor-pointer" />{p.image ? <img src={p.image} alt="" className="w-12 h-12 rounded-lg object-cover border border-gray-200" /> : <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center"><Package size={16} className="text-gray-400" /></div>}<div className="flex-1 min-w-0"><Link to={`/admin/products/${p.id}`} className="text-sm font-semibold text-gray-800 truncate block hover:text-violet-600">{p.name}</Link><p className="text-[10px] text-gray-500">{p.supplier_name} · {p.category}</p></div>{statusBadge(p.status)}</div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Price: <span className="font-bold text-gray-800">{formatPrice(p.price)}</span></span>
                  <span className="text-gray-500">Stock: <span className="font-semibold">{p.stock}</span></span>
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(p)} className="text-violet-600 font-bold cursor-pointer">Edit</button>
                    <button onClick={() => setDeleteId(p.id)} className="text-red-500 font-bold cursor-pointer">Delete</button>
                    {p.status === 'pending' && <button onClick={() => handleQuickApprove(p.id)} className="text-green-600 font-bold cursor-pointer">Approve</button>}
                  </div>
                </div>
              </div>
            ))}</div>
          </>
        )}
      </div>

      {/* ── Add/Edit Product Modal ── */}
      <AnimatePresence>
        {modalOpen && editProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/50" onClick={closeModal} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
              <button onClick={closeModal} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 cursor-pointer"><X size={18} /></button>
              <h3 className="text-lg font-bold text-gray-800 mb-1">{editProduct.id ? 'Edit Product' : 'Add New Product'}</h3>
              <p className="text-xs text-gray-400 mb-4">{editProduct.id ? 'Update product details and pricing.' : 'Create a new product. Admin products are approved by default.'}</p>

              <div className="space-y-3">
                {/* Basic Info */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Product Name *</label>
                  <input value={editProduct.name} onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })} className={icModal} placeholder="e.g. Industrial Cable Tray 300mm" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Category *</label>
                    <select value={editProduct.category} onChange={(e) => setEditProduct({ ...editProduct, category: e.target.value })} className={icModal}>
                      <option value="">Select...</option>
                      {[...new Set([...CATEGORY_OPTIONS, ...categories])].map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Brand</label>
                    <input value={editProduct.brand} onChange={(e) => setEditProduct({ ...editProduct, brand: e.target.value })} className={icModal} placeholder="Brand name" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Description</label>
                  <textarea value={editProduct.description} onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })} className={`${icModal} resize-none`} rows={3} placeholder="Describe the product..." />
                </div>

                {/* Pricing */}
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Price (\u20B9) *</label>
                    <input type="number" value={editProduct.price} onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })} className={icModal} placeholder="0" min="0" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">MRP (\u20B9)</label>
                    <input type="number" value={editProduct.mrp} onChange={(e) => setEditProduct({ ...editProduct, mrp: e.target.value })} className={icModal} placeholder="0" min="0" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Stock Qty</label>
                    <input type="number" value={editProduct.stock} onChange={(e) => setEditProduct({ ...editProduct, stock: e.target.value })} className={icModal} placeholder="0" min="0" />
                  </div>
                </div>

                {/* Admin Pricing */}
                <div className="bg-violet-50 border border-violet-200 rounded-xl p-4 space-y-3">
                  <p className="text-xs font-bold text-violet-700">Admin Pricing & Settings</p>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 mb-1">Admin Price (\u20B9)</label>
                      <input type="number" value={editProduct.admin_price} onChange={(e) => setEditProduct({ ...editProduct, admin_price: e.target.value })} className={icModal} placeholder="Override price" min="0" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 mb-1">Platform Fee (\u20B9)</label>
                      <input type="number" value={editProduct.platform_fee} onChange={(e) => setEditProduct({ ...editProduct, platform_fee: e.target.value })} className={icModal} placeholder="0" min="0" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 mb-1">Discount %</label>
                      <input type="number" value={editProduct.discount_pct} onChange={(e) => setEditProduct({ ...editProduct, discount_pct: e.target.value })} className={icModal} placeholder="0" min="0" max="100" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 mb-1">Status</label>
                      <select value={editProduct.status} onChange={(e) => setEditProduct({ ...editProduct, status: e.target.value })} className={icModal}>
                        {PRODUCT_STATUS_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 mb-1">SKU</label>
                      <input value={editProduct.sku} onChange={(e) => setEditProduct({ ...editProduct, sku: e.target.value })} className={icModal} placeholder="Optional stock-keeping unit" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 mb-1">Admin Notes</label>
                    <textarea value={editProduct.admin_notes} onChange={(e) => setEditProduct({ ...editProduct, admin_notes: e.target.value })} className={`${icModal} resize-none`} rows={2} placeholder="Internal notes..." />
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" checked={editProduct.is_featured} onChange={(e) => setEditProduct({ ...editProduct, is_featured: e.target.checked })} className="rounded border-gray-300 cursor-pointer" id="admin-featured" />
                    <label htmlFor="admin-featured" className="text-xs font-semibold text-gray-700 cursor-pointer">Featured Product</label>
                  </div>
                </div>

                {/* Images */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-2">Product Images</label>
                  {imageItems.length > 0 && (
                    <div className="grid grid-cols-5 gap-2 mb-3">
                      {imageItems.map((item, idx) => (
                        <div key={idx} className="relative group aspect-square">
                          <img src={item.type === 'url' ? item.url : item.preview} alt="" className="w-full h-full object-cover rounded-xl border border-gray-200" />
                          <button type="button" onClick={() => removeImage(idx)}
                            className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow">
                            <X size={11} />
                          </button>
                          {item.type === 'file' && (
                            <div className="absolute bottom-0 left-0 right-0 bg-amber-500/80 text-white text-[8px] font-bold text-center py-0.5 rounded-b-xl">New</div>
                          )}
                        </div>
                      ))}
                      <label className="aspect-square border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-violet-400 hover:bg-gray-50 transition-colors">
                        <ImagePlus size={16} className="text-gray-300" />
                        <span className="text-[9px] text-gray-400 mt-1">Add</span>
                        <input type="file" multiple accept="image/jpeg,image/png,image/webp,image/gif,image/bmp" className="hidden" onChange={handleFilePick} />
                      </label>
                    </div>
                  )}
                  {imageItems.length === 0 && (
                    <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl p-6 cursor-pointer hover:border-violet-400 hover:bg-gray-50 transition-colors">
                      <Upload size={24} className="text-gray-300 mb-2" />
                      <p className="text-xs font-semibold text-gray-500">Click to upload images</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">JPG, PNG, WEBP up to 10 MB each</p>
                      <input type="file" multiple accept="image/jpeg,image/png,image/webp,image/gif,image/bmp" className="hidden" onChange={handleFilePick} />
                    </label>
                  )}
                  {imageItems.filter((i) => i.type === 'file').length > 0 && (
                    <p className="text-[10px] text-amber-600 flex items-center gap-1 mt-1.5">
                      <AlertCircle size={11} /> {imageItems.filter((i) => i.type === 'file').length} new image(s) will be uploaded when you save
                    </p>
                  )}
                </div>

                {/* Submit */}
                <div className="pt-2">
                  <button onClick={handleSave} disabled={saving}
                    className="w-full flex items-center justify-center gap-2 py-2.5 bg-violet-600 text-white font-bold rounded-xl hover:bg-violet-700 cursor-pointer transition-colors disabled:opacity-60">
                    {saving ? <Loader2 size={15} className="animate-spin" /> : null}
                    {saving && uploadingImages ? 'Uploading images\u2026' : saving ? 'Saving\u2026' : editProduct.id ? 'Update Product' : 'Create Product'}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Delete Confirmation ── */}
      <ConfirmModal isOpen={deleteId !== null} onClose={() => setDeleteId(null)} onConfirm={handleDelete}
        title="Delete Product" message="Are you sure you want to delete this product? This action cannot be undone." confirmText="Delete" danger />

      {/* ── Bulk Approve Modal ── */}
      <AnimatePresence>
        {bulkModal === 'approve' && (<div className="fixed inset-0 z-50 flex items-center justify-center p-4"><motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/40" onClick={() => setBulkModal(null)} /><motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative bg-white rounded-2xl border border-gray-200 shadow-xl max-w-md w-full p-6"><h3 className="text-lg font-bold text-gray-800 mb-2">Bulk Approve</h3><p className="text-sm text-gray-500 mb-4">Approve <strong>{selected.size}</strong> selected products?</p><div className="flex gap-3 justify-end"><button onClick={() => setBulkModal(null)} className="px-4 py-2 text-sm font-semibold text-gray-500 cursor-pointer">Cancel</button><button onClick={handleBulkApprove} disabled={bulkLoading} className="flex items-center gap-1.5 px-4 py-2 bg-green-500 text-white text-sm font-bold rounded-xl hover:bg-green-600 disabled:opacity-50 cursor-pointer">{bulkLoading ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle size={14} />} Approve All</button></div></motion.div></div>)}
      </AnimatePresence>

      {/* ── Bulk Pricing Modal ── */}
      <AnimatePresence>
        {bulkModal === 'pricing' && (<div className="fixed inset-0 z-50 flex items-center justify-center p-4"><motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/40" onClick={() => setBulkModal(null)} /><motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative bg-white rounded-2xl border border-gray-200 shadow-xl max-w-md w-full p-6"><h3 className="text-lg font-bold text-gray-800 mb-2">Bulk Pricing Update</h3><p className="text-sm text-gray-500 mb-4">Apply pricing changes to <strong>{selected.size}</strong> products.</p><div className="space-y-3"><div><label className="block text-xs font-semibold text-gray-700 mb-1">Discount %</label><input type="number" value={bulkPricing.discount_pct} onChange={(e) => setBulkPricing({ ...bulkPricing, discount_pct: e.target.value })} className={ic + ' w-full'} placeholder="e.g. 10" min="0" max="100" /></div><div><label className="block text-xs font-semibold text-gray-700 mb-1">Platform Fee (\u20B9)</label><input type="number" value={bulkPricing.platform_fee} onChange={(e) => setBulkPricing({ ...bulkPricing, platform_fee: e.target.value })} className={ic + ' w-full'} placeholder="e.g. 50" min="0" /></div></div><div className="flex gap-3 justify-end mt-4"><button onClick={() => setBulkModal(null)} className="px-4 py-2 text-sm font-semibold text-gray-500 cursor-pointer">Cancel</button><button onClick={handleBulkPricing} disabled={bulkLoading} className="flex items-center gap-1.5 px-4 py-2 bg-violet-500 text-white text-sm font-bold rounded-xl hover:bg-violet-600 disabled:opacity-50 cursor-pointer">{bulkLoading ? <Loader2 size={14} className="animate-spin" /> : <DollarSign size={14} />} Apply Pricing</button></div></motion.div></div>)}
      </AnimatePresence>
    </div>
  );
};

export default AdminProductsPage;
