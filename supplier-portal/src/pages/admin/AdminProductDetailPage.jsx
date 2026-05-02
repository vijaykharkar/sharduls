import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Package, Loader2, CheckCircle, XCircle, Clock, DollarSign,
  Edit3, Save, Tag, Layers, User, BarChart3, AlertTriangle, Eye, Image,
  ShieldCheck, Ban, MessageSquare,
} from 'lucide-react';
import adminService from '../../api/adminService';
import { useToast } from '../../context/ToastContext';
import ConfirmModal from '../../components/ui/ConfirmModal';

const formatPrice = (n) => n != null ? `₹${Number(n).toLocaleString('en-IN')}` : '—';

const statusConfig = {
  pending:  { bg: 'bg-amber-100 text-amber-700 border-amber-200', icon: Clock, label: 'Pending Review' },
  approved: { bg: 'bg-green-100 text-green-700 border-green-200', icon: CheckCircle, label: 'Approved' },
  rejected: { bg: 'bg-red-100 text-red-700 border-red-200', icon: XCircle, label: 'Rejected' },
  draft:    { bg: 'bg-gray-100 text-gray-600 border-gray-200', icon: Package, label: 'Draft' },
  inactive: { bg: 'bg-gray-100 text-gray-500 border-gray-200', icon: Ban, label: 'Inactive' },
};

const Field = ({ label, value, children }) => (
  <div>
    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">{label}</p>
    {children || <p className="text-sm font-medium text-gray-800">{value || '—'}</p>}
  </div>
);

const AdminProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Pricing form
  const [editPricing, setEditPricing] = useState(false);
  const [pricing, setPricing] = useState({
    admin_price: '', platform_fee: '', discount_pct: '', admin_notes: '', mrp: '', is_featured: false,
  });

  // Reject
  const [showReject, setShowReject] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [showApprove, setShowApprove] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const res = await adminService.getProduct(id);
      const p = res.data;
      setProduct(p);
      setPricing({
        admin_price: p.admin_price ?? '',
        platform_fee: p.platform_fee ?? '',
        discount_pct: p.discount_pct ?? '',
        admin_notes: p.admin_notes ?? '',
        mrp: p.mrp ?? '',
        is_featured: p.is_featured ?? false,
      });
    } catch {
      addToast('Failed to load product', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSavePricing = async () => {
    setSaving(true);
    try {
      const data = {};
      if (pricing.admin_price !== '') data.admin_price = parseFloat(pricing.admin_price);
      if (pricing.platform_fee !== '') data.platform_fee = parseFloat(pricing.platform_fee);
      if (pricing.discount_pct !== '') data.discount_pct = parseFloat(pricing.discount_pct);
      if (pricing.mrp !== '') data.mrp = parseFloat(pricing.mrp);
      if (pricing.admin_notes) data.admin_notes = pricing.admin_notes;
      data.is_featured = pricing.is_featured;

      await adminService.updateProductPricing(id, data);
      addToast('Pricing updated', 'success');
      setEditPricing(false);
      fetchProduct();
    } catch {
      addToast('Failed to update pricing', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleApprove = async () => {
    setSaving(true);
    try {
      await adminService.approveProduct(id);
      addToast('Product approved — now visible to buyers', 'success');
      setShowApprove(false);
      fetchProduct();
    } catch {
      addToast('Failed to approve', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleReject = async () => {
    setSaving(true);
    try {
      await adminService.rejectProduct(id, rejectReason);
      addToast('Product rejected', 'info');
      setShowReject(false);
      setRejectReason('');
      fetchProduct();
    } catch {
      addToast('Failed to reject', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 size={32} className="animate-spin text-violet-500" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20">
        <AlertTriangle size={40} className="mx-auto text-amber-400 mb-3" />
        <p className="text-sm font-semibold text-gray-600">Product not found</p>
        <Link to="/admin/products" className="text-xs text-violet-600 font-semibold mt-2 inline-block">← Back to Products</Link>
      </div>
    );
  }

  const sc = statusConfig[product.status] || statusConfig.draft;
  const StatusIcon = sc.icon;

  const basePrice = product.admin_price != null ? product.admin_price : product.supplier_price;
  const discountAmt = basePrice * (product.discount_pct || 0) / 100;
  const finalPrice = basePrice + (product.platform_fee || 0) - discountAmt;

  const ic = 'w-full px-3 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:ring-1 focus:ring-violet-400';

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Back + Header */}
      <div className="flex items-center gap-4">
        <button onClick={() => navigate('/admin/products')} className="p-2 hover:bg-gray-100 rounded-xl cursor-pointer transition-colors">
          <ArrowLeft size={18} className="text-gray-500" />
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-gray-800">{product.name}</h1>
          <div className="flex items-center gap-3 mt-1">
            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border ${sc.bg}`}>
              <StatusIcon size={11} /> {sc.label}
            </span>
            {product.sku && <span className="text-[10px] text-gray-400">SKU: {product.sku}</span>}
            {product.is_featured && <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">⭐ Featured</span>}
          </div>
        </div>
        <div className="flex gap-2">
          {product.status === 'pending' && (
            <>
              <button onClick={() => setShowApprove(true)} className="flex items-center gap-1.5 px-4 py-2 bg-green-500 text-white text-xs font-bold rounded-xl hover:bg-green-600 cursor-pointer transition-colors">
                <CheckCircle size={13} /> Approve
              </button>
              <button onClick={() => setShowReject(true)} className="flex items-center gap-1.5 px-4 py-2 bg-red-500 text-white text-xs font-bold rounded-xl hover:bg-red-600 cursor-pointer transition-colors">
                <XCircle size={13} /> Reject
              </button>
            </>
          )}
          {product.status === 'approved' && (
            <button onClick={() => setShowReject(true)} className="flex items-center gap-1.5 px-4 py-2 border border-red-200 text-red-600 text-xs font-bold rounded-xl hover:bg-red-50 cursor-pointer transition-colors">
              <Ban size={13} /> Revoke Approval
            </button>
          )}
          {product.status === 'rejected' && (
            <button onClick={() => setShowApprove(true)} className="flex items-center gap-1.5 px-4 py-2 bg-green-500 text-white text-xs font-bold rounded-xl hover:bg-green-600 cursor-pointer transition-colors">
              <CheckCircle size={13} /> Approve Now
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Product Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Images */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h2 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2"><Image size={16} className="text-violet-500" /> Images</h2>
            {(product.images || []).length > 0 ? (
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((img, i) => (
                  <img key={i} src={img} alt="" className="w-full aspect-square object-cover rounded-xl border border-gray-200" />
                ))}
              </div>
            ) : (
              <div className="py-8 text-center bg-gray-50 rounded-xl">
                <Package size={24} className="mx-auto text-gray-300 mb-2" />
                <p className="text-xs text-gray-400">No images uploaded</p>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h2 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2"><Layers size={16} className="text-violet-500" /> Product Details</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <Field label="Category" value={product.category} />
              <Field label="Brand" value={product.brand} />
              <Field label="SKU" value={product.sku} />
              <Field label="Stock" value={product.stock} />
              <Field label="Created" value={product.created_at ? new Date(product.created_at).toLocaleDateString() : '—'} />
            </div>
            {product.description && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Description</p>
                <p className="text-xs text-gray-600 leading-relaxed">{product.description}</p>
              </div>
            )}
            {product.specs && Object.keys(product.specs).length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Specifications</p>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(product.specs).map(([k, v]) => (
                    <div key={k} className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                      <span className="text-[10px] font-semibold text-gray-500">{k}:</span>
                      <span className="text-xs font-medium text-gray-800">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Supplier Info */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h2 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2"><User size={16} className="text-violet-500" /> Supplier</h2>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center text-violet-600 font-bold text-sm">
                {product.supplier_name?.[0] || '?'}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">{product.supplier_name}</p>
                <Link to={`/admin/suppliers/${product.supplier_id}`} className="text-[10px] text-violet-600 font-semibold hover:underline">
                  View Supplier Profile →
                </Link>
              </div>
            </div>
          </div>

          {/* Rejection Reason (if rejected) */}
          {product.status === 'rejected' && product.admin_rejection_reason && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
              <h2 className="text-sm font-bold text-red-800 mb-2 flex items-center gap-2"><AlertTriangle size={16} /> Rejection Reason</h2>
              <p className="text-xs text-red-700">{product.admin_rejection_reason}</p>
            </div>
          )}
        </div>

        {/* Right: Pricing Panel */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-gray-800 flex items-center gap-2"><DollarSign size={16} className="text-violet-500" /> Pricing</h2>
              {!editPricing ? (
                <button onClick={() => setEditPricing(true)} className="flex items-center gap-1 text-[10px] font-bold text-violet-600 hover:text-violet-700 cursor-pointer">
                  <Edit3 size={11} /> Edit
                </button>
              ) : (
                <button onClick={() => setEditPricing(false)} className="text-[10px] font-bold text-gray-400 hover:text-gray-600 cursor-pointer">Cancel</button>
              )}
            </div>

            {!editPricing ? (
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-xs text-gray-500">Supplier Price</span>
                  <span className="text-sm font-semibold text-gray-800">{formatPrice(product.supplier_price)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-xs text-gray-500">MRP</span>
                  <span className="text-sm font-semibold text-gray-800">{formatPrice(product.mrp)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-xs text-gray-500">Admin Price</span>
                  <span className="text-sm font-semibold text-violet-700">{product.admin_price != null ? formatPrice(product.admin_price) : 'Not set'}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-xs text-gray-500">Platform Fee</span>
                  <span className="text-sm font-semibold text-gray-800">{formatPrice(product.platform_fee)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-xs text-gray-500">Discount</span>
                  <span className="text-sm font-semibold text-green-600">{product.discount_pct || 0}%</span>
                </div>
                <div className="flex justify-between items-center py-3 bg-violet-50 rounded-xl px-3 -mx-1">
                  <span className="text-xs font-bold text-violet-700">Final Price</span>
                  <span className="text-lg font-bold text-violet-700">{formatPrice(finalPrice)}</span>
                </div>
                {product.admin_notes && (
                  <div className="mt-2 pt-2 border-t border-gray-100">
                    <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Admin Notes</p>
                    <p className="text-xs text-gray-600">{product.admin_notes}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 mb-1">Admin Price (₹)</label>
                  <input type="number" value={pricing.admin_price} onChange={(e) => setPricing({ ...pricing, admin_price: e.target.value })}
                    className={ic} placeholder="Leave empty to use supplier price" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 mb-1">MRP (₹)</label>
                  <input type="number" value={pricing.mrp} onChange={(e) => setPricing({ ...pricing, mrp: e.target.value })}
                    className={ic} placeholder="Maximum retail price" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 mb-1">Platform Fee (₹)</label>
                  <input type="number" value={pricing.platform_fee} onChange={(e) => setPricing({ ...pricing, platform_fee: e.target.value })}
                    className={ic} placeholder="0" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 mb-1">Discount %</label>
                  <input type="number" value={pricing.discount_pct} onChange={(e) => setPricing({ ...pricing, discount_pct: e.target.value })}
                    className={ic} placeholder="0" min="0" max="100" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 mb-1">Admin Notes</label>
                  <textarea value={pricing.admin_notes} onChange={(e) => setPricing({ ...pricing, admin_notes: e.target.value })}
                    className={`${ic} resize-none`} rows={3} placeholder="Internal notes about pricing…" />
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" checked={pricing.is_featured} onChange={(e) => setPricing({ ...pricing, is_featured: e.target.checked })}
                    className="rounded border-gray-300 cursor-pointer" id="featured" />
                  <label htmlFor="featured" className="text-xs font-semibold text-gray-700 cursor-pointer">Featured Product</label>
                </div>
                <button onClick={handleSavePricing} disabled={saving}
                  className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-violet-500 text-white text-sm font-bold rounded-xl hover:bg-violet-600 disabled:opacity-50 cursor-pointer transition-colors">
                  {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} Save Pricing
                </button>
              </div>
            )}
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h2 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2"><BarChart3 size={16} className="text-violet-500" /> Summary</h2>
            <div className="space-y-2">
              {[
                { l: 'Status', v: product.status, c: product.status === 'approved' ? 'text-green-600' : product.status === 'rejected' ? 'text-red-600' : 'text-amber-600' },
                { l: 'In Stock', v: product.inStock ? 'Yes' : 'No', c: product.inStock ? 'text-green-600' : 'text-red-600' },
                { l: 'Stock Qty', v: product.stock },
                { l: 'Approved At', v: product.admin_approved_at ? new Date(product.admin_approved_at).toLocaleDateString() : 'N/A' },
              ].map((r) => (
                <div key={r.l} className="flex justify-between items-center py-1.5">
                  <span className="text-xs text-gray-500">{r.l}</span>
                  <span className={`text-xs font-semibold ${r.c || 'text-gray-800'}`}>{r.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Approve Modal */}
      <ConfirmModal isOpen={showApprove} onClose={() => setShowApprove(false)} onConfirm={handleApprove}
        title="Approve Product" message={`Approve "${product.name}"? It will become visible to buyers immediately.`}
        confirmText="Approve" />

      {/* Reject Modal */}
      <AnimatePresence>
        {showReject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/40" onClick={() => setShowReject(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white rounded-2xl border border-gray-200 shadow-xl max-w-md w-full p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Reject Product</h3>
              <p className="text-sm text-gray-500 mb-3">Provide a reason for rejecting this product. The supplier will see this.</p>
              <textarea value={rejectReason} onChange={(e) => setRejectReason(e.target.value)}
                className={`${ic} resize-none`} rows={4} placeholder="Reason for rejection…" />
              <div className="flex gap-3 justify-end mt-4">
                <button onClick={() => setShowReject(false)} className="px-4 py-2 text-sm font-semibold text-gray-500 hover:text-gray-700 cursor-pointer">Cancel</button>
                <button onClick={handleReject} disabled={saving}
                  className="flex items-center gap-1.5 px-4 py-2 bg-red-500 text-white text-sm font-bold rounded-xl hover:bg-red-600 disabled:opacity-50 cursor-pointer">
                  {saving ? <Loader2 size={14} className="animate-spin" /> : <XCircle size={14} />} Reject
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminProductDetailPage;
