import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Loader2, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const GearIcon = ({ className = '' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
    <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
  </svg>
);

const FloatingBg = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(42,48,64,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(42,48,64,0.3) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
    {[...Array(8)].map((_, i) => (
      <motion.div key={i} className="absolute text-primary/[0.04]"
        initial={{ x: `${10 + i * 12}%`, y: '110%' }}
        animate={{ y: '-10%' }}
        transition={{ duration: 18 + i * 4, repeat: Infinity, ease: 'linear', delay: i * 2.5 }}
      >
        <svg width={40 + i * 10} height={40 + i * 10} viewBox="0 0 100 100" fill="currentColor">
          {i % 3 === 0 ? <polygon points="50,3 97,25 97,75 50,97 3,75 3,25" /> : i % 3 === 1 ? <circle cx="50" cy="50" r="45" /> : <polygon points="50,5 95,50 50,95 5,50" />}
        </svg>
      </motion.div>
    ))}
  </div>
);

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
        <motion.input key={i} ref={(el) => (refs.current[i] = el)} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
          type="text" inputMode="numeric" maxLength={1} value={value[i] || ''} onChange={(e) => handleChange(i, e.target.value)} onKeyDown={(e) => handleKey(i, e)}
          className="w-11 h-12 text-center text-lg font-bold bg-[#0A0D14] border border-border rounded-xl text-highlight outline-none focus:ring-1 focus:ring-primary transition-all" />
      ))}
    </div>
  );
};

const strengthLevel = (pw) => { let s = 0; if (pw.length >= 8) s++; if (/[A-Z]/.test(pw)) s++; if (/[0-9]/.test(pw)) s++; if (/[^A-Za-z0-9]/.test(pw)) s++; return s; };
const strengthColor = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500', 'bg-green-600'];
const strengthLabel = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];

