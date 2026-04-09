import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, X, Loader2, Upload } from 'lucide-react';
import mockProducts from '../data/mockProducts';
import Badge from '../components/ui/Badge';
import Skeleton from '../components/ui/Skeleton';
import ConfirmModal from '../components/ui/ConfirmModal';
import { useToast } from '../context/ToastContext';
import { formatPrice } from '../utils/helpers';

const CATEGORIES = ['Precision Parts', 'Industrial Tools', 'Fasteners', 'Bearings', 'Custom Engineering', 'Automotive', 'Electronics'];

const ProductsPage = () => {
  const [products, setProducts] = useState(mockProducts);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const { addToast } = useToast();

  useEffect(() => { const t = setTimeout(() => setLoading(false), 700); return () => clearTimeout(t); }, []);

  const emptyProduct = { name: '', category: '', description: '', price: '', stock: '', status: 'Active', image: '' };

  const openAdd = () => { setEditProduct({ ...emptyProduct }); setModalOpen(true); };
  const openEdit = (p) => { setEditProduct({ ...p }); setModalOpen(true); };
  const closeModal = () => { setModalOpen(false); setEditProduct(null); };

  const toggleStatus = (id) => {
    setProducts(products.map((p) => p.id === id ? { ...p, status: p.status === 'Active' ? 'Inactive' : 'Active' } : p));
    addToast('Status updated', 'success');
  };

  const handleSave = () => {
    if (!editProduct.name || !editProduct.category || !editProduct.price) { addToast('Fill required fields', 'warning'); return; }
    if (editProduct.id) {
      setProducts(products.map((p) => p.id === editProduct.id ? editProduct : p));
      addToast('Product updated!', 'success');
    } else {
      setProducts([{ ...editProduct, id: Date.now(), image: `https://picsum.photos/80/80?random=${Date.now()}` }, ...products]);
      addToast('Product added!', 'success');
    }
    closeModal();
  };

  const handleDelete = () => {
    setProducts(products.filter((p) => p.id !== deleteId));
    setDeleteId(null);
    addToast('Product deleted', 'info');
  };

  const ic = 'w-full px-4 py-2.5 border border-border rounded-xl text-sm outline-none focus:ring-1 focus:ring-primary bg-[#0A0D14] text-highlight placeholder-muted transition-all';

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-highlight">Products</h1>
        <button onClick={openAdd} className="flex items-center gap-1.5 px-4 py-2.5 chrome-gradient text-background text-sm font-bold rounded-xl hover:shadow-chrome cursor-pointer transition-shadow">
          <Plus size={16} /> Add Product
        </button>
      </div>

      <div className="bg-surface rounded-2xl border border-border overflow-hidden">
        {loading ? (
          <div className="p-5 space-y-3">{Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-14 w-full" />)}</div>
        ) : products.length === 0 ? (
          <div className="text-center py-16 text-muted"><p className="text-3xl mb-2">📦</p><p className="text-sm">No products yet</p><button onClick={openAdd} className="mt-3 text-primary font-semibold text-sm cursor-pointer">Add your first product</button></div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="bg-[#0A0D14]">
                  <th className="text-left px-5 py-2.5 text-[10px] font-bold text-muted uppercase tracking-wider">Product</th>
                  <th className="text-left px-5 py-2.5 text-[10px] font-bold text-muted uppercase tracking-wider">Category</th>
                  <th className="text-left px-5 py-2.5 text-[10px] font-bold text-muted uppercase tracking-wider">Price</th>
                  <th className="text-left px-5 py-2.5 text-[10px] font-bold text-muted uppercase tracking-wider">Stock</th>
                  <th className="text-left px-5 py-2.5 text-[10px] font-bold text-muted uppercase tracking-wider">Status</th>
                  <th className="text-left px-5 py-2.5 text-[10px] font-bold text-muted uppercase tracking-wider">Action</th>
                </tr></thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id} className="border-b border-border last:border-0 hover:bg-white/[0.02] transition-colors">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <img src={p.image} alt="" className="w-10 h-10 rounded-lg object-cover border border-border" />
                          <span className="font-semibold text-highlight">{p.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-muted">{p.category}</td>
                      <td className="px-5 py-3 font-semibold text-highlight">{formatPrice(p.price)}</td>
                      <td className="px-5 py-3 text-muted">{p.stock}</td>
                      <td className="px-5 py-3">
                        <button onClick={() => toggleStatus(p.id)} className="cursor-pointer">
                          <div className={`w-10 h-5 rounded-full relative transition-colors ${p.status === 'Active' ? 'bg-green-500' : 'bg-border'}`}>
                            <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${p.status === 'Active' ? 'translate-x-5' : 'translate-x-0.5'}`} />
                          </div>
                        </button>
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex gap-2">
                          <button onClick={() => openEdit(p)} className="text-muted hover:text-primary cursor-pointer"><Edit2 size={15} /></button>
                          <button onClick={() => setDeleteId(p.id)} className="text-muted hover:text-red-400 cursor-pointer"><Trash2 size={15} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Mobile cards */}
            <div className="md:hidden space-y-3 p-4">
              {products.map((p) => (
                <div key={p.id} className="border border-border rounded-xl p-4 bg-[#0A0D14]">
                  <div className="flex items-center gap-3 mb-2">
                    <img src={p.image} alt="" className="w-12 h-12 rounded-lg object-cover border border-border" />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-highlight text-sm truncate">{p.name}</p>
                      <p className="text-[10px] text-muted">{p.category}</p>
                    </div>
                    <Badge status={p.status}>{p.status}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-highlight">{formatPrice(p.price)}</span>
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(p)} className="text-muted hover:text-primary cursor-pointer"><Edit2 size={15} /></button>
                      <button onClick={() => setDeleteId(p.id)} className="text-muted hover:text-red-400 cursor-pointer"><Trash2 size={15} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {modalOpen && editProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/50" onClick={closeModal} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative bg-surface border border-border rounded-2xl shadow-strong max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
              <button onClick={closeModal} className="absolute top-4 right-4 text-muted hover:text-highlight cursor-pointer"><X size={18} /></button>
              <h3 className="text-lg font-bold text-highlight mb-4">{editProduct.id ? 'Edit Product' : 'Add Product'}</h3>
              <div className="space-y-3">
                <div><label className="block text-xs font-semibold text-highlight mb-1">Name *</label><input value={editProduct.name} onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })} className={ic} placeholder="Product name" /></div>
                <div><label className="block text-xs font-semibold text-highlight mb-1">Category *</label>
                  <select value={editProduct.category} onChange={(e) => setEditProduct({ ...editProduct, category: e.target.value })} className={ic}>
                    <option value="">Select…</option>{CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div><label className="block text-xs font-semibold text-highlight mb-1">Description</label><textarea value={editProduct.description} onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })} className={`${ic} resize-none`} rows={3} placeholder="Product description" /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="block text-xs font-semibold text-highlight mb-1">Price (₹) *</label><input type="number" value={editProduct.price} onChange={(e) => setEditProduct({ ...editProduct, price: +e.target.value })} className={ic} placeholder="0" /></div>
                  <div><label className="block text-xs font-semibold text-highlight mb-1">Stock Qty</label><input type="number" value={editProduct.stock} onChange={(e) => setEditProduct({ ...editProduct, stock: +e.target.value })} className={ic} placeholder="0" /></div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-highlight mb-1">Images</label>
                  <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <Upload size={20} className="mx-auto text-muted mb-1" />
                    <p className="text-xs text-muted">Drop images or <span className="text-primary font-semibold">browse</span></p>
                  </div>
                </div>
                <button onClick={handleSave} className="w-full py-2.5 chrome-gradient text-background font-bold rounded-xl hover:shadow-chrome cursor-pointer transition-shadow">{editProduct.id ? 'Update Product' : 'Add Product'}</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <ConfirmModal isOpen={deleteId !== null} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete Product" message="This cannot be undone. Delete this product?" confirmText="Delete" danger />
    </div>
  );
};

export default ProductsPage;
