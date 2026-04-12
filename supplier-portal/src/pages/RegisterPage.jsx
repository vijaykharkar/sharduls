import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, ArrowRight, ChevronDown, X, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const BG_IMAGE = 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=1920&q=80';

const PRODUCT_CATEGORIES = [
  'Electronics & Components', 'Textiles & Fabrics', 'Machinery & Equipment',
  'Food & Beverages', 'Chemicals & Petrochemicals', 'Medical Devices & Pharma',
  'Steel & Metal Products', 'Furniture & Fixtures', 'Plastics & Rubber',
  'Automotive Parts', 'Agriculture & Organic', 'Packaging Materials',
  'Jewellery & Gems', 'Leather Goods', 'Handicrafts & Artware',
];

const BUSINESS_MODELS = ['B2B', 'B2C', 'Both'];

const ic = 'w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-400 placeholder-gray-400 transition-all';

/* ── Stepper ── */
const Stepper = ({ step }) => (
  <div className="flex items-center justify-center mb-7">
    {[1, 2].map((s, idx) => (
      <React.Fragment key={s}>
        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${
          step >= s ? 'bg-violet-600 border-violet-600 text-white' : 'bg-white border-gray-300 text-gray-400'
        }`}>{step > s ? <Check size={16} /> : s}</div>
        {idx === 0 && (
          <div className="flex-1 mx-2 h-1 rounded-full overflow-hidden bg-gray-200 max-w-[80px]">
            <div className={`h-full rounded-full transition-all duration-500 ${step > 1 ? 'w-full bg-violet-600' : 'w-0'}`} />
          </div>
        )}
      </React.Fragment>
    ))}
  </div>
);

/* ── Multi-select dropdown ── */
const MultiSelect = ({ options, value, onChange, placeholder, error }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const toggle = (opt) => {
    onChange(value.includes(opt) ? value.filter((v) => v !== opt) : [...value, opt]);
  };

  return (
    <div ref={ref} className="relative">
      <button type="button" onClick={() => setOpen(!open)}
        className={`w-full px-4 py-2.5 bg-white border rounded-xl text-sm text-left flex items-center justify-between transition-all ${
          error ? 'border-red-400 focus:ring-red-200' : open ? 'border-violet-400 ring-2 ring-violet-200' : 'border-gray-200 hover:border-gray-300'
        }`}>
        <span className={value.length ? 'text-gray-800' : 'text-gray-400'}>
          {value.length ? `${value.length} selected` : placeholder}
        </span>
        <ChevronDown size={16} className={`text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {/* Selected tags */}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-2">
          {value.map((v) => (
            <span key={v} className="inline-flex items-center gap-1 px-2.5 py-1 bg-violet-50 text-violet-700 text-xs rounded-lg border border-violet-200 font-medium">
              {v}
              <button type="button" onClick={() => toggle(v)} className="hover:text-violet-900 cursor-pointer"><X size={12} /></button>
            </span>
          ))}
        </div>
      )}

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.15 }}
            className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-52 overflow-y-auto">
            {options.map((opt) => (
              <button key={opt} type="button" onClick={() => toggle(opt)}
                className={`w-full px-4 py-2.5 text-left text-sm flex items-center justify-between hover:bg-violet-50 transition-colors ${value.includes(opt) ? 'text-violet-700 font-medium bg-violet-50/60' : 'text-gray-700'}`}>
                {opt}
                {value.includes(opt) && <Check size={14} className="text-violet-600 flex-shrink-0" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ── Single Select dropdown ── */
const SingleSelect = ({ options, value, onChange, placeholder, error }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button type="button" onClick={() => setOpen(!open)}
        className={`w-full px-4 py-2.5 bg-white border rounded-xl text-sm text-left flex items-center justify-between transition-all ${
          error ? 'border-red-400' : open ? 'border-violet-400 ring-2 ring-violet-200' : 'border-gray-200 hover:border-gray-300'
        }`}>
        <span className={value ? 'text-gray-800 font-medium' : 'text-gray-400'}>{value || placeholder}</span>
        <ChevronDown size={16} className={`text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.15 }}
            className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
            {options.map((opt) => (
              <button key={opt} type="button" onClick={() => { onChange(opt); setOpen(false); }}
                className={`w-full px-4 py-2.5 text-left text-sm hover:bg-violet-50 transition-colors ${value === opt ? 'text-violet-700 font-semibold bg-violet-50' : 'text-gray-700'}`}>
                {opt}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ── OTP Box ── */
const OtpInput = ({ length = 6, value, onChange }) => {
  const refs = useRef([]);
  const handleChange = (i, v) => {
    if (!/^\d*$/.test(v)) return;
    const arr = value.split('');
    arr[i] = v.slice(-1);
    onChange(arr.join('').slice(0, length));
    if (v && i < length - 1) refs.current[i + 1]?.focus();
  };
  const handleKey = (i, e) => { if (e.key === 'Backspace' && !value[i] && i > 0) refs.current[i - 1]?.focus(); };
  return (
    <div className="flex gap-2 justify-center">
      {Array.from({ length }).map((_, i) => (
        <input key={i} ref={(el) => (refs.current[i] = el)}
          type="text" inputMode="numeric" maxLength={1} value={value[i] || ''}
          onChange={(e) => handleChange(i, e.target.value)} onKeyDown={(e) => handleKey(i, e)}
          className="w-11 h-12 text-center text-lg font-bold bg-white border-2 border-gray-200 rounded-xl text-gray-800 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition-all" />
      ))}
    </div>
  );
};

/* ── Main Component ── */
const RegisterPage = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(0);
  const [terms, setTerms] = useState(false);
  const [keepSigned, setKeepSigned] = useState(false);

  const [step1, setStep1] = useState({ phone: '', otp: '', email: '', fullName: '' });
  const [step2, setStep2] = useState({ businessModel: '', products: [], gstin: '' });

  const { register, sendOtp, verifyOtp } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => { if (timer > 0) { const t = setTimeout(() => setTimer(timer - 1), 1000); return () => clearTimeout(t); } }, [timer]);

  const up1 = (k, v) => setStep1((p) => ({ ...p, [k]: v }));
  const up2 = (k, v) => setStep2((p) => ({ ...p, [k]: v }));

  /* ── Step 1 validation ── */
  const validateStep1 = () => {
    const e = {};
    if (!/^\d{10}$/.test(step1.phone)) e.phone = 'Enter a valid 10-digit phone number';
    if (!otpSent) { e.otp = 'Please send and verify OTP first'; }
    else if (step1.otp.length !== 6) e.otp = 'Enter the 6-digit OTP';
    if (!step1.email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(step1.email)) e.email = 'Enter a valid email address';
    if (!step1.fullName.trim()) e.fullName = 'Full name is required';
    else if (step1.fullName.trim().length < 2) e.fullName = 'Name must be at least 2 characters';
    if (!terms) e.terms = 'You must accept the Terms & Conditions';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* ── Step 2 validation ── */
  const validateStep2 = () => {
    const e = {};
    if (!step2.businessModel) e.businessModel = 'Please select a business model';
    if (step2.products.length === 0) e.products = 'Select at least one product category';
    if (!step2.gstin.trim()) e.gstin = 'GSTIN is required';
    else if (!/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(step2.gstin.trim().toUpperCase()))
      e.gstin = 'Enter a valid GSTIN (e.g. 22AAAAA0000A1Z5)';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSendOtp = async () => {
    const e = {};
    if (!/^\d{10}$/.test(step1.phone)) { e.phone = 'Enter a valid 10-digit phone number'; setErrors(e); return; }
    setLoading(true);
    try {
      await sendOtp('+91' + step1.phone);
      setOtpSent(true); setTimer(30);
      addToast('OTP sent to +91' + step1.phone, 'info');
    } catch (err) {
      setErrors({ phone: err.message });
    } finally { setLoading(false); }
  };

  const handleNext = () => {
    if (validateStep1()) setStep(2);
  };

  const handleSubmit = async () => {
    if (!validateStep2()) return;
    setLoading(true);
    try {
      const user = await register({
        name: step1.fullName,
        email: step1.email,
        phone: '+91' + step1.phone,
        password: 'Temp@' + Math.random().toString(36).slice(2, 10),
        role: 'supplier',
      });
      addToast(`Welcome, ${user.full_name || user.name}!`, 'success');
      navigate('/dashboard');
    } catch (err) {
      setErrors({ submit: err.message });
    } finally { setLoading(false); }
  };

  const FieldError = ({ name }) => errors[name]
    ? <p className="mt-1 text-xs text-red-500">{errors[name]}</p>
    : null;

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden py-8">
      {/* Background */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('${BG_IMAGE}')` }} />
      <div className="absolute inset-0 bg-gradient-to-br from-violet-900/70 via-purple-800/60 to-indigo-900/70" />

      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-10">

          {/* Stepper */}
          <Stepper step={step} />

          {/* Header */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              {step === 1 ? 'Step 1 : Signup' : 'Step 2 : Important Details'}
            </h2>
          </div>

          {errors.submit && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-600 text-xs">{errors.submit}</p>
            </div>
          )}

          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.22 }} className="space-y-4">

                {/* Phone */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Phone number <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    <div className="flex items-center gap-1.5 px-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-600 whitespace-nowrap">
                      <span>🇮🇳</span><span>+91</span>
                    </div>
                    <input type="tel" value={step1.phone}
                      onChange={(e) => up1('phone', e.target.value.replace(/\D/g, '').slice(0, 10))}
                      className={ic} placeholder="Enter Phone Number" disabled={otpSent} />
                  </div>
                  <FieldError name="phone" />
                  {!otpSent && (
                    <button type="button" onClick={handleSendOtp} disabled={loading}
                      className="mt-2 text-xs text-violet-600 font-semibold hover:text-violet-700 cursor-pointer disabled:opacity-50 flex items-center gap-1">
                      {loading ? <Loader2 size={12} className="animate-spin" /> : null}
                      Send OTP
                    </button>
                  )}
                  {otpSent && (
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-green-600 font-medium">✓ OTP sent</span>
                      {timer > 0
                        ? <span className="text-xs text-gray-400">Resend in {timer}s</span>
                        : <button type="button" onClick={handleSendOtp} className="text-xs text-violet-600 font-semibold cursor-pointer">Resend</button>}
                    </div>
                  )}
                </div>

                {/* OTP */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    OTP <span className="text-red-500">*</span>
                  </label>
                  <input type="text" inputMode="numeric" maxLength={6} value={step1.otp}
                    onChange={(e) => up1('otp', e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className={ic} placeholder="Enter OTP" />
                  <FieldError name="otp" />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Email ID <span className="text-red-500">*</span>
                  </label>
                  <input type="email" value={step1.email} onChange={(e) => up1('email', e.target.value)}
                    className={ic} placeholder="Enter Email Id" />
                  <FieldError name="email" />
                </div>

                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input type="text" value={step1.fullName} onChange={(e) => up1('fullName', e.target.value)}
                    className={ic} placeholder="Enter Full Name" />
                  <FieldError name="fullName" />
                </div>

                {/* Terms */}
                <div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={terms} onChange={(e) => setTerms(e.target.checked)}
                      className="w-4 h-4 rounded accent-violet-600" />
                    <span className="text-xs text-gray-600">
                      I Accept The{' '}
                      <span className="text-violet-600 font-semibold underline cursor-pointer">Terms and Conditions</span>
                    </span>
                  </label>
                  <FieldError name="terms" />
                </div>

                {/* Keep signed in */}
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={keepSigned} onChange={(e) => setKeepSigned(e.target.checked)}
                    className="w-4 h-4 rounded accent-violet-600" />
                  <span className="text-xs text-gray-600">
                    Keep me signed in{' '}
                    <span className="text-violet-600 font-semibold underline cursor-pointer">Details</span>
                  </span>
                </label>

                {/* Next button */}
                <button type="button" onClick={handleNext}
                  className="w-full py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold rounded-xl hover:from-violet-700 hover:to-purple-700 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md mt-2">
                  Next <ArrowRight size={16} />
                </button>
              </motion.div>
            ) : (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.22 }} className="space-y-5">

                {/* Business Model */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    What is your business model? <span className="text-red-500">*</span>
                  </label>
                  <SingleSelect
                    options={BUSINESS_MODELS}
                    value={step2.businessModel}
                    onChange={(v) => up2('businessModel', v)}
                    placeholder="Select"
                    error={errors.businessModel}
                  />
                  <FieldError name="businessModel" />
                </div>

                {/* Products Multi-select */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Products You Wish To Sell <span className="text-red-500">*</span>
                  </label>
                  <MultiSelect
                    options={PRODUCT_CATEGORIES}
                    value={step2.products}
                    onChange={(v) => up2('products', v)}
                    placeholder="Categories"
                    error={errors.products}
                  />
                  <FieldError name="products" />
                </div>

                {/* GSTIN */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    GSTIN <span className="text-red-500">*</span>
                  </label>
                  <input type="text" value={step2.gstin}
                    onChange={(e) => up2('gstin', e.target.value.toUpperCase())}
                    className={`${ic} uppercase tracking-widest`}
                    placeholder="Enter GSTIN"
                    maxLength={15}
                  />
                  <FieldError name="gstin" />
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-1">
                  <button type="button" onClick={() => { setStep(1); setErrors({}); }}
                    className="flex-1 py-3 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all cursor-pointer">
                    Back
                  </button>
                  <button type="button" onClick={handleSubmit} disabled={loading}
                    className="flex-1 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold rounded-xl hover:from-violet-700 hover:to-purple-700 transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2 shadow-md">
                    {loading ? <><Loader2 size={16} className="animate-spin" /> Submitting…</> : 'Submit'}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="text-center text-xs text-gray-500 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-violet-600 font-semibold hover:text-violet-700">Sign In</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
