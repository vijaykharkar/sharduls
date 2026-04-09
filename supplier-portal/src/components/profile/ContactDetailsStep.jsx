import React, { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { useSupplier } from '../../context/SupplierContext';
import { useToast } from '../../context/ToastContext';
import ConfirmModal from '../ui/ConfirmModal';

const pickupTimes = ['9AM-12PM', '12PM-3PM', '3PM-6PM', '6PM-9PM'];

const ContactDetailsStep = ({ onNext, onPrev }) => {
  const { contactDetails, saveContactDetails } = useSupplier();
  const { addToast } = useToast();
  const [form, setForm] = useState(contactDetails?.primary || { name: '', phone: '', email: '', altEmail: '', pickupTime: '9AM-12PM' });
  const [others, setOthers] = useState(contactDetails?.others || []);
  const [newRow, setNewRow] = useState(null);
  const [errors, setErrors] = useState({});
  const [deleteIdx, setDeleteIdx] = useState(null);

  const up = (k, v) => setForm((p) => ({ ...p, [k]: v }));
  const inputClass = 'w-full px-4 py-2.5 border border-border rounded-xl text-sm outline-none focus:ring-1 focus:ring-primary bg-[#0A0D14] text-highlight placeholder-muted transition-all';

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Required';
    if (!/^\d{10}$/.test(form.phone)) e.phone = '10 digits required';
    if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    saveContactDetails({ primary: form, others });
    addToast('Contact details saved!', 'success');
    onNext();
  };

  const addOther = () => {
    if (!newRow?.name || !newRow?.phone || !newRow?.email) { addToast('Fill all fields', 'warning'); return; }
    setOthers([...others, { ...newRow, id: Date.now() }]);
    setNewRow(null);
  };

  const removeOther = (idx) => { setOthers(others.filter((_, i) => i !== idx)); setDeleteIdx(null); };

  return (
    <div className="space-y-6">
      <div className="bg-surface rounded-2xl border border-border p-6">
        <h2 className="text-lg font-bold text-highlight mb-1">Primary Contact Details</h2>
        <p className="text-xs text-muted mb-5">Your main contact information</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-highlight mb-1">Contact Name *</label>
            <input value={form.name} onChange={(e) => up('name', e.target.value)} className={inputClass} placeholder="Full name" />
            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-xs font-semibold text-highlight mb-1">Phone Number *</label>
            <input value={form.phone} onChange={(e) => up('phone', e.target.value.replace(/\D/g, '').slice(0, 10))} className={inputClass} placeholder="10 digit number" />
            {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
          </div>
          <div>
            <label className="block text-xs font-semibold text-highlight mb-1">Email *</label>
            <input type="email" value={form.email} onChange={(e) => up('email', e.target.value)} className={inputClass} placeholder="email@company.com" />
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-xs font-semibold text-highlight mb-1">Alternate Email</label>
            <input type="email" value={form.altEmail} onChange={(e) => up('altEmail', e.target.value)} className={inputClass} placeholder="Optional" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-highlight mb-1">Pickup Time</label>
            <select value={form.pickupTime} onChange={(e) => up('pickupTime', e.target.value)} className={inputClass}>
              {pickupTimes.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="bg-surface rounded-2xl border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-highlight">Other Contact Details</h3>
            <p className="text-[10px] text-muted">Share details of members who manage orders</p>
          </div>
          <button onClick={() => setNewRow({ name: '', phone: '', email: '', location: '' })} className="flex items-center gap-1.5 px-3 py-1.5 chrome-gradient text-background text-xs font-bold rounded-lg cursor-pointer hover:shadow-chrome transition-colors">
            <Plus size={14} /> Add New
          </button>
        </div>

        {others.length === 0 && !newRow ? (
          <div className="text-center py-10 text-muted">
            <p className="text-3xl mb-2">👥</p>
            <p className="text-xs">No other contacts added yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="bg-[#0A0D14]">
                <th className="text-left px-4 py-2 text-[10px] font-bold text-muted uppercase">Name</th>
                <th className="text-left px-4 py-2 text-[10px] font-bold text-muted uppercase">Phone</th>
                <th className="text-left px-4 py-2 text-[10px] font-bold text-muted uppercase">Email</th>
                <th className="text-left px-4 py-2 text-[10px] font-bold text-muted uppercase">Location</th>
                <th className="text-left px-4 py-2 text-[10px] font-bold text-muted uppercase">Action</th>
              </tr></thead>
              <tbody>
                {others.map((c, i) => (
                  <tr key={c.id || i} className="border-b border-border text-muted">
                    <td className="px-4 py-2.5">{c.name}</td>
                    <td className="px-4 py-2.5">{c.phone}</td>
                    <td className="px-4 py-2.5">{c.email}</td>
                    <td className="px-4 py-2.5">{c.location}</td>
                    <td className="px-4 py-2.5"><button onClick={() => setDeleteIdx(i)} className="text-red-400 hover:text-red-600 cursor-pointer"><Trash2 size={14} /></button></td>
                  </tr>
                ))}
                {newRow && (
                  <tr className="border-b border-border bg-primary/5">
                    <td className="px-2 py-2"><input value={newRow.name} onChange={(e) => setNewRow({ ...newRow, name: e.target.value })} className="w-full px-2 py-1.5 border border-border rounded-lg text-xs bg-[#0A0D14] text-highlight" placeholder="Name" /></td>
                    <td className="px-2 py-2"><input value={newRow.phone} onChange={(e) => setNewRow({ ...newRow, phone: e.target.value })} className="w-full px-2 py-1.5 border border-border rounded-lg text-xs bg-[#0A0D14] text-highlight" placeholder="Phone" /></td>
                    <td className="px-2 py-2"><input value={newRow.email} onChange={(e) => setNewRow({ ...newRow, email: e.target.value })} className="w-full px-2 py-1.5 border border-border rounded-lg text-xs bg-[#0A0D14] text-highlight" placeholder="Email" /></td>
                    <td className="px-2 py-2"><input value={newRow.location} onChange={(e) => setNewRow({ ...newRow, location: e.target.value })} className="w-full px-2 py-1.5 border border-border rounded-lg text-xs bg-[#0A0D14] text-highlight" placeholder="Location" /></td>
                    <td className="px-2 py-2 flex gap-1">
                      <button onClick={addOther} className="px-2 py-1 bg-green-500 text-white text-[10px] rounded-lg cursor-pointer">Save</button>
                      <button onClick={() => setNewRow(null)} className="px-2 py-1 bg-border text-muted text-[10px] rounded-lg cursor-pointer">Cancel</button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="flex justify-between">
        <button onClick={onPrev} className="px-6 py-2.5 border-2 border-border text-muted font-semibold rounded-xl hover:border-primary cursor-pointer transition-colors">Back</button>
        <button onClick={handleSave} className="px-6 py-2.5 chrome-gradient text-background font-bold rounded-xl hover:shadow-chrome transition-shadow cursor-pointer">Save & Continue</button>
      </div>

      <ConfirmModal isOpen={deleteIdx !== null} onClose={() => setDeleteIdx(null)} onConfirm={() => removeOther(deleteIdx)} title="Delete Contact" message="Remove this contact?" confirmText="Delete" danger />
    </div>
  );
};

export default ContactDetailsStep;
