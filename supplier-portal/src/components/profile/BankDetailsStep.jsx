import React, { useState } from 'react';
import { useSupplier } from '../../context/SupplierContext';
import { useToast } from '../../context/ToastContext';
import { validateIFSC, lookupIFSC } from '../../utils/helpers';
import FileUpload from '../ui/FileUpload';

const acctTypes = ['Savings', 'Current', 'OD'];

const BankDetailsStep = ({ onNext, onPrev }) => {
  const { bankDetails, saveBankDetails } = useSupplier();
  const { addToast } = useToast();
  const [form, setForm] = useState(bankDetails || {
    holderName: '', acctNumber: '', confirmAcct: '', acctType: 'Savings', ifsc: '', bankName: '', branch: '', city: '', cheque: null,
  });
  const [errors, setErrors] = useState({});

  const up = (k, v) => {
    const next = { ...form, [k]: v };
    if (k === 'ifsc') {
      next.ifsc = v.toUpperCase().slice(0, 11);
      if (validateIFSC(next.ifsc)) {
        const info = lookupIFSC(next.ifsc);
        next.bankName = info.bank;
        next.branch = info.branch;
      } else {
        next.bankName = '';
        next.branch = '';
      }
    }
    setForm(next);
  };

  const validate = () => {
    const e = {};
    if (!form.holderName.trim()) e.holderName = 'Required';
    if (!form.acctNumber.trim()) e.acctNumber = 'Required';
    if (form.acctNumber !== form.confirmAcct) e.confirmAcct = 'Must match';
    if (!validateIFSC(form.ifsc)) e.ifsc = 'Invalid IFSC (11 chars)';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    saveBankDetails(form);
    addToast('Bank details saved!', 'success');
    onNext();
  };

  const ic = 'w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-400 bg-white text-gray-800 placeholder-gray-400 transition-all';

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-5">
      <div>
        <h2 className="text-lg font-bold text-gray-800 mb-1">Bank Details</h2>
        <p className="text-xs text-gray-500">For receiving payments</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Account Holder Name *</label>
          <input value={form.holderName} onChange={(e) => up('holderName', e.target.value)} className={ic} placeholder="As per bank records" />
          {errors.holderName && <p className="mt-1 text-xs text-red-500">{errors.holderName}</p>}
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Account Number *</label>
          <input value={form.acctNumber} onChange={(e) => up('acctNumber', e.target.value.replace(/\D/g, ''))} className={ic} placeholder="Account number" />
          {errors.acctNumber && <p className="mt-1 text-xs text-red-500">{errors.acctNumber}</p>}
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Confirm Account Number *</label>
          <input value={form.confirmAcct} onChange={(e) => up('confirmAcct', e.target.value.replace(/\D/g, ''))} className={ic} placeholder="Re-enter account number" />
          {errors.confirmAcct && <p className="mt-1 text-xs text-red-500">{errors.confirmAcct}</p>}
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Account Type *</label>
          <select value={form.acctType} onChange={(e) => up('acctType', e.target.value)} className={ic}>
            {acctTypes.map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">IFSC Code *</label>
          <input value={form.ifsc} onChange={(e) => up('ifsc', e.target.value)} className={ic} placeholder="e.g. SBIN0000001" maxLength={11} style={{ textTransform: 'uppercase' }} />
          {errors.ifsc && <p className="mt-1 text-xs text-red-500">{errors.ifsc}</p>}
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Bank Name</label>
          <input value={form.bankName} readOnly className={`${ic} bg-gray-50`} placeholder="Auto-filled from IFSC" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Branch</label>
          <input value={form.branch} readOnly className={`${ic} bg-gray-50`} placeholder="Auto-filled from IFSC" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">City</label>
          <input value={form.city} onChange={(e) => up('city', e.target.value)} className={ic} placeholder="City" />
        </div>
      </div>

      <FileUpload label="Bank Letter / Cancelled Cheque" value={form.cheque} onChange={(f) => up('cheque', f)} />

      <div className="flex justify-between pt-2">
        <button onClick={onPrev} className="px-6 py-2.5 border-2 border-border text-muted font-semibold rounded-xl hover:border-primary cursor-pointer transition-colors">Back</button>
        <button onClick={handleSave} className="px-6 py-2.5 chrome-gradient text-background font-bold rounded-xl hover:shadow-chrome transition-shadow cursor-pointer">Save & Continue</button>
      </div>
    </div>
  );
};

export default BankDetailsStep;
