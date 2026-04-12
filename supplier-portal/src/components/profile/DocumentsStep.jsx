import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSupplier } from '../../context/SupplierContext';
import { useToast } from '../../context/ToastContext';
import profileService from '../../api/profileService';
import FileUpload from '../ui/FileUpload';
import Badge from '../ui/Badge';

const DOC_LIST = [
  { key: 'panCard', label: 'ID Proof (PAN Card)', required: true },
  { key: 'gstinCert', label: 'GSTIN Certificate', required: true },
  { key: 'bankLetter', label: 'Bank Letter / Cancelled Cheque', required: true },
  { key: 'bankStatement', label: 'Bank Statement Copy', required: true },
  { key: 'incorporation', label: 'Certificate of Incorporation', required: false },
  { key: 'addressProof', label: 'Business Address Proof', required: true },
  { key: 'pickupAddressProof', label: 'Pickup Address Proof', required: true },
  { key: 'signature', label: 'Signature', required: true },
  { key: 'fy2425', label: 'FY 2024-25 Balance Sheet', required: false },
  { key: 'fy2526', label: 'FY 2025-26 Balance Sheet', required: false },
];

const DocumentsStep = ({ onPrev }) => {
  const { documents, saveDocuments, completionPercentage, seedFromApi } = useSupplier();
  const { addToast } = useToast();
  const [docs, setDocs] = useState(documents || {});
  const [submitted, setSubmitted] = useState(false);
  const [uploading, setUploading] = useState({});

  const updateDoc = async (key, file) => {
    // Clear
    if (!file) {
      const next = { ...docs };
      delete next[key];
      setDocs(next);
      saveDocuments(next);
      return;
    }
    // file is the actual File object from <input>
    setUploading((p) => ({ ...p, [key]: true }));
    try {
      const res = await profileService.uploadDocument(key, file);
      const next = { ...docs, [key]: { name: file.name, size: file.size, url: '' } };
      setDocs(next);
      saveDocuments(next);
      seedFromApi(res?.data);
      addToast(`${file.name} uploaded`, 'success');
    } catch (err) {
      addToast(err?.response?.data?.detail || err?.response?.data?.message || 'Upload failed', 'error');
    } finally { setUploading((p) => ({ ...p, [key]: false })); }
  };

  const requiredDocs = DOC_LIST.filter((d) => d.required);
  const uploadedRequired = requiredDocs.filter((d) => docs[d.key]).length;
  const allRequiredUploaded = uploadedRequired === requiredDocs.length;
  const totalUploaded = DOC_LIST.filter((d) => docs[d.key]).length;

  const handleSubmit = () => {
    if (!allRequiredUploaded) { addToast('Upload all required documents first', 'warning'); return; }
    setSubmitted(true);
    addToast('Profile submitted for review! 🎉', 'success');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-800 mb-1">Business Documents</h2>
        <p className="text-xs text-gray-500 mb-5">Upload your business documents for verification</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {DOC_LIST.map((doc) => {
            const file = docs[doc.key];
            const status = file ? 'Uploaded' : 'Not Uploaded';
            return (
              <motion.div
                key={doc.key}
                whileHover={{ y: -2, boxShadow: '0 0 15px rgba(168,178,192,0.1)' }}
                className={`rounded-xl border-2 p-4 transition-colors ${file ? 'border-accent bg-accent/5' : 'border-dashed border-border'}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-semibold text-gray-800">{doc.label}</h4>
                  <div className="flex items-center gap-1.5">
                    {doc.required && <span className="text-[8px] text-red-500 font-bold">REQUIRED</span>}
                    <Badge status={status}>{status}</Badge>
                  </div>
                </div>
                <FileUpload value={file} onChange={(f) => updateDoc(doc.key, f)} disabled={!!uploading[doc.key]} />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Progress bar */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-semibold text-gray-800">Documents uploaded: {totalUploaded}/{DOC_LIST.length}</p>
          <p className="text-xs text-muted">Required: {uploadedRequired}/{requiredDocs.length}</p>
        </div>
        <div className="w-full h-2 bg-border rounded-full overflow-hidden">
          <motion.div className="h-full bg-primary rounded-full" initial={{ width: 0 }} animate={{ width: `${(totalUploaded / DOC_LIST.length) * 100}%` }} transition={{ duration: 0.5 }} />
        </div>
      </div>

      {/* Submitted state */}
      {submitted && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6 text-center">
          <div className="text-5xl mb-3">✨</div>
          <h3 className="text-lg font-bold text-highlight mb-1">Profile Submitted for Review!</h3>
          <p className="text-sm text-muted">We'll notify you within 2-3 business days.</p>
        </motion.div>
      )}

      <div className="flex justify-between">
        <button onClick={onPrev} className="px-6 py-2.5 border-2 border-border text-muted font-semibold rounded-xl hover:border-primary cursor-pointer transition-colors">Back</button>
        <button onClick={handleSubmit} disabled={!allRequiredUploaded || submitted} className="px-6 py-2.5 chrome-gradient text-background font-bold rounded-xl hover:shadow-chrome transition-shadow cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed">
          {submitted ? 'Submitted ✓' : 'Submit for Review'}
        </button>
      </div>
    </div>
  );
};

export default DocumentsStep;
