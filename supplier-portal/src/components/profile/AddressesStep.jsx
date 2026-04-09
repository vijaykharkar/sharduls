import React, { useState } from 'react';
import { Plus, Edit2, Trash2, MapPin, AlertTriangle } from 'lucide-react';
import { useSupplier } from '../../context/SupplierContext';
import { useToast } from '../../context/ToastContext';
import { lookupPincode, validatePincode } from '../../utils/helpers';
import ConfirmModal from '../ui/ConfirmModal';

const emptyAddr = () => ({ id: Date.now(), country: 'India', pincode: '', state: '', city: '', line1: '', line2: '', phone: '', isDefault: false });

const AddressForm = ({ addr, onChange, onSave, onCancel, errors = {} }) => {
  const up = (k, v) => {
    const next = { ...addr, [k]: v };
    if (k === 'pincode' && validatePincode(v)) { const loc = lookupPincode(v); next.state = loc.state; next.city = loc.city; }
    onChange(next);
  };
  const ic = 'w-full px-4 py-2.5 border border-border rounded-xl text-sm outline-none focus:ring-1 focus:ring-primary bg-[#0A0D14] text-highlight placeholder-muted transition-all';
  return (
    <div className="space-y-3 p-4 bg-[#0A0D14] rounded-xl border border-border">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div><label className="block text-xs font-semibold text-highlight mb-1">Country</label><select value={addr.country} onChange={(e) => up('country', e.target.value)} className={ic}><option>India</option></select></div>
        <div><label className="block text-xs font-semibold text-highlight mb-1">Pincode *</label><input value={addr.pincode} onChange={(e) => up('pincode', e.target.value.replace(/\D/g, '').slice(0, 6))} className={ic} placeholder="6 digits" />{errors.pincode && <p className="mt-1 text-xs text-red-500">{errors.pincode}</p>}</div>
        <div><label className="block text-xs font-semibold text-highlight mb-1">State</label><input value={addr.state} className={`${ic} bg-surface`} readOnly /></div>
        <div><label className="block text-xs font-semibold text-highlight mb-1">City</label><input value={addr.city} className={`${ic} bg-surface`} readOnly /></div>
        <div className="sm:col-span-2"><label className="block text-xs font-semibold text-highlight mb-1">Address Line 1 *</label><input value={addr.line1} onChange={(e) => up('line1', e.target.value)} className={ic} placeholder="Street, building" />{errors.line1 && <p className="mt-1 text-xs text-red-500">{errors.line1}</p>}</div>
        <div className="sm:col-span-2"><label className="block text-xs font-semibold text-highlight mb-1">Address Line 2</label><input value={addr.line2} onChange={(e) => up('line2', e.target.value)} className={ic} placeholder="Floor, landmark" /></div>
        <div><label className="block text-xs font-semibold text-highlight mb-1">Phone *</label><input value={addr.phone} onChange={(e) => up('phone', e.target.value.replace(/\D/g, '').slice(0, 10))} className={ic} placeholder="10 digits" />{errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}</div>
      </div>
      <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={addr.isDefault} onChange={(e) => up('isDefault', e.target.checked)} className="accent-[#E53E3E]" /><span className="text-xs text-muted">Set as default address</span></label>
      <div className="flex gap-2 justify-end"><button onClick={onCancel} className="px-4 py-2 border border-border rounded-lg text-xs font-semibold text-muted cursor-pointer hover:border-primary">Cancel</button><button onClick={onSave} className="px-4 py-2 chrome-gradient text-background rounded-lg text-xs font-bold cursor-pointer hover:shadow-chrome">Save</button></div>
    </div>
  );
};

const AddressCard = ({ addr, onEdit, onDelete, onSetDefault }) => (
  <div className={`bg-surface rounded-xl border-2 p-4 ${addr.isDefault ? 'border-accent' : 'border-border'}`}>
    <div className="flex items-start justify-between mb-2">
      <div className="flex items-center gap-2">
        <MapPin size={14} className="text-primary" />
        {addr.isDefault && <span className="text-[9px] bg-accent/10 text-accent font-bold px-2 py-0.5 rounded-full">Default</span>}
        <span className="text-[9px] bg-orange-500/10 text-orange-400 font-bold px-2 py-0.5 rounded-full flex items-center gap-1"><AlertTriangle size={8} /> Geo-Verification Pending</span>
      </div>
      <div className="flex gap-1.5">
        <button onClick={onEdit} className="text-muted hover:text-primary cursor-pointer"><Edit2 size={14} /></button>
        <button onClick={onDelete} className="text-muted hover:text-red-400 cursor-pointer"><Trash2 size={14} /></button>
      </div>
    </div>
    <p className="text-sm text-highlight">{addr.line1}{addr.line2 ? `, ${addr.line2}` : ''}</p>
    <p className="text-xs text-muted">{addr.city}, {addr.state} - {addr.pincode}</p>
    <p className="text-xs text-muted">{addr.phone}</p>
    {!addr.isDefault && <button onClick={onSetDefault} className="mt-2 text-[10px] text-primary font-semibold cursor-pointer hover:text-primary-light">Set as Default</button>}
  </div>
);

