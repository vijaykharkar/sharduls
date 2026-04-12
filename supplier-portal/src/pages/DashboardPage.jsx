import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShoppingBag, Clock, Banknote, Package, ArrowRight,
  CheckCircle, AlertCircle, FileText, Lock, Loader2, Upload,
  Check, Shield,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSupplier } from '../context/SupplierContext';

/* ── Constants ───────────────────────────────────────────── */
const STEP_LABELS = ['Business Details', 'Contact Details', 'Category & Brand', 'Addresses', 'Bank Details', 'Documents'];
const STEP_KEYS   = ['businessDetails', 'contactDetails', 'categoryBrand', 'addresses', 'bankDetails', 'documents'];

const DOC_LIST = [
  { key: 'panCard',            label: 'ID Proof (PAN Card)',           required: true  },
  { key: 'gstinCert',          label: 'GSTIN Certificate',             required: true  },
  { key: 'bankLetter',         label: 'Bank Letter / Cancelled Cheque',required: true  },
  { key: 'bankStatement',      label: 'Bank Statement Copy',           required: true  },
  { key: 'incorporation',      label: 'Certificate of Incorporation',  required: false },
  { key: 'addressProof',       label: 'Business Address Proof',        required: true  },
  { key: 'pickupAddressProof', label: 'Pickup Address Proof',          required: true  },
  { key: 'signature',          label: 'Signature',                     required: true  },
  { key: 'fy2425',             label: 'FY 2024-25 Balance Sheet',      required: false },
  { key: 'fy2526',             label: 'FY 2025-26 Balance Sheet',      required: false },
];

