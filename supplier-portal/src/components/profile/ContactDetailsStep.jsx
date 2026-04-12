import React, { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { useSupplier } from '../../context/SupplierContext';
import { useToast } from '../../context/ToastContext';
import profileService from '../../api/profileService';
import ConfirmModal from '../ui/ConfirmModal';

const pickupTimes = ['9AM-12PM', '12PM-3PM', '3PM-6PM', '6PM-9PM'];

const ContactDetailsStep = ({ onNext, onPrev }) => {
  const { contactDetails, saveContactDetails, seedFromApi } = useSupplier();
  const { addToast } = useToast();
  const [form, setForm] = useState(contactDetails?.primary || { name: '', phone: '', email: '', altEmail: '', pickupTime: '9AM-12PM' });
  const [others, setOthers] = useState(contactDetails?.others || []);
  const [newRow, setNewRow] = useState(null);
  const [errors, setErrors] = useState({});
  const [deleteIdx, setDeleteIdx] = useState(null);

  const up = (k, v) => setForm((p) => ({ ...p, [k]: v }));
  const inputClass = 'w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-400 bg-white text-gray-800 placeholder-gray-400 transition-all';

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Required';
    if (!/^\d{10}$/.test(form.phone)) e.phone = '10 digits required';
    if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!validate()) return;
    setSaving(true);
    try {
      const res = await profileService.saveContactDetails({
        primary: {
          contact_name: form.name,
          phone: form.phone,
          email: form.email,
          alt_email: form.altEmail || null,
          pickup_time: form.pickupTime,
        },
        others: others.map((o) => ({
          contact_name: o.name,
          phone: o.phone,
          email: o.email,
          location: o.location || null,
        })),
      });
      seedFromApi(res?.data);
      saveContactDetails({ primary: form, others });
      addToast('Contact details saved!', 'success');
      onNext();
    } catch (err) {
      addToast(err?.response?.data?.message || 'Failed to save', 'error');
    } finally { setSaving(false); }
  };

  const addOther = () => {
    if (!newRow?.name || !newRow?.phone || !newRow?.email) { addToast('Fill all fields', 'warning'); return; }
    setOthers([...others, { ...newRow, id: Date.now() }]);
    setNewRow(null);
  };

  const removeOther = (idx) => { setOthers(others.filter((_, i) => i !== idx)); setDeleteIdx(null); };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-800 mb-1">Primary Contact Details</h2>
        <p className="text-xs text-gray-500 mb-5">Your main contact information</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Contact Name *</label>
            <input value={form.name} onChange={(e) => up('name', e.target.value)} className={inputClass} placeholder="Full name" />
            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Phone Number *</label>
            <input value={form.phone} onChange={(e) => up('phone', e.target.value.replace(/\D/g, '').slice(0, 10))} className={inputClass} placeholder="10 digit number" />
            {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Email *</label>
            <input type="email" value={form.email} onChange={(e) => up('email', e.target.value)} className={inputClass} placeholder="email@company.com" />
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Alternate Email</label>
            <input type="email" value={form.altEmail} onChange={(e) => up('altEmail', e.target.value)} className={inputClass} placeholder="Optional" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Pickup Time</label>
            <select value={form.pickupTime} onChange={(e) => up('pickupTime', e.target.value)} className={inputClass}>
              {pickupTimes.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-gray-800">Other Contact Details</h3>
            <p className="text-[10px] text-gray-500">Share details of members who manage orders</p>
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
              <thead><tr className="bg-gray-50">
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
                    <td className="px-2 py-2"><input value={newRow.name} onChange={(e) => setNewRow({ ...newRow, name: e.target.value })} className="w-full px-2 py-1.5 border border-gray-200 rounded-lg text-xs bg-white text-gray-800" placeholder="Name" /></td>
                    <td className="px-2 py-2"><input value={newRow.phone} onChange={(e) => setNewRow({ ...newRow, phone: e.target.value })} className="w-full px-2 py-1.5 border border-gray-200 rounded-lg text-xs bg-white text-gray-800" placeholder="Phone" /></td>
                    <td className="px-2 py-2"><input value={newRow.email} onChange={(e) => setNewRow({ ...newRow, email: e.target.value })} className="w-full px-2 py-1.5 border border-gray-200 rounded-lg text-xs bg-white text-gray-800" placeholder="Email" /></td>
                    <td className="px-2 py-2"><input value={newRow.location} onChange={(e) => setNewRow({ ...newRow, location: e.target.value })} className="w-full px-2 py-1.5 border border-gray-200 rounded-lg text-xs bg-white text-gray-800" placeholder="Location" /></td>
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
