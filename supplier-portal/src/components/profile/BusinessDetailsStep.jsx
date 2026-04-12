import React, { useState } from 'react';
import { useSupplier } from '../../context/SupplierContext';
import { useToast } from '../../context/ToastContext';
import { validateGSTIN, lookupPincode, validatePincode } from '../../utils/helpers';
import profileService from '../../api/profileService';
import FileUpload from '../ui/FileUpload';

const entityTypes = ['Sole Proprietorship', 'Partnership', 'LLP', 'Private Limited', 'Public Limited', 'Others'];

const BusinessDetailsStep = ({ onNext }) => {
  const { businessDetails, saveBusinessDetails, seedFromApi } = useSupplier();
  const { addToast } = useToast();
  const [form, setForm] = useState(businessDetails || {
    legalName: '', tradeName: '', gstin: '', country: 'India', pincode: '', state: '', city: '', tan: '', entityType: '', hasUdyam: 'no', udyamFile: null,
  });
  const [errors, setErrors] = useState({});

  const up = (k, v) => {
    const next = { ...form, [k]: v };
    if (k === 'gstin') next.gstin = v.toUpperCase().slice(0, 15);
    if (k === 'pincode' && validatePincode(v)) {
      const loc = lookupPincode(v);
      next.state = loc.state;
      next.city = loc.city;
    }
    setForm(next);
  };

  const validate = () => {
    const e = {};
    if (!form.legalName.trim()) e.legalName = 'Required';
    if (!form.tradeName.trim()) e.tradeName = 'Required';
    if (!validateGSTIN(form.gstin)) e.gstin = 'Invalid GSTIN (15 alphanumeric)';
    if (!validatePincode(form.pincode)) e.pincode = 'Invalid pincode (6 digits)';
    if (!form.city.trim()) e.city = 'Required';
    if (!form.entityType) e.entityType = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!validate()) return;
    setSaving(true);
    try {
      const res = await profileService.saveBusinessDetails({
        legal_name: form.legalName,
        trade_name: form.tradeName,
        gstin: form.gstin,
        country: form.country,
        pincode: form.pincode,
        state: form.state,
        city: form.city,
        tan: form.tan || null,
        entity_type: form.entityType,
        has_udyam: form.hasUdyam === 'yes',
        udyam_file_url: null,
      });
      seedFromApi(res?.data);
      saveBusinessDetails(form);
      addToast('Business details saved!', 'success');
      onNext();
    } catch (err) {
      addToast(err?.response?.data?.message || 'Failed to save', 'error');
    } finally { setSaving(false); }
  };

  const inputClass = 'w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-400 bg-white text-gray-800 placeholder-gray-400 transition-all';

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
      <h2 className="text-lg font-bold text-gray-800 mb-1">Business Details</h2>
      <p className="text-xs text-gray-500 mb-5">Tell us about your business entity</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Legal Entity Name *</label>
          <input value={form.legalName} onChange={(e) => up('legalName', e.target.value)} className={inputClass} placeholder="Registered company name" />
          {errors.legalName && <p className="mt-1 text-xs text-red-500">{errors.legalName}</p>}
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Trade Name *</label>
          <input value={form.tradeName} onChange={(e) => up('tradeName', e.target.value)} className={inputClass} placeholder="Brand / trade name" />
          {errors.tradeName && <p className="mt-1 text-xs text-red-500">{errors.tradeName}</p>}
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">GSTIN *</label>
          <input value={form.gstin} onChange={(e) => up('gstin', e.target.value)} className={inputClass} placeholder="15 character GSTIN" maxLength={15} style={{ textTransform: 'uppercase' }} />
          {errors.gstin && <p className="mt-1 text-xs text-red-500">{errors.gstin}</p>}
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Country</label>
          <select value={form.country} onChange={(e) => up('country', e.target.value)} className={inputClass}>
            <option>India</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Pincode *</label>
          <input value={form.pincode} onChange={(e) => up('pincode', e.target.value.replace(/\D/g, '').slice(0, 6))} className={inputClass} placeholder="6 digit pincode" />
          {errors.pincode && <p className="mt-1 text-xs text-red-500">{errors.pincode}</p>}
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">State</label>
          <input value={form.state} onChange={(e) => up('state', e.target.value)} className={`${inputClass} ${form.state ? 'bg-gray-50' : ''}`} placeholder="Auto-filled from pincode" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">City *</label>
          <input value={form.city} onChange={(e) => up('city', e.target.value)} className={inputClass} placeholder="City" />
          {errors.city && <p className="mt-1 text-xs text-red-500">{errors.city}</p>}
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">TAN (optional)</label>
          <input value={form.tan} onChange={(e) => up('tan', e.target.value)} className={inputClass} placeholder="Enter TAN" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Business Entity Type *</label>
          <select value={form.entityType} onChange={(e) => up('entityType', e.target.value)} className={inputClass}>
            <option value="">Select type</option>
            {entityTypes.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          {errors.entityType && <p className="mt-1 text-xs text-red-500">{errors.entityType}</p>}
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Udyam Registration Certificate</label>
          <div className="flex gap-4 mt-1">
            <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="udyam" checked={form.hasUdyam === 'no'} onChange={() => up('hasUdyam', 'no')} className="accent-[#E53E3E]" /><span className="text-sm">No</span></label>
            <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="udyam" checked={form.hasUdyam === 'yes'} onChange={() => up('hasUdyam', 'yes')} className="accent-[#E53E3E]" /><span className="text-sm">Yes</span></label>
          </div>
        </div>
      </div>

      {form.hasUdyam === 'yes' && (
        <div className="mt-4">
          <FileUpload label="Upload Udyam Certificate" value={form.udyamFile} onChange={(f) => up('udyamFile', f)} />
        </div>
      )}

      <div className="flex justify-end mt-6">
        <button onClick={handleSave} className="px-6 py-2.5 chrome-gradient text-background font-bold rounded-xl hover:shadow-chrome transition-shadow cursor-pointer">Save & Continue</button>
      </div>
    </div>
  );
};

export default BusinessDetailsStep;
