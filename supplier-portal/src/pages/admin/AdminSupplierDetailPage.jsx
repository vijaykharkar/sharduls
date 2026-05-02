import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Loader2, ShieldCheck, ShieldX, ToggleLeft, ToggleRight,
  Trash2, CheckCircle, XCircle, Clock, Building2, Phone, Mail, MapPin,
  CreditCard, FileText, User, Edit3, Save, X, MessageSquare, Send,
  ClipboardCheck, AlertTriangle, Eye, ThumbsUp, ThumbsDown,
} from 'lucide-react';
import adminService from '../../api/adminService';
import ConfirmModal from '../../components/ui/ConfirmModal';
import { useToast } from '../../context/ToastContext';

const DOC_LIST = [
  { key: 'panCard', label: 'PAN Card', required: true },
  { key: 'gstinCert', label: 'GSTIN Certificate', required: true },
  { key: 'bankLetter', label: 'Bank Letter / Cheque', required: true },
  { key: 'bankStatement', label: 'Bank Statement', required: true },
  { key: 'incorporation', label: 'Incorporation Cert', required: false },
  { key: 'addressProof', label: 'Address Proof', required: true },
  { key: 'pickupAddressProof', label: 'Pickup Proof', required: true },
  { key: 'signature', label: 'Signature', required: true },
  { key: 'fy2425', label: 'FY 24-25 BS', required: false },
  { key: 'fy2526', label: 'FY 25-26 BS', required: false },
];

const REVIEW_SECTIONS = [
  { key: 'businessDetails', label: 'Business Details', icon: Building2 },
  { key: 'contactDetails', label: 'Contact Details', icon: Phone },
  { key: 'categoryBrand', label: 'Category & Brand', icon: FileText },
  { key: 'addresses', label: 'Addresses', icon: MapPin },
  { key: 'bankDetails', label: 'Bank Details', icon: CreditCard },
];