/* ── Progress Ring ───────────────────────────────────────── */
const ProgressRing = ({ pct }) => {
  const r = 52, c = 2 * Math.PI * r;
  const strokeColor = pct === 100 ? '#22c55e' : pct >= 60 ? '#8b5cf6' : '#f59e0b';
  return (
    <svg width="130" height="130" className="-rotate-90">
      <circle cx="65" cy="65" r={r} fill="none" stroke="#e5e7eb" strokeWidth="10" />
      <motion.circle
        cx="65" cy="65" r={r} fill="none" stroke={strokeColor} strokeWidth="10"
        strokeLinecap="round" strokeDasharray={c}
        initial={{ strokeDashoffset: c }}
        animate={{ strokeDashoffset: c - (pct / 100) * c }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
      />
    </svg>
  );
};

/* ── Locked Section Placeholder ─────────────────────────── */
const LockedSection = ({ title, icon: Icon }) => (
  <div className="bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 p-8 flex flex-col items-center justify-center text-center gap-3">
    <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center">
      <Lock size={22} className="text-gray-400" />
    </div>
    <div>
      <p className="text-sm font-bold text-gray-500">{title}</p>
      <p className="text-xs text-gray-400 mt-0.5">Available after profile approval</p>
    </div>
    <Link to="/profile" className="mt-1 text-xs text-violet-600 font-semibold hover:underline">
      Complete Profile →
    </Link>
  </div>
);

/* ── Stat Card ───────────────────────────────────────────── */
const StatCard = ({ icon: Icon, label, value, color }) => (
  <motion.div
    whileHover={{ y: -3, boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}
    className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm"
  >
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${color}`}>
      <Icon size={20} />
    </div>
    <p className="text-2xl font-bold text-gray-800">{value}</p>
    <p className="text-xs text-gray-500 mt-0.5">{label}</p>
  </motion.div>
);

/* ── Doc Status Badge ────────────────────────────────────── */
const DocBadge = ({ uploaded }) => {
  if (uploaded) return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-[10px] font-bold">
      <CheckCircle size={10} /> Uploaded
    </span>
  );
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold">
      <Upload size={10} /> Pending
    </span>
  );
};

/* ── Dashboard ───────────────────────────────────────────── */
const DashboardPage = () => {
  const { user } = useAuth();
  const { profileSteps, completionPercentage, apiProfile, profileLoading, documents } = useSupplier();

  const isApproved  = !!apiProfile?.is_profile_approved;
  const isComplete  = completionPercentage === 100;
  const isPending   = isComplete && !isApproved;

  const stagger  = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
  const fadeUp   = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } };

  if (profileLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 size={32} className="animate-spin text-violet-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* ── Greeting ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-800">
            Welcome back, {user?.full_name || user?.name || 'Supplier'} 👋
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">Here's your supplier overview</p>
        </div>
        <Link to="/profile" className="hidden sm:inline-flex items-center gap-2 text-xs text-violet-600 font-semibold hover:text-violet-700 bg-violet-50 px-4 py-2 rounded-xl border border-violet-200 transition-colors">
          Manage Profile <ArrowRight size={13} />
        </Link>
      </div>

      {/* ── Approval banner ── */}
      {isApproved ? (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 bg-green-50 border border-green-200 rounded-2xl px-6 py-4">
          <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
            <Shield size={20} className="text-green-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-green-800">Profile Approved ✓</p>
            <p className="text-xs text-green-600">Your profile has been verified. You can now list products, manage orders and receive payments.</p>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-500 text-white text-xs font-bold rounded-xl">
            <CheckCircle size={12} /> Active
          </span>
        </motion.div>
      ) : isPending ? (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 bg-amber-50 border border-amber-200 rounded-2xl px-6 py-4">
          <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
            <Clock size={20} className="text-amber-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-amber-800">Profile Approval Pending</p>
            <p className="text-xs text-amber-600">Your profile is complete and under admin review. We'll notify you within 2–3 business days.</p>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-400 text-white text-xs font-bold rounded-xl">
            <Clock size={12} /> Under Review
          </span>
        </motion.div>
      ) : null}

      {/* ── Profile Completion Card ── */}
      {!isComplete && (
        <div className="relative bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 overflow-hidden">
          <div className="absolute top-0 right-0 w-56 h-56 bg-violet-50 rounded-full -translate-y-1/3 translate-x-1/3 pointer-events-none" />
          <div className="flex flex-col lg:flex-row items-center gap-6 relative z-10">
            <div className="relative flex-shrink-0">
              <ProgressRing pct={completionPercentage} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-2xl font-bold text-gray-800 block">{completionPercentage}%</span>
                  <span className="text-[10px] text-gray-500 font-semibold uppercase tracking-wide">Complete</span>
                </div>
              </div>
            </div>
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-lg font-bold text-gray-800 mb-1">Complete your profile to start selling</h2>
              <p className="text-sm text-gray-500 mb-4">Finish all 6 steps to submit for admin review</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-5">
                {STEP_LABELS.map((lbl, i) => (
                  <div key={i} className="flex items-center gap-2">
                    {profileSteps[STEP_KEYS[i]] ? (
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                        <Check size={11} className="text-white" />
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center flex-shrink-0">
                        <Clock size={9} className="text-gray-400" />
                      </div>
                    )}
                    <span className={`text-xs font-medium ${profileSteps[STEP_KEYS[i]] ? 'text-green-600' : 'text-gray-500'}`}>{lbl}</span>
                  </div>
                ))}
              </div>
              <Link to="/profile" className="inline-flex items-center gap-2 px-5 py-2.5 bg-violet-600 text-white rounded-xl text-sm font-bold hover:bg-violet-700 transition-colors shadow-md">
                Continue Profile Setup <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ── Stat Cards ── */}
      {isApproved ? (
        <motion.div variants={stagger} initial="hidden" animate="show" className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div variants={fadeUp}><StatCard icon={ShoppingBag} label="Total Orders"    value="0" color="bg-blue-100 text-blue-600"   /></motion.div>
          <motion.div variants={fadeUp}><StatCard icon={Clock}       label="Pending Orders"  value="0" color="bg-amber-100 text-amber-600" /></motion.div>
          <motion.div variants={fadeUp}><StatCard icon={Banknote}    label="Revenue"          value="₹0" color="bg-green-100 text-green-600" /></motion.div>
          <motion.div variants={fadeUp}><StatCard icon={Package}     label="Products Listed" value="0" color="bg-violet-100 text-violet-600"/></motion.div>
        </motion.div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: ShoppingBag, label: 'Total Orders',    color: 'bg-blue-100 text-blue-400'   },
            { icon: Clock,       label: 'Pending Orders',  color: 'bg-amber-100 text-amber-400' },
            { icon: Banknote,    label: 'Revenue',          color: 'bg-green-100 text-green-400' },
            { icon: Package,     label: 'Products Listed', color: 'bg-violet-100 text-violet-400'},
          ].map((s, i) => (
            <div key={i} className="bg-gray-50 rounded-2xl border border-gray-200 p-5 opacity-50">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}><s.icon size={20} /></div>
              <p className="text-2xl font-bold text-gray-300">—</p>
              <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* ── Document Upload Status ── */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <FileText size={16} className="text-violet-600" />
            <h2 className="text-sm font-bold text-gray-800">Business Documents</h2>
          </div>
          <Link to="/profile" className="text-xs text-violet-600 font-semibold hover:text-violet-700 flex items-center gap-1">
            Manage <ArrowRight size={12} />
          </Link>
        </div>
        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {DOC_LIST.map((doc) => {
            const uploaded = !!documents?.[doc.key];
            return (
              <div key={doc.key} className={`flex items-center justify-between gap-3 px-4 py-3 rounded-xl border ${uploaded ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                <div className="flex items-center gap-2.5 min-w-0">
                  {uploaded
                    ? <CheckCircle size={15} className="text-green-500 flex-shrink-0" />
                    : <AlertCircle size={15} className={`flex-shrink-0 ${doc.required ? 'text-red-400' : 'text-gray-400'}`} />
                  }
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-gray-700 truncate">{doc.label}</p>
                    {uploaded && documents[doc.key]?.name && (
                      <p className="text-[10px] text-gray-500 truncate">{documents[doc.key].name}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  {doc.required && !uploaded && (
                    <span className="text-[9px] text-red-500 font-bold uppercase">Required</span>
                  )}
                  <DocBadge uploaded={uploaded} />
                </div>
              </div>
            );
          })}
        </div>
        <div className="px-6 pb-5">
          <div className="flex items-center justify-between mb-1.5">
            <p className="text-xs text-gray-500">
              {DOC_LIST.filter((d) => documents?.[d.key]).length} / {DOC_LIST.length} uploaded
            </p>
            <p className="text-xs text-gray-400">
              Required: {DOC_LIST.filter((d) => d.required && documents?.[d.key]).length} / {DOC_LIST.filter((d) => d.required).length}
            </p>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-violet-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(DOC_LIST.filter((d) => documents?.[d.key]).length / DOC_LIST.length) * 100}%` }}
              transition={{ duration: 0.8 }}
            />
          </div>
        </div>
      </div>

      {/* ── Orders & Products (locked if not approved) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {isApproved ? (
          <>
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <h2 className="text-sm font-bold text-gray-800">Recent Orders</h2>
                <Link to="/orders" className="text-xs text-violet-600 font-semibold hover:text-violet-700 flex items-center gap-1">View All <ArrowRight size={12} /></Link>
              </div>
              <div className="flex flex-col items-center justify-center py-12 text-center px-6">
                <ShoppingBag size={36} className="text-gray-300 mb-3" />
                <p className="text-sm font-semibold text-gray-500">No orders yet</p>
                <p className="text-xs text-gray-400 mt-1">Your orders will appear here once buyers start purchasing</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <h2 className="text-sm font-bold text-gray-800">Products</h2>
                <Link to="/products" className="text-xs text-violet-600 font-semibold hover:text-violet-700 flex items-center gap-1">Manage <ArrowRight size={12} /></Link>
              </div>
              <div className="flex flex-col items-center justify-center py-12 text-center px-6">
                <Package size={36} className="text-gray-300 mb-3" />
                <p className="text-sm font-semibold text-gray-500">No products listed</p>
                <Link to="/products" className="mt-3 px-5 py-2 bg-violet-600 text-white text-xs font-bold rounded-xl hover:bg-violet-700 transition-colors">
                  + Add Your First Product
                </Link>
              </div>
            </div>
          </>
        ) : (
          <>
            <LockedSection title="Recent Orders" icon={ShoppingBag} />
            <LockedSection title="Products" icon={Package} />
          </>
        )}
      </div>

    </div>
  );
};

export default DashboardPage;