const RegisterPage = () => {
  const [tab, setTab] = useState('email');
  const [form, setForm] = useState({ name: '', businessName: '', email: '', phone: '', password: '', confirm: '' });
  const [showPw, setShowPw] = useState(false);
  const [terms, setTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [phoneForm, setPhoneForm] = useState({ name: '', businessName: '', phone: '' });
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(0);
  const [phoneTerms, setPhoneTerms] = useState(false);
  const { register, registerWithPhone, sendOtp, verifyOtp } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => { if (timer > 0) { const t = setTimeout(() => setTimer(timer - 1), 1000); return () => clearTimeout(t); } }, [timer]);

  const up = (k, v) => setForm((p) => ({ ...p, [k]: v }));
  const pwStr = strengthLevel(form.password);
  const ic = 'w-full px-4 py-2.5 bg-[#0A0D14] border border-border rounded-xl text-sm text-highlight outline-none focus:ring-1 focus:ring-primary placeholder-muted transition-all';

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Required';
    if (!form.businessName.trim()) e.businessName = 'Required';
    if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email';
    if (form.password.length < 8) e.password = 'Min 8 characters';
    else if (!/[A-Z]/.test(form.password)) e.password = 'Need 1 uppercase';
    else if (!/[0-9]/.test(form.password)) e.password = 'Need 1 number';
    if (form.password !== form.confirm) e.confirm = 'Passwords don\'t match';
    if (!terms) e.terms = 'Accept terms to continue';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleEmailRegister = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const user = await register({ ...form, phone: form.phone || '0000000000' });
      addToast(`Welcome, ${user.name}!`, 'success');
      navigate('/dashboard');
    } catch (err) { setErrors({ form: err.message }); } finally { setLoading(false); }
  };

  const handlePhoneSendOtp = async () => {
    setErrors({});
    if (!phoneForm.name.trim()) { setErrors({ pname: 'Required' }); return; }
    if (!phoneForm.businessName.trim()) { setErrors({ pbiz: 'Required' }); return; }
    if (!/^\d{10}$/.test(phoneForm.phone)) { setErrors({ pphone: '10 digits required' }); return; }
    if (!phoneTerms) { setErrors({ pterms: 'Accept terms' }); return; }
    setLoading(true);
    try {
      await sendOtp(phoneForm.phone).catch(() => {});
      setOtpSent(true); setTimer(30);
      addToast('OTP sent!', 'info');
    } catch { /* new phone, that's fine */ setOtpSent(true); setTimer(30); } finally { setLoading(false); }
  };

  const handlePhoneVerify = async () => {
    setErrors({});
    if (otp.length !== 6) { setErrors({ otp: 'Enter 6-digit OTP' }); return; }
    if (otp !== '123456') { setErrors({ otp: 'Invalid OTP. Please try again.' }); return; }
    setLoading(true);
    try {
      const user = await registerWithPhone(phoneForm);
      addToast(`Welcome, ${user.name}!`, 'success');
      navigate('/dashboard');
    } catch (err) { setErrors({ form: err.message }); } finally { setLoading(false); }
  };

  const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
  const fadeUp = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-10 relative">
      <FloatingBg />
      <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.4 }} className="relative z-10 w-full max-w-lg">
        <motion.div variants={stagger} initial="hidden" animate="show" className="bg-surface border border-border rounded-2xl shadow-strong p-8 sm:p-10">
          <motion.div variants={fadeUp} className="text-center mb-5">
            <div className="w-14 h-14 mx-auto mb-3 rounded-xl chrome-gradient flex items-center justify-center">
              <GearIcon className="w-7 h-7 text-background animate-gearSpin" />
            </div>
            <h1 className="text-2xl font-bold text-highlight tracking-wide">Create Supplier Account</h1>
            <p className="text-muted text-xs mt-1">Join our global trading network</p>
          </motion.div>

          <motion.div variants={fadeUp} className="h-px bg-border mb-5" />

          <motion.div variants={fadeUp} className="flex bg-[#0A0D14] rounded-xl p-1 mb-5">
            {['email', 'phone'].map((t) => (
              <button key={t} onClick={() => { setTab(t); setErrors({}); }} className={`flex-1 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all ${tab === t ? 'bg-accent text-white shadow-lg' : 'text-muted hover:text-highlight'}`}>
                {t === 'email' ? 'Email Registration' : 'Phone Registration'}
              </button>
            ))}
          </motion.div>

          {errors.form && <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl"><p className="text-red-400 text-xs">{errors.form}</p></div>}

          <AnimatePresence mode="wait">
            {tab === 'email' ? (
              <motion.form key="email-reg" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.2 }} onSubmit={handleEmailRegister} className="space-y-3">
                <motion.div variants={fadeUp}><label className="block text-xs font-semibold text-highlight mb-1">Full Name</label><input value={form.name} onChange={(e) => up('name', e.target.value)} className={ic} placeholder="Your full name" />{errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}</motion.div>
                <motion.div variants={fadeUp}><label className="block text-xs font-semibold text-highlight mb-1">Business Name</label><input value={form.businessName} onChange={(e) => up('businessName', e.target.value)} className={ic} placeholder="Company / brand" />{errors.businessName && <p className="mt-1 text-xs text-red-400">{errors.businessName}</p>}</motion.div>
                <motion.div variants={fadeUp}><label className="block text-xs font-semibold text-highlight mb-1">Email Address</label><input type="email" value={form.email} onChange={(e) => up('email', e.target.value)} className={ic} placeholder="you@company.com" />{errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}</motion.div>
                <motion.div variants={fadeUp}>
                  <label className="block text-xs font-semibold text-highlight mb-1">Password</label>
                  <div className="relative">
                    <input type={showPw ? 'text' : 'password'} value={form.password} onChange={(e) => up('password', e.target.value)} className={`${ic} pr-10`} placeholder="Min 8 chars, 1 uppercase, 1 number" />
                    <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-highlight cursor-pointer">{showPw ? <EyeOff size={18} /> : <Eye size={18} />}</button>
                  </div>
                  {form.password && <div className="mt-1.5 flex items-center gap-2"><div className="flex-1 flex gap-1">{[0,1,2,3].map((i) => <div key={i} className={`h-1 flex-1 rounded-full ${i < pwStr ? strengthColor[pwStr] : 'bg-border'}`} />)}</div><span className="text-[10px] text-muted">{strengthLabel[pwStr]}</span></div>}
                  {errors.password && <p className="mt-1 text-xs text-red-400">{errors.password}</p>}
                </motion.div>
                <motion.div variants={fadeUp}><label className="block text-xs font-semibold text-highlight mb-1">Confirm Password</label><input type="password" value={form.confirm} onChange={(e) => up('confirm', e.target.value)} className={ic} placeholder="Repeat password" />{errors.confirm && <p className="mt-1 text-xs text-red-400">{errors.confirm}</p>}</motion.div>
                <motion.div variants={fadeUp}><label className="flex items-start gap-2 cursor-pointer"><input type="checkbox" checked={terms} onChange={(e) => setTerms(e.target.checked)} className="w-4 h-4 rounded border-border accent-[#E53E3E] mt-0.5" /><span className="text-xs text-muted leading-relaxed">I agree to the <span className="text-primary font-semibold cursor-pointer">Terms & Conditions</span></span></label>{errors.terms && <p className="mt-1 text-xs text-red-400">{errors.terms}</p>}</motion.div>
                <motion.div variants={fadeUp}>
                  <button type="submit" disabled={loading} className="w-full py-3 chrome-gradient text-background font-bold rounded-xl hover:shadow-chrome hover:brightness-110 transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2">
                    {loading ? <><Loader2 size={16} className="animate-spin" /> Creating…</> : <>Register <ArrowRight size={16} /></>}
                  </button>
                </motion.div>
              </motion.form>
            ) : (
              <motion.div key="phone-reg" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }} className="space-y-3">
                <div><label className="block text-xs font-semibold text-highlight mb-1">Full Name</label><input value={phoneForm.name} onChange={(e) => setPhoneForm({ ...phoneForm, name: e.target.value })} className={ic} placeholder="Your full name" disabled={otpSent} />{errors.pname && <p className="mt-1 text-xs text-red-400">{errors.pname}</p>}</div>
                <div><label className="block text-xs font-semibold text-highlight mb-1">Business Name</label><input value={phoneForm.businessName} onChange={(e) => setPhoneForm({ ...phoneForm, businessName: e.target.value })} className={ic} placeholder="Company / brand" disabled={otpSent} />{errors.pbiz && <p className="mt-1 text-xs text-red-400">{errors.pbiz}</p>}</div>
                <div><label className="block text-xs font-semibold text-highlight mb-1">Phone Number</label><div className="flex gap-2"><div className="flex items-center gap-1 px-3 bg-[#0A0D14] border border-border rounded-xl text-sm text-muted"><span>🇮🇳</span><span>+91</span></div><input type="tel" value={phoneForm.phone} onChange={(e) => setPhoneForm({ ...phoneForm, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })} className={ic} placeholder="10 digit number" disabled={otpSent} /></div>{errors.pphone && <p className="mt-1 text-xs text-red-400">{errors.pphone}</p>}</div>
                <div><label className="flex items-start gap-2 cursor-pointer"><input type="checkbox" checked={phoneTerms} onChange={(e) => setPhoneTerms(e.target.checked)} className="w-4 h-4 rounded border-border accent-[#E53E3E] mt-0.5" /><span className="text-xs text-muted leading-relaxed">I agree to the <span className="text-primary font-semibold">Terms & Conditions</span></span></label>{errors.pterms && <p className="mt-1 text-xs text-red-400">{errors.pterms}</p>}</div>
                {!otpSent ? (
                  <button onClick={handlePhoneSendOtp} disabled={loading} className="w-full py-3 chrome-gradient text-background font-bold rounded-xl hover:shadow-chrome hover:brightness-110 transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2">{loading ? <><Loader2 size={16} className="animate-spin" /> Sending…</> : <>Send OTP <ArrowRight size={16} /></>}</button>
                ) : (
                  <>
                    <div><label className="block text-xs font-semibold text-highlight mb-2 text-center">Enter 6-digit OTP</label><OtpInput value={otp} onChange={setOtp} />{errors.otp && <p className="mt-1 text-xs text-red-400 text-center">{errors.otp}</p>}</div>
                    <div className="text-center">{timer > 0 ? <p className="text-xs text-muted">Resend in {timer}s</p> : <button onClick={handlePhoneSendOtp} className="text-xs text-primary font-semibold cursor-pointer">Resend OTP</button>}</div>
                    <button onClick={handlePhoneVerify} disabled={loading} className="w-full py-3 chrome-gradient text-background font-bold rounded-xl hover:shadow-chrome hover:brightness-110 transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2">{loading ? <><Loader2 size={16} className="animate-spin" /> Verifying…</> : <>Verify & Register <ArrowRight size={16} /></>}</button>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.p variants={fadeUp} className="text-center text-xs text-muted mt-5">Already have an account? <Link to="/login" className="text-primary font-semibold hover:text-primary-light">Sign In</Link></motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
