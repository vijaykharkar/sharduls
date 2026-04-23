import React, { useState } from 'react';
import { X, Save } from 'lucide-react';

const ic = 'w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 outline-none focus:ring-2 focus:ring-[#d4a853]/20 focus:border-[#d4a853] placeholder-gray-400 bg-white';

const empty = { label: '', address_line1: '', address_line2: '', city: '', state: '', pincode: '', phone: '' };

export default function AddressForm({ initial = null, onSave, onCancel }) {
  const [form, setForm] = useState(initial || { ...empty });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form onSubmit={submit} className="bg-white rounded-2xl border border-gray-200 shadow-card p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-gray-800">{initial ? 'Edit Address' : 'Add New Address'}</h3>
        {onCancel && <button type="button" onClick={onCancel} className="text-gray-400 hover:text-gray-600 cursor-pointer"><X size={18} /></button>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input value={form.label} onChange={set('label')} placeholder="Label (Home, Office…)" className={ic} required />
        <input value={form.phone} onChange={set('phone')} placeholder="Phone" className={ic} required />
      </div>
      <input value={form.address_line1} onChange={set('address_line1')} placeholder="Address Line 1" className={ic} required />
      <input value={form.address_line2} onChange={set('address_line2')} placeholder="Address Line 2 (optional)" className={ic} />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <input value={form.city} onChange={set('city')} placeholder="City" className={ic} required />
        <input value={form.state} onChange={set('state')} placeholder="State" className={ic} required />
        <input value={form.pincode} onChange={set('pincode')} placeholder="Pincode" className={ic} required />
      </div>

      <div className="flex gap-2">
        <button type="submit" className="flex items-center gap-1.5 px-5 py-2.5 bg-[#0a1929] text-white rounded-xl text-sm font-semibold hover:bg-[#102a43] transition-colors cursor-pointer">
          <Save size={14} /> {initial ? 'Update' : 'Save Address'}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="px-5 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer">Cancel</button>
        )}
      </div>
    </form>
  );
}
