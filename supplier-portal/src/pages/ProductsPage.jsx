import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, X, Loader2, Upload, Package, ImagePlus, AlertCircle } from 'lucide-react';
import Badge from '../components/ui/Badge';
import Skeleton from '../components/ui/Skeleton';
import ConfirmModal from '../components/ui/ConfirmModal';
import { useToast } from '../context/ToastContext';
import { formatPrice } from '../utils/helpers';
import supplierService from '../api/supplierService';

const STATUS_CONFIG = {
  pending:  { label: 'Pending Review', cls: 'bg-amber-100 text-amber-700' },
  approved: { label: 'Approved',       cls: 'bg-green-100 text-green-700' },
  rejected: { label: 'Rejected',       cls: 'bg-red-100 text-red-600'    },
  draft:    { label: 'Draft',          cls: 'bg-gray-100 text-gray-500'  },
  inactive: { label: 'Inactive',       cls: 'bg-gray-100 text-gray-400'  },
};

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  // image state: existing URLs + new File objects with previews
  const [imageItems, setImageItems] = useState([]); // [{type:'url',url:string} | {type:'file',file:File,preview:string}]
  const [uploadingImages, setUploadingImages] = useState(false);
  const { addToast } = useToast();

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await supplierService.getMyProducts();
      setProducts(res.data?.items || res.data || []);
    } catch {
      addToast('Failed to load products', 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      const res = await supplierService.getProductCategories();
      setCategories(res.data || []);
    } catch { /* silently ignore */ }
  }, []);

  useEffect(() => { fetchProducts(); fetchCategories(); }, []);

  const emptyProduct = { name: '', category: '', description: '', brand: '', sku: '', price: '', mrp: '', stock: '' };

  const openAdd = () => {
    setEditProduct({ ...emptyProduct });
    setImageItems([]);
    setModalOpen(true);
  };
  const openEdit = (p) => {
    setEditProduct({
      id: p.id, name: p.name || '', category: p.category || '',
      description: p.description || '', brand: p.brand || '',
      sku: p.sku || '', price: p.supplier_price ?? p.price ?? '',
      mrp: p.mrp ?? '', stock: p.stock ?? '',
    });
    const existing = (p.images || []).map((url) => ({ type: 'url', url }));
    setImageItems(existing);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setEditProduct(null);
    imageItems.filter((i) => i.type === 'file').forEach((i) => URL.revokeObjectURL(i.preview));
    setImageItems([]);
  };

  const handleFilePick = (e) => {
    const files = Array.from(e.target.files || []);
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/bmp'];
    const valid = files.filter((f) => allowed.includes(f.type));
    if (valid.length !== files.length) addToast('Only image files are allowed (jpg, png, webp)', 'warning');
    const newItems = valid.map((file) => ({ type: 'file', file, preview: URL.createObjectURL(file) }));
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
    if (!editProduct.name || !editProduct.category || !editProduct.price) {
      addToast('Name, category and price are required', 'warning'); return;
    }
    setSaving(true);
    try {
      // 1. Upload any new file images first
      const newFiles = imageItems.filter((i) => i.type === 'file').map((i) => i.file);
      let uploadedUrls = [];
      if (newFiles.length > 0) {
        setUploadingImages(true);
        const res = await supplierService.uploadProductImages(newFiles);
        uploadedUrls = res.data || [];
        setUploadingImages(false);
      }
      // 2. Combine existing URL images + newly uploaded URLs
      const existingUrls = imageItems.filter((i) => i.type === 'url').map((i) => i.url);
      const allImages = [...existingUrls, ...uploadedUrls];

      const payload = {
        name: editProduct.name,
        category: editProduct.category,
        description: editProduct.description || '',
        brand: editProduct.brand || '',
        sku: editProduct.sku || '',
        price: parseFloat(editProduct.price),
        mrp: editProduct.mrp ? parseFloat(editProduct.mrp) : null,
        stock: parseInt(editProduct.stock || 0, 10),
        images: allImages,
      };
      if (editProduct.id) {
        await supplierService.updateProduct(editProduct.id, payload);
        addToast('Product updated!', 'success');
      } else {
        await supplierService.createProduct(payload);
        addToast('Product added — pending admin review', 'success');
      }
      closeModal();
      fetchProducts();
    } catch (err) {
      setUploadingImages(false);
      addToast(err?.response?.data?.detail || 'Failed to save product', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await supplierService.deleteProduct(deleteId);
      setDeleteId(null);
      addToast('Product deleted', 'info');
      fetchProducts();
    } catch {
      addToast('Failed to delete product', 'error');
      setDeleteId(null);
    }
  };

  const ic = 'w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:ring-1 focus:ring-primary bg-white text-gray-800 placeholder-gray-400 transition-all';

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-highlight">My Products</h1>
        <button onClick={openAdd} className="flex items-center gap-1.5 px-4 py-2.5 chrome-gradient text-background text-sm font-bold rounded-xl hover:shadow-chrome cursor-pointer transition-shadow">
          <Plus size={16} /> Add Product
        </button>
      </div>

      <div className="bg-surface rounded-2xl border border-border overflow-hidden">
        {loading ? (
          <div className="p-5 space-y-3">{Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-14 w-full" />)}</div>
        ) : products.length === 0 ? (
          <div className="text-center py-16 text-muted">
            <Package size={40} className="mx-auto mb-3 opacity-30" />
            <p className="text-sm font-semibold">No products yet</p>
            <p className="text-xs mt-1 opacity-60">Add your first product — it will be reviewed by the admin before going live.</p>
            <button onClick={openAdd} className="mt-4 px-4 py-2 chrome-gradient text-background text-xs font-bold rounded-xl cursor-pointer">Add First Product</button>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left px-5 py-3 text-[10px] font-bold text-muted uppercase tracking-wider">Product</th>
                    <th className="text-left px-5 py-3 text-[10px] font-bold text-muted uppercase tracking-wider">Category</th>
                    <th className="text-left px-5 py-3 text-[10px] font-bold text-muted uppercase tracking-wider">Price</th>
                    <th className="text-left px-5 py-3 text-[10px] font-bold text-muted uppercase tracking-wider">Stock</th>
                    <th className="text-left px-5 py-3 text-[10px] font-bold text-muted uppercase tracking-wider">Status</th>
                    <th className="text-left px-5 py-3 text-[10px] font-bold text-muted uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => {
                    const sc = STATUS_CONFIG[p.status] || STATUS_CONFIG.draft;
                    const img = (p.images || [])[0] || `https://picsum.photos/80/80?random=${p.id}`;
                    return (
                      <tr key={p.id} className="border-b border-border last:border-0 hover:bg-white/[0.02] transition-colors">
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-3">
                            <img src={img} alt="" className="w-10 h-10 rounded-lg object-cover border border-border" />
                            <div>
                              <p className="font-semibold text-highlight leading-tight">{p.name}</p>
                              {p.sku && <p className="text-[10px] text-muted">SKU: {p.sku}</p>}
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-3 text-muted">{p.category}</td>
                        <td className="px-5 py-3 font-semibold text-highlight">{formatPrice(p.supplier_price ?? p.price)}</td>
                        <td className="px-5 py-3 text-muted">{p.stock}</td>
                        <td className="px-5 py-3">
                          <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${sc.cls}`}>{sc.label}</span>
                        </td>
                        <td className="px-5 py-3">
                          <div className="flex gap-2">
                            <button onClick={() => openEdit(p)} className="text-muted hover:text-primary cursor-pointer transition-colors"><Edit2 size={15} /></button>
                            <button onClick={() => setDeleteId(p.id)} className="text-muted hover:text-red-400 cursor-pointer transition-colors"><Trash2 size={15} /></button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {/* Mobile cards */}
            <div className="md:hidden space-y-3 p-4">
              {products.map((p) => {
                const sc = STATUS_CONFIG[p.status] || STATUS_CONFIG.draft;
                const img = (p.images || [])[0] || `https://picsum.photos/80/80?random=${p.id}`;
                return (
                  <div key={p.id} className="border border-border rounded-xl p-4 bg-white/[0.03]">
                    <div className="flex items-center gap-3 mb-2">
                      <img src={img} alt="" className="w-12 h-12 rounded-lg object-cover border border-border" />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-highlight text-sm truncate">{p.name}</p>
                        <p className="text-[10px] text-muted">{p.category}</p>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${sc.cls}`}>{sc.label}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-highlight">{formatPrice(p.supplier_price ?? p.price)}</span>
                      <div className="flex gap-2">
                        <button onClick={() => openEdit(p)} className="text-muted hover:text-primary cursor-pointer"><Edit2 size={15} /></button>
                        <button onClick={() => setDeleteId(p.id)} className="text-muted hover:text-red-400 cursor-pointer"><Trash2 size={15} /></button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {modalOpen && editProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/50" onClick={closeModal} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
              <button onClick={closeModal} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 cursor-pointer"><X size={18} /></button>
              <h3 className="text-lg font-bold text-gray-800 mb-1">{editProduct.id ? 'Edit Product' : 'Add New Product'}</h3>
              <p className="text-xs text-gray-400 mb-4">{editProduct.id ? 'Update product details.' : 'Your product will be reviewed by admin before going live.'}</p>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Product Name *</label>
                  <input value={editProduct.name} onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })} className={ic} placeholder="e.g. Mandala Gold Classic" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Category *</label>
                    <select value={editProduct.category} onChange={(e) => setEditProduct({ ...editProduct, category: e.target.value })} className={ic}>
                      <option value="">Select…</option>
                      {categories.length > 0
                        ? categories.map((c) => <option key={c}>{c}</option>)
                        : ['Mandala Art', 'Lippan Art', 'Custom Art', 'Frames', 'Wall Decor', 'Handcraft', 'Jewellery'].map((c) => <option key={c}>{c}</option>)
                      }
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Brand</label>
                    <input value={editProduct.brand} onChange={(e) => setEditProduct({ ...editProduct, brand: e.target.value })} className={ic} placeholder="Brand name" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Description</label>
                  <textarea value={editProduct.description} onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })} className={`${ic} resize-none`} rows={3} placeholder="Describe your product…" />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Price (₹) *</label>
                    <input type="number" value={editProduct.price} onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })} className={ic} placeholder="0" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">MRP (₹)</label>
                    <input type="number" value={editProduct.mrp} onChange={(e) => setEditProduct({ ...editProduct, mrp: e.target.value })} className={ic} placeholder="0" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Stock Qty</label>
                    <input type="number" value={editProduct.stock} onChange={(e) => setEditProduct({ ...editProduct, stock: e.target.value })} className={ic} placeholder="0" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">SKU</label>
                  <input value={editProduct.sku} onChange={(e) => setEditProduct({ ...editProduct, sku: e.target.value })} className={ic} placeholder="Optional stock-keeping unit" />
                </div>

                {/* ── Image Upload ── */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-2">Product Images</label>

                  {/* Previews grid */}
                  {imageItems.length > 0 && (
                    <div className="grid grid-cols-4 gap-2 mb-3">
                      {imageItems.map((item, idx) => (
                        <div key={idx} className="relative group aspect-square">
                          <img
                            src={item.type === 'url' ? item.url : item.preview}
                            alt=""
                            className="w-full h-full object-cover rounded-xl border border-gray-200"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(idx)}
                            className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow"
                          >
                            <X size={11} />
                          </button>
                          {item.type === 'file' && (
                            <div className="absolute bottom-0 left-0 right-0 bg-amber-500/80 text-white text-[8px] font-bold text-center py-0.5 rounded-b-xl">New</div>
                          )}
                        </div>
                      ))}
                      {/* Add more button */}
                      <label className="aspect-square border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 hover:bg-gray-50 transition-colors">
                        <ImagePlus size={16} className="text-gray-300" />
                        <span className="text-[9px] text-gray-400 mt-1">Add</span>
                        <input type="file" multiple accept="image/jpeg,image/png,image/webp,image/gif,image/bmp" className="hidden" onChange={handleFilePick} />
                      </label>
                    </div>
                  )}

                  {/* Drop zone (shown when no images) */}
                  {imageItems.length === 0 && (
                    <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl p-6 cursor-pointer hover:border-primary/50 hover:bg-gray-50 transition-colors">
                      <Upload size={24} className="text-gray-300 mb-2" />
                      <p className="text-xs font-semibold text-gray-500">Click to upload images</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">JPG, PNG, WEBP up to 10 MB each · Multiple allowed</p>
                      <input type="file" multiple accept="image/jpeg,image/png,image/webp,image/gif,image/bmp" className="hidden" onChange={handleFilePick} />
                    </label>
                  )}

                  {imageItems.filter((i) => i.type === 'file').length > 0 && (
                    <p className="text-[10px] text-amber-600 flex items-center gap-1 mt-1.5">
                      <AlertCircle size={11} /> {imageItems.filter((i) => i.type === 'file').length} new image(s) will be uploaded when you save
                    </p>
                  )}
                </div>

                <div className="pt-2">
                  <button onClick={handleSave} disabled={saving}
                    className="w-full flex items-center justify-center gap-2 py-2.5 chrome-gradient text-background font-bold rounded-xl hover:shadow-chrome cursor-pointer transition-shadow disabled:opacity-60">
                    {saving ? <Loader2 size={15} className="animate-spin" /> : null}
                    {saving && uploadingImages ? 'Uploading images…' : saving ? 'Saving…' : editProduct.id ? 'Update Product' : 'Submit for Review'}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <ConfirmModal
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Product"
        message="This product will be permanently deleted and cannot be recovered."
        confirmText="Delete"
        danger
      />
    </div>
  );
};

export default ProductsPage;
