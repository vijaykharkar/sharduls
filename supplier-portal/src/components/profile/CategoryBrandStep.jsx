import React, { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { useSupplier } from '../../context/SupplierContext';
import { useToast } from '../../context/ToastContext';
import Badge from '../ui/Badge';
import FileUpload from '../ui/FileUpload';
import ConfirmModal from '../ui/ConfirmModal';

const CATEGORIES = ['Precision Parts', 'Industrial Tools', 'Fasteners', 'Bearings', 'Custom Engineering', 'Automotive', 'Electronics'];
const NATURES = ['Manufacturer', 'Distributor', 'Retailer', 'Authorized Dealer'];

const CategoryBrandStep = ({ onNext, onPrev }) => {
  const { categoryBrand, saveCategoryBrand } = useSupplier();
  const { addToast } = useToast();
  const [categories, setCategories] = useState(categoryBrand?.categories || []);
  const [brands, setBrands] = useState(categoryBrand?.brands || []);
  const [brandRows, setBrandRows] = useState(categoryBrand?.brandRows || []);
  const [catInput, setCatInput] = useState('');
  const [brandInput, setBrandInput] = useState('');
  const [deleteIdx, setDeleteIdx] = useState(null);

  const addCategory = (c) => { if (c && !categories.includes(c)) setCategories([...categories, c]); setCatInput(''); };
  const removeCategory = (c) => setCategories(categories.filter((x) => x !== c));
  const addBrand = (b) => { if (b && !brands.includes(b)) setBrands([...brands, b]); setBrandInput(''); };
  const removeBrand = (b) => setBrands(brands.filter((x) => x !== b));

  const addBrandRow = () => setBrandRows([...brandRows, { id: Date.now(), name: '', nature: '', cert: null, date: '', status: 'Pending' }]);
  const updateRow = (i, k, v) => setBrandRows(brandRows.map((r, idx) => idx === i ? { ...r, [k]: v } : r));
  const removeRow = (i) => { setBrandRows(brandRows.filter((_, idx) => idx !== i)); setDeleteIdx(null); };

  const handleSave = () => {
    if (categories.length === 0) { addToast('Select at least one category', 'warning'); return; }
    saveCategoryBrand({ categories, brands, brandRows });
    addToast('Category & Brand saved!', 'success');
    onNext();
  };

  return (
    <div className="space-y-6">
      {/* Categories */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-800 mb-1">Category Selection</h2>
        <p className="text-xs text-gray-500 mb-4">Select the categories you sell in</p>
        <div className="flex flex-wrap gap-2 mb-3">
          {categories.map((c) => (
            <span key={c} className="flex items-center gap-1.5 px-3 py-1.5 bg-accent/10 text-accent text-xs font-semibold rounded-full border border-accent/20">
              {c} <button onClick={() => removeCategory(c)} className="cursor-pointer hover:text-red-500"><X size={12} /></button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <select value={catInput} onChange={(e) => { addCategory(e.target.value); e.target.value = ''; }} className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-400 bg-white text-gray-800">
            <option value="">Select category…</option>
            {CATEGORIES.filter((c) => !categories.includes(c)).map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {/* Brands */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <h2 className="text-sm font-bold text-gray-800 mb-1">Brands</h2>
        <p className="text-[10px] text-gray-500 mb-4">Brands Require Authorized Letter</p>
        <div className="flex flex-wrap gap-2 mb-3">
          {brands.map((b) => (
            <span key={b} className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary text-xs font-semibold rounded-full border border-primary/20">
              {b} <button onClick={() => removeBrand(b)} className="cursor-pointer hover:text-red-500"><X size={12} /></button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input value={brandInput} onChange={(e) => setBrandInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (addBrand(brandInput), e.preventDefault())} className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-400 bg-white text-gray-800 placeholder-gray-400" placeholder="Type brand name…" />
          <button onClick={() => addBrand(brandInput)} className="px-4 py-2.5 chrome-gradient text-background text-xs font-bold rounded-xl cursor-pointer hover:shadow-chrome"><Plus size={14} /></button>
        </div>
      </div>

      {/* Brand Details Table */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-gray-800">Brand Details</h3>
          <button onClick={addBrandRow} className="flex items-center gap-1.5 px-3 py-1.5 chrome-gradient text-background text-xs font-bold rounded-lg cursor-pointer hover:shadow-chrome"><Plus size={14} /> Add New Brand</button>
        </div>
        {brandRows.length === 0 ? (
          <div className="text-center py-10 text-muted"><p className="text-3xl mb-2">🏷️</p><p className="text-xs">No brands added yet</p></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="bg-gray-50">
                <th className="text-left px-3 py-2 text-[10px] font-bold text-muted uppercase">Brand Name</th>
                <th className="text-left px-3 py-2 text-[10px] font-bold text-muted uppercase">Nature</th>
                <th className="text-left px-3 py-2 text-[10px] font-bold text-muted uppercase">Certificate</th>
                <th className="text-left px-3 py-2 text-[10px] font-bold text-muted uppercase">Date</th>
                <th className="text-left px-3 py-2 text-[10px] font-bold text-muted uppercase">Status</th>
                <th className="text-left px-3 py-2 text-[10px] font-bold text-muted uppercase">Action</th>
              </tr></thead>
              <tbody>
                {brandRows.map((r, i) => (
                  <tr key={r.id} className="border-b border-border">
                    <td className="px-3 py-2"><input value={r.name} onChange={(e) => updateRow(i, 'name', e.target.value)} className="px-2 py-1 border border-gray-200 rounded-lg text-xs w-full bg-white text-gray-800" placeholder="Brand" /></td>
                    <td className="px-3 py-2"><select value={r.nature} onChange={(e) => updateRow(i, 'nature', e.target.value)} className="px-2 py-1 border border-gray-200 rounded-lg text-xs bg-white text-gray-800"><option value="">Select</option>{NATURES.map((n) => <option key={n}>{n}</option>)}</select></td>
                    <td className="px-3 py-2"><FileUpload value={r.cert} onChange={(f) => updateRow(i, 'cert', f)} /></td>
                    <td className="px-3 py-2"><input type="date" value={r.date} onChange={(e) => updateRow(i, 'date', e.target.value)} className="px-2 py-1 border border-gray-200 rounded-lg text-xs bg-white text-gray-800" /></td>
                    <td className="px-3 py-2"><Badge status={r.status}>{r.status}</Badge></td>
                    <td className="px-3 py-2"><button onClick={() => setDeleteIdx(i)} className="text-red-400 hover:text-red-600 cursor-pointer"><Trash2 size={14} /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="flex justify-between">
        <button onClick={onPrev} className="px-6 py-2.5 border-2 border-border text-muted font-semibold rounded-xl hover:border-primary cursor-pointer transition-colors">Back</button>
        <button onClick={handleSave} className="px-6 py-2.5 chrome-gradient text-background font-bold rounded-xl hover:shadow-chrome transition-shadow cursor-pointer">Save & Continue</button>
      </div>
      <ConfirmModal isOpen={deleteIdx !== null} onClose={() => setDeleteIdx(null)} onConfirm={() => removeRow(deleteIdx)} title="Delete Brand" message="Remove this brand row?" confirmText="Delete" danger />
    </div>
  );
};

export default CategoryBrandStep;