const AddressesStep = ({ onNext, onPrev }) => {
  const { addresses, saveAddresses } = useSupplier();
  const { addToast } = useToast();
  const [tab, setTab] = useState('billing');
  const [billing, setBilling] = useState(addresses?.billing || null);
  const [pickup, setPickup] = useState(addresses?.pickup || [{ id: 1, country: 'India', pincode: '302001', state: 'Rajasthan', city: 'Jaipur', line1: '15 Artisan Colony, Sanganer', line2: '', phone: '9876543210', isDefault: true }]);
  const [editing, setEditing] = useState(billing ? null : emptyAddr());
  const [editPickupIdx, setEditPickupIdx] = useState(null);
  const [newPickup, setNewPickup] = useState(null);
  const [deleteIdx, setDeleteIdx] = useState(null);
  const [errors, setErrors] = useState({});

  const validateAddr = (a) => {
    const e = {};
    if (!validatePincode(a.pincode)) e.pincode = 'Invalid';
    if (!a.line1.trim()) e.line1 = 'Required';
    if (!/^\d{10}$/.test(a.phone)) e.phone = 'Invalid';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const saveBilling = () => {
    if (!validateAddr(editing)) return;
    setBilling(editing);
    setEditing(null);
    addToast('Billing address saved', 'success');
  };

  const savePickupAddr = (addr, isNew) => {
    if (!validateAddr(addr)) return;
    if (isNew) { setPickup([...pickup, addr]); setNewPickup(null); }
    else { setPickup(pickup.map((p, i) => i === editPickupIdx ? addr : p)); setEditPickupIdx(null); }
    addToast('Pickup address saved', 'success');
  };

  const setPickupDefault = (i) => setPickup(pickup.map((p, idx) => ({ ...p, isDefault: idx === i })));
  const removePickup = (i) => { setPickup(pickup.filter((_, idx) => idx !== i)); setDeleteIdx(null); };

  const handleSave = () => {
    saveAddresses({ billing, pickup });
    addToast('Addresses saved!', 'success');
    onNext();
  };

  return (
    <div className="space-y-6">
      <div className="bg-surface rounded-2xl border border-border">
        <div className="flex border-b border-border">
          {['billing', 'pickup'].map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`flex-1 py-3 text-sm font-semibold capitalize cursor-pointer transition-colors ${tab === t ? 'text-accent border-b-2 border-accent' : 'text-muted hover:text-highlight'}`}>
              {t === 'billing' ? 'Billing Address' : 'Pickup Address'}
            </button>
          ))}
        </div>
        <div className="p-6">
          {tab === 'billing' && (
            <>
              {billing && !editing ? (
                <div><AddressCard addr={billing} onEdit={() => setEditing({ ...billing })} onDelete={() => setBilling(null)} onSetDefault={() => {}} /><button onClick={() => setEditing({ ...billing })} className="mt-3 text-xs text-primary font-semibold cursor-pointer">Edit Address</button></div>
              ) : (
                <AddressForm addr={editing || emptyAddr()} onChange={setEditing} onSave={saveBilling} onCancel={() => { if (billing) setEditing(null); }} errors={errors} />
              )}
            </>
          )}
          {tab === 'pickup' && (
            <div className="space-y-3">
              <button onClick={() => setNewPickup(emptyAddr())} className="flex items-center gap-1.5 px-3 py-1.5 chrome-gradient text-background text-xs font-bold rounded-lg cursor-pointer hover:shadow-chrome"><Plus size={14} /> Add New</button>
              {newPickup && <AddressForm addr={newPickup} onChange={setNewPickup} onSave={() => savePickupAddr(newPickup, true)} onCancel={() => setNewPickup(null)} errors={errors} />}
              {pickup.map((p, i) => (
                editPickupIdx === i
                  ? <AddressForm key={p.id} addr={p} onChange={(a) => setPickup(pickup.map((x, j) => j === i ? a : x))} onSave={() => savePickupAddr(pickup[i], false)} onCancel={() => setEditPickupIdx(null)} errors={errors} />
                  : <AddressCard key={p.id} addr={p} onEdit={() => setEditPickupIdx(i)} onDelete={() => setDeleteIdx(i)} onSetDefault={() => setPickupDefault(i)} />
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-between">
        <button onClick={onPrev} className="px-6 py-2.5 border-2 border-border text-muted font-semibold rounded-xl hover:border-primary cursor-pointer transition-colors">Back</button>
        <button onClick={handleSave} className="px-6 py-2.5 chrome-gradient text-background font-bold rounded-xl hover:shadow-chrome transition-shadow cursor-pointer">Save & Continue</button>
      </div>
      <ConfirmModal isOpen={deleteIdx !== null} onClose={() => setDeleteIdx(null)} onConfirm={() => removePickup(deleteIdx)} title="Delete Address" message="Remove this pickup address?" confirmText="Delete" danger />
    </div>
  );
};

export default AddressesStep;