const Badge = ({ children, color }) => (
  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${color}`}>{children}</span>
);

const Field = ({ label, value }) => (
  <div>
    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-0.5">{label}</p>
    <p className="text-sm text-gray-800 font-medium">{value || <span className="text-gray-300">—</span>}</p>
  </div>
);

const ReviewToggle = ({ value, onChange }) => (
  <div className="flex items-center gap-1">
    <button onClick={() => onChange('approved')} className={`p-1.5 rounded-lg cursor-pointer transition-all ${value === 'approved' ? 'bg-green-100 text-green-600 ring-2 ring-green-200' : 'text-gray-300 hover:text-green-400 hover:bg-green-50'}`} title="Approve">
      <ThumbsUp size={14} />
    </button>
    <button onClick={() => onChange('rejected')} className={`p-1.5 rounded-lg cursor-pointer transition-all ${value === 'rejected' ? 'bg-red-100 text-red-600 ring-2 ring-red-200' : 'text-gray-300 hover:text-red-400 hover:bg-red-50'}`} title="Reject">
      <ThumbsDown size={14} />
    </button>
  </div>
);

const AdminSupplierDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [reviewMode, setReviewMode] = useState(false);
  const [showApproveConfirm, setShowApproveConfirm] = useState(false);

  // Review state: per-section verdict + note, per-document verdict + note
  const initReview = () => {
    const sections = {};
    REVIEW_SECTIONS.forEach((s) => { sections[s.key] = { verdict: '', note: '' }; });
    const documents = {};
    DOC_LIST.forEach((d) => { documents[d.key] = { verdict: '', note: '' }; });
    return { sections, documents, overallNote: '' };
  };
  const [review, setReview] = useState(initReview());

  const setSectionReview = (key, field, val) => setReview((r) => ({ ...r, sections: { ...r.sections, [key]: { ...r.sections[key], [field]: val } } }));
  const setDocReview = (key, field, val) => setReview((r) => ({ ...r, documents: { ...r.documents, [key]: { ...r.documents[key], [field]: val } } }));

  const load = () => {
    setLoading(true);
    adminService.getSupplier(id)
      .then((res) => {
        setProfile(res.data);
        setEditForm({ full_name: res.data?.full_name || '', email: res.data?.email || '', phone: res.data?.phone || '' });
        // Pre-fill review from existing data if any
        if (res.data?.admin_review) {
          setReview({ ...initReview(), ...res.data.admin_review });
        }
      })
      .catch(() => navigate('/admin/suppliers'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, [id]);

  const act = async (fn) => {
    setActionLoading(true);
    try { const res = await fn; setProfile(res.data); } catch {}
    finally { setActionLoading(false); }
  };

  const handleDelete = async () => {
    setActionLoading(true);
    try { await adminService.deleteSupplier(id); navigate('/admin/suppliers'); } catch {}
    finally { setActionLoading(false); setShowDelete(false); }
  };

  const handleEditSave = async () => {
    setActionLoading(true);
    try { const res = await adminService.updateSupplier(id, editForm); setProfile(res.data); setEditing(false); } catch {}
    finally { setActionLoading(false); }
  };

  // Check if all sections & required docs are reviewed
  const allSectionsReviewed = REVIEW_SECTIONS.every((s) => review.sections[s.key]?.verdict);
  const requiredDocs = DOC_LIST.filter((d) => d.required);
  const allDocsReviewed = requiredDocs.every((d) => review.documents[d.key]?.verdict);
  const allReviewed = allSectionsReviewed && allDocsReviewed;
  const allApproved = allReviewed
    && REVIEW_SECTIONS.every((s) => review.sections[s.key]?.verdict === 'approved')
    && requiredDocs.every((d) => review.documents[d.key]?.verdict === 'approved');
  const hasRejections = REVIEW_SECTIONS.some((s) => review.sections[s.key]?.verdict === 'rejected')
    || DOC_LIST.some((d) => review.documents[d.key]?.verdict === 'rejected');

  const handleSubmitReview = async () => {
    if (!allReviewed) { addToast('Please review all sections and required documents before submitting.', 'warning'); return; }
    setActionLoading(true);
    try {
      await adminService.submitReview(id, review);
      if (allApproved) {
        // If everything is correct, also approve
        setShowApproveConfirm(true);
      } else {
        addToast('Review submitted. Supplier has been notified of the issues.', 'success');
        setReviewMode(false);
        load();
      }
    } catch (err) {
      addToast('Failed to submit review', 'error');
    } finally { setActionLoading(false); }
  };

  const handleApproveAfterReview = async () => {
    setActionLoading(true);
    try {
      await adminService.approveSupplier(id);
      addToast('Supplier approved! They can now upload products.', 'success');
      setReviewMode(false);
      setShowApproveConfirm(false);
      load();
    } catch { addToast('Failed to approve', 'error'); }
    finally { setActionLoading(false); }
  };

  if (loading) return <div className="flex items-center justify-center min-h-[60vh]"><Loader2 size={32} className="animate-spin text-violet-500" /></div>;
  if (!profile) return null;

  const p = profile;
  const bd = p.business_details || {};
  const bk = p.bank_details || {};
  const addrs = p.addresses || {};
  const contacts = p.contact_details || {};
  const catBrand = p.category_brand || {};
  const docs = p.documents?.items || [];
  const docMap = {};
  docs.forEach((d) => { docMap[d.document_type] = d; });

  const reviewedCount = REVIEW_SECTIONS.filter((s) => review.sections[s.key]?.verdict).length + DOC_LIST.filter((d) => review.documents[d.key]?.verdict).length;
  const totalReviewable = REVIEW_SECTIONS.length + DOC_LIST.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={() => navigate('/admin/suppliers')} className="p-2 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
          <ArrowLeft size={18} className="text-gray-600" />
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="text-xl font-bold text-gray-800 truncate">{p.full_name}</h1>
          <p className="text-xs text-gray-500">ID: {p.id} &middot; {p.email}</p>
        </div>
        <div className="flex items-center gap-2">
          {p.is_profile_approved
            ? <Badge color="bg-green-100 text-green-700"><CheckCircle size={12} /> Approved</Badge>
            : <Badge color="bg-amber-100 text-amber-700"><Clock size={12} /> Pending</Badge>
          }
          {!p.is_active && <Badge color="bg-red-100 text-red-600"><XCircle size={12} /> Inactive</Badge>}
        </div>
      </div>

      {/* Action bar */}
      <div className="flex flex-wrap items-center gap-2 bg-white rounded-2xl border border-gray-200 shadow-sm px-5 py-3">
        <span className="text-xs text-gray-500 mr-auto">Profile: <span className="font-bold text-violet-600">{p.profile_completion ?? 0}%</span></span>
        <button onClick={() => setEditing(!editing)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border border-gray-200 text-gray-600 hover:bg-gray-50 cursor-pointer transition-colors">
          <Edit3 size={13} /> Edit Info
        </button>
        <button onClick={() => setReviewMode(!reviewMode)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-colors ${reviewMode ? 'bg-violet-600 text-white hover:bg-violet-700' : 'bg-violet-50 text-violet-600 border border-violet-200 hover:bg-violet-100'}`}>
          <ClipboardCheck size={13} /> {reviewMode ? 'Exit Review' : 'Start Review'}
        </button>
        {!p.is_profile_approved && !reviewMode && (
          <button onClick={() => act(adminService.approveSupplier(id))} disabled={actionLoading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-green-600 text-white hover:bg-green-700 cursor-pointer transition-colors disabled:opacity-50">
            <ShieldCheck size={13} /> Quick Approve
          </button>
        )}
        {p.is_profile_approved && !reviewMode && (
          <button onClick={() => act(adminService.rejectSupplier(id))} disabled={actionLoading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500 text-white hover:bg-amber-600 cursor-pointer transition-colors disabled:opacity-50">
            <ShieldX size={13} /> Revoke
          </button>
        )}
        <button onClick={() => act(adminService.toggleStatus(id))} disabled={actionLoading}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border border-gray-200 text-gray-600 hover:bg-gray-50 cursor-pointer transition-colors disabled:opacity-50">
          {p.is_active ? <><ToggleRight size={13} /> Deactivate</> : <><ToggleLeft size={13} /> Activate</>}
        </button>
        <button onClick={() => setShowDelete(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border border-red-200 text-red-600 hover:bg-red-50 cursor-pointer transition-colors">
          <Trash2 size={13} /> Delete
        </button>
      </div>

      {/* Review mode banner */}
      {reviewMode && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="bg-violet-50 border border-violet-200 rounded-2xl p-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center flex-shrink-0">
              <ClipboardCheck size={20} className="text-violet-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-violet-800">Review Mode Active</h3>
              <p className="text-xs text-violet-600 mt-0.5">Verify each section and document. Mark as approved or rejected with notes. Submit when complete.</p>
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-20 h-2 bg-violet-200 rounded-full overflow-hidden">
                    <div className="h-full bg-violet-500 rounded-full transition-all" style={{ width: `${(reviewedCount / totalReviewable) * 100}%` }} />
                  </div>
                  <span className="text-[10px] font-bold text-violet-700">{reviewedCount}/{totalReviewable}</span>
                </div>
                <button onClick={handleSubmitReview} disabled={actionLoading || !allReviewed}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-violet-600 text-white hover:bg-violet-700 cursor-pointer transition-colors disabled:opacity-40">
                  <Send size={13} /> Submit Review {allApproved && '& Approve'}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Edit inline */}
      {editing && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="bg-violet-50 border border-violet-200 rounded-2xl p-5 space-y-3">
          <h3 className="text-xs font-bold text-violet-700 uppercase tracking-wider">Edit Basic Info</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[{ key: 'full_name', label: 'Full Name' }, { key: 'email', label: 'Email' }, { key: 'phone', label: 'Phone' }].map((f) => (
              <div key={f.key}>
                <label className="text-[10px] text-violet-600 font-semibold mb-1 block">{f.label}</label>
                <input value={editForm[f.key] || ''} onChange={(e) => setEditForm({ ...editForm, [f.key]: e.target.value })}
                  className="w-full px-3 py-2 border border-violet-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-violet-300 bg-white text-gray-800" />
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={handleEditSave} disabled={actionLoading}
              className="flex items-center gap-1.5 px-4 py-2 bg-violet-600 text-white text-xs font-bold rounded-xl hover:bg-violet-700 cursor-pointer transition-colors disabled:opacity-50">
              <Save size={13} /> Save Changes
            </button>
            <button onClick={() => setEditing(false)} className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 text-gray-600 text-xs font-semibold rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
              <X size={13} /> Cancel
            </button>
          </div>
        </motion.div>
      )}

      {/* Profile sections with review toggles */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Business Details */}
        <ReviewableSection sectionKey="businessDetails" title="Business Details" icon={Building2} reviewMode={reviewMode} review={review} setSectionReview={setSectionReview}>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Legal Name" value={bd.legal_name} />
            <Field label="Trade Name" value={bd.trade_name} />
            <Field label="GSTIN" value={bd.gstin} />
            <Field label="TAN" value={bd.tan} />
            <Field label="Entity Type" value={bd.entity_type} />
            <Field label="City" value={bd.city} />
            <Field label="State" value={bd.state} />
            <Field label="Pincode" value={bd.pincode} />
            <Field label="Country" value={bd.country} />
            <Field label="Udyam" value={bd.has_udyam ? 'Yes' : 'No'} />
          </div>
        </ReviewableSection>

        {/* Contact Details */}
        <ReviewableSection sectionKey="contactDetails" title="Contact Details" icon={Phone} reviewMode={reviewMode} review={review} setSectionReview={setSectionReview}>
          {contacts.primary ? (
            <div className="grid grid-cols-2 gap-4">
              <Field label="Name" value={contacts.primary.contact_name} />
              <Field label="Phone" value={contacts.primary.phone} />
              <Field label="Email" value={contacts.primary.email} />
              <Field label="Pickup Time" value={contacts.primary.pickup_time} />
            </div>
          ) : <p className="text-xs text-gray-400">No primary contact set</p>}
          {contacts.others?.length > 0 && (
            <div className="mt-4 border-t border-gray-100 pt-3">
              <p className="text-[10px] text-gray-400 font-semibold uppercase mb-2">Other Contacts</p>
              {contacts.others.map((c, i) => (
                <div key={i} className="flex items-center gap-3 py-1.5 text-xs text-gray-600">
                  <span className="font-semibold">{c.contact_name}</span> &middot; {c.phone} &middot; {c.email}
                </div>
              ))}
            </div>
          )}
        </ReviewableSection>

        {/* Category & Brand */}
        <ReviewableSection sectionKey="categoryBrand" title="Category & Brand" icon={FileText} reviewMode={reviewMode} review={review} setSectionReview={setSectionReview}>
          <div className="space-y-3">
            <div>
              <p className="text-[10px] text-gray-400 uppercase font-semibold mb-1">Categories</p>
              <div className="flex flex-wrap gap-1.5">
                {(catBrand.categories || []).length > 0
                  ? catBrand.categories.map((c) => <span key={c} className="px-2 py-0.5 bg-violet-100 text-violet-700 rounded-full text-[10px] font-semibold">{c}</span>)
                  : <span className="text-xs text-gray-300">None</span>
                }
              </div>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 uppercase font-semibold mb-1">Brands</p>
              <div className="flex flex-wrap gap-1.5">
                {(catBrand.brands || []).length > 0
                  ? catBrand.brands.map((b) => <span key={b} className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-[10px] font-semibold">{b}</span>)
                  : <span className="text-xs text-gray-300">None</span>
                }
              </div>
            </div>
          </div>
        </ReviewableSection>

        {/* Bank Details */}
        <ReviewableSection sectionKey="bankDetails" title="Bank Details" icon={CreditCard} reviewMode={reviewMode} review={review} setSectionReview={setSectionReview}>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Account Holder" value={bk.account_holder_name} />
            <Field label="Account Number" value={bk.account_number} />
            <Field label="IFSC" value={bk.ifsc_code} />
            <Field label="Bank" value={bk.bank_name} />
            <Field label="Branch" value={bk.branch} />
            <Field label="Type" value={bk.account_type} />
          </div>
        </ReviewableSection>

        {/* Addresses */}
        <ReviewableSection sectionKey="addresses" title="Addresses" icon={MapPin} reviewMode={reviewMode} review={review} setSectionReview={setSectionReview}>
          {addrs.billing ? (
            <div className="mb-3 p-3 rounded-xl bg-gray-50 border border-gray-200">
              <p className="text-[10px] text-violet-600 font-bold uppercase mb-1">Billing</p>
              <p className="text-xs text-gray-700">{addrs.billing.address_line1}{addrs.billing.address_line2 ? `, ${addrs.billing.address_line2}` : ''}</p>
              <p className="text-xs text-gray-500">{addrs.billing.city}, {addrs.billing.state} - {addrs.billing.pincode}</p>
            </div>
          ) : <p className="text-xs text-gray-300 mb-2">No billing address</p>}
          {(addrs.pickup || []).map((a, i) => (
            <div key={i} className="mb-2 p-3 rounded-xl bg-gray-50 border border-gray-200">
              <p className="text-[10px] text-blue-600 font-bold uppercase mb-1">Pickup {a.is_default ? '(Default)' : ''}</p>
              <p className="text-xs text-gray-700">{a.address_line1}{a.address_line2 ? `, ${a.address_line2}` : ''}</p>
              <p className="text-xs text-gray-500">{a.city}, {a.state} - {a.pincode}</p>
            </div>
          ))}
        </ReviewableSection>

        {/* Documents — special: each doc gets its own review toggle */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden lg:col-span-2">
          <div className="flex items-center gap-2 px-5 py-3 bg-gray-50 border-b border-gray-200">
            <FileText size={15} className="text-violet-600" />
            <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Documents</h3>
            {reviewMode && (
              <span className="ml-auto text-[10px] font-bold text-violet-600">
                {DOC_LIST.filter((d) => review.documents[d.key]?.verdict).length}/{DOC_LIST.length} reviewed
              </span>
            )}
          </div>
          <div className="p-5 space-y-2">
            {DOC_LIST.map((doc) => {
              const uploaded = !!docMap[doc.key];
              const d = docMap[doc.key];
              const rv = review.documents[doc.key] || {};
              return (
                <div key={doc.key} className={`rounded-xl border transition-all ${rv.verdict === 'approved' ? 'bg-green-50 border-green-200' : rv.verdict === 'rejected' ? 'bg-red-50 border-red-200' : uploaded ? 'bg-green-50/50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                  <div className="flex items-center justify-between px-4 py-2.5">
                    <div className="flex items-center gap-2 min-w-0">
                      {uploaded ? <CheckCircle size={13} className="text-green-500 flex-shrink-0" /> : <XCircle size={13} className={`flex-shrink-0 ${doc.required ? 'text-red-400' : 'text-gray-400'}`} />}
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-gray-700 truncate">{doc.label}</p>
                        {d?.file_name && <p className="text-[10px] text-gray-400 truncate">{d.file_name}</p>}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {doc.required && !uploaded && <span className="text-[9px] text-red-500 font-bold">REQ</span>}
                      {uploaded ? <span className="text-[10px] font-bold text-green-600">Uploaded</span> : <span className="text-[10px] font-bold text-gray-400">Pending</span>}
                      {d?.document_url && (
                        <a href={`http://localhost:8000${d.document_url}`} target="_blank" rel="noreferrer"
                          className="flex items-center gap-1 text-[10px] text-violet-600 font-semibold hover:underline"><Eye size={11} /> View</a>
                      )}
                      {reviewMode && uploaded && <ReviewToggle value={rv.verdict} onChange={(v) => setDocReview(doc.key, 'verdict', v)} />}
                    </div>
                  </div>
                  {reviewMode && rv.verdict === 'rejected' && (
                    <div className="px-4 pb-3">
                      <input value={rv.note || ''} onChange={(e) => setDocReview(doc.key, 'note', e.target.value)}
                        placeholder="Reason for rejection…" className="w-full px-3 py-1.5 border border-red-200 rounded-lg text-xs outline-none focus:ring-1 focus:ring-red-300 bg-white text-gray-700 placeholder-gray-400" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Overall review note (visible in review mode) */}
      {reviewMode && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-3">
            <MessageSquare size={15} className="text-violet-600" />
            <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Overall Review Note</h3>
          </div>
          <textarea value={review.overallNote} onChange={(e) => setReview((r) => ({ ...r, overallNote: e.target.value }))}
            placeholder="Add any overall comments for the supplier (visible to them)…" rows={3}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-violet-200 bg-white text-gray-800 placeholder-gray-400 resize-none" />

          {/* Review summary */}
          <div className="mt-4 flex flex-wrap gap-3">
            <div className="flex items-center gap-1.5 text-xs">
              <CheckCircle size={13} className="text-green-500" />
              <span className="font-semibold text-green-700">
                {REVIEW_SECTIONS.filter((s) => review.sections[s.key]?.verdict === 'approved').length + DOC_LIST.filter((d) => review.documents[d.key]?.verdict === 'approved').length} approved
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <XCircle size={13} className="text-red-500" />
              <span className="font-semibold text-red-700">
                {REVIEW_SECTIONS.filter((s) => review.sections[s.key]?.verdict === 'rejected').length + DOC_LIST.filter((d) => review.documents[d.key]?.verdict === 'rejected').length} rejected
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <Clock size={13} className="text-gray-400" />
              <span className="font-semibold text-gray-500">{totalReviewable - reviewedCount} pending</span>
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <button onClick={handleSubmitReview} disabled={actionLoading || !allReviewed}
              className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold cursor-pointer transition-colors disabled:opacity-40 ${hasRejections ? 'bg-amber-500 text-white hover:bg-amber-600' : 'bg-green-600 text-white hover:bg-green-700'}`}>
              {hasRejections ? <><AlertTriangle size={13} /> Send Feedback</> : <><ShieldCheck size={13} /> Submit & Approve</>}
            </button>
            <button onClick={() => setReviewMode(false)} className="px-5 py-2.5 border border-gray-200 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-50 cursor-pointer transition-colors">
              Cancel Review
            </button>
          </div>
        </motion.div>
      )}

      {/* Approve confirmation after all-green review */}
      <ConfirmModal isOpen={showApproveConfirm} onClose={() => { setShowApproveConfirm(false); load(); }}
        onConfirm={handleApproveAfterReview}
        title="Approve Supplier"
        message={`All sections and documents verified. Approve ${p.full_name}? They will be able to upload products after approval.`}
        confirmText="Yes, Approve" />

      <ConfirmModal isOpen={showDelete} onClose={() => setShowDelete(false)} onConfirm={handleDelete}
        title="Delete Supplier" message={`Permanently delete ${p.full_name}? This cannot be undone.`}
        confirmText="Delete Forever" danger />
    </div>
  );
};

// Reviewable Section wrapper — adds review toggle + note to any section
const ReviewableSection = ({ sectionKey, title, icon: Icon, reviewMode, review, setSectionReview, children }) => {
  const rv = review.sections[sectionKey] || {};
  const borderColor = rv.verdict === 'approved' ? 'border-green-300' : rv.verdict === 'rejected' ? 'border-red-300' : 'border-gray-200';

  return (
    <div className={`bg-white rounded-2xl border-2 shadow-sm overflow-hidden transition-colors ${borderColor}`}>
      <div className="flex items-center gap-2 px-5 py-3 bg-gray-50 border-b border-gray-200">
        <Icon size={15} className="text-violet-600" />
        <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider flex-1">{title}</h3>
        {reviewMode && <ReviewToggle value={rv.verdict} onChange={(v) => setSectionReview(sectionKey, 'verdict', v)} />}
        {!reviewMode && rv.verdict === 'approved' && <CheckCircle size={14} className="text-green-500" />}
        {!reviewMode && rv.verdict === 'rejected' && <XCircle size={14} className="text-red-500" />}
      </div>
      <div className="p-5">{children}</div>
      {reviewMode && rv.verdict === 'rejected' && (
        <div className="px-5 pb-4">
          <input value={rv.note || ''} onChange={(e) => setSectionReview(sectionKey, 'note', e.target.value)}
            placeholder="Reason for rejection…" className="w-full px-3 py-2 border border-red-200 rounded-xl text-xs outline-none focus:ring-1 focus:ring-red-300 bg-white text-gray-700 placeholder-gray-400" />
        </div>
      )}
      {!reviewMode && rv.verdict === 'rejected' && rv.note && (
        <div className="px-5 pb-4">
          <p className="text-xs text-red-600 bg-red-50 px-3 py-2 rounded-lg border border-red-200">
            <span className="font-bold">Admin note:</span> {rv.note}
          </p>
        </div>
      )}
    </div>
  );
};

export default AdminSupplierDetailPage;
