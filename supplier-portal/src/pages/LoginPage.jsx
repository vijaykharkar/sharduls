import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Eye, EyeOff, Loader2, Phone, ArrowRight } from 'lucide-react';
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
    {[...Array(20)].map((_, i) => (
      <motion.div key={`dot-${i}`} className="absolute w-1 h-1 bg-primary/10 rounded-full"
        style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
        animate={{ x: [0, (Math.random() - 0.5) * 40], y: [0, (Math.random() - 0.5) * 40] }}
        transition={{ duration: 8 + Math.random() * 8, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
      />
    ))}
  </div>
);

const OtpInput = ({ length = 6, value, onChange }) => {
  const refs = useRef([]);
  const handleChange = (i, v) => {
    if (!/^\d*$/.test(v)) return;
    const arr = value.split('');
    arr[i] = v.slice(-1);
    const next = arr.join('').slice(0, length);
    onChange(next);
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

const LoginPage = () => {
  const [tab, setTab] = useState('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(false);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, sendOtp, verifyOtp } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => { if (timer > 0) { const t = setTimeout(() => setTimer(timer - 1), 1000); return () => clearTimeout(t); } }, [timer]);

  const handleEmailLogin = async (e) => {
    e.preventDefault(); setError('');
    if (!email || !password) { setError('All fields are required'); return; }
    setLoading(true);
    try {
      const user = await login(email, password);
      addToast(`Welcome back, ${user.name}!`, 'success');
      navigate(user.role === 'admin' ? '/admin' : '/dashboard');
    } catch (err) { setError(err.message); } finally { setLoading(false); }
  };

  const handleSendOtp = async () => {
    setError('');
    if (!/^\d{10}$/.test(phone)) { setError('Enter a valid 10-digit number'); return; }
    setLoading(true);
    try {
      const res = await sendOtp(phone);
      setOtpSent(true); setTimer(30);
      addToast(`OTP sent to ${res.maskedPhone}`, 'info');
    } catch (err) { setError(err.message); } finally { setLoading(false); }
  };

  const handleVerifyOtp = async () => {
    setError('');
    if (otp.length !== 6) { setError('Enter 6-digit OTP'); return; }
    setLoading(true);
    try {
      const user = await verifyOtp(phone, otp);
      addToast(`Welcome back, ${user.name}!`, 'success');
      navigate(user.role === 'admin' ? '/admin' : '/dashboard');
    } catch (err) { setError(err.message); } finally { setLoading(false); }
  };

  const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
  const fadeUp = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };
  const ic = 'w-full px-4 py-2.5 bg-[#0A0D14] border border-border rounded-xl text-sm text-highlight outline-none focus:ring-1 focus:ring-primary placeholder-muted transition-all';

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12 relative">
      <FloatingBg />
      <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.4 }} className="relative z-10 w-full max-w-md">
        <motion.div variants={stagger} initial="hidden" animate="show" className="bg-surface border border-border rounded-2xl shadow-strong p-10 sm:p-12">
          {/* Logo */}
          <motion.div variants={fadeUp} className="text-center mb-6">
            <div className="w-14 h-14 mx-auto mb-3 rounded-xl chrome-gradient flex items-center justify-center">
              <GearIcon className="w-7 h-7 text-background animate-gearSpin" />
            </div>
            <h1 className="text-2xl font-bold text-highlight tracking-wide">NexaForge</h1>
            <p className="text-muted text-xs tracking-[0.2em] uppercase mt-0.5">Supplier Portal</p>
          </motion.div>

          <motion.div variants={fadeUp} className="h-px bg-border mb-6" />

          {/* Tab Toggle */}
          <motion.div variants={fadeUp} className="flex bg-[#0A0D14] rounded-xl p-1 mb-6">
            {['email', 'phone'].map((t) => (
              <button key={t} onClick={() => { setTab(t); setError(''); setOtpSent(false); setOtp(''); }} className={`flex-1 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all ${tab === t ? 'bg-accent text-white shadow-lg' : 'text-muted hover:text-highlight'}`}>
                {t === 'email' ? 'Email / Password' : 'Phone OTP'}
              </button>
            ))}
          </motion.div>

          {error && <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl"><p className="text-red-400 text-xs">{error}</p></div>}

          <AnimatePresence mode="wait">
            {tab === 'email' ? (
              <motion.form key="email-form" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.2 }} onSubmit={handleEmailLogin} className="space-y-4">
                <motion.div variants={fadeUp}>
                  <label className="block text-xs font-semibold text-highlight mb-1.5">Email Address</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={`${ic} pl-10`} placeholder="you@company.com" />
                  </div>
                </motion.div>
                <motion.div variants={fadeUp}>
                  <label className="block text-xs font-semibold text-highlight mb-1.5">Password</label>
                  <div className="relative">
                    <input type={showPw ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} className={`${ic} pr-10`} placeholder="••••••••" />
                    <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-highlight cursor-pointer">{showPw ? <EyeOff size={18} /> : <Eye size={18} />}</button>
                  </div>
                </motion.div>
                <motion.div variants={fadeUp} className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="w-4 h-4 rounded border-border accent-[#E53E3E]" /><span className="text-xs text-muted">Remember me</span></label>
                  <button type="button" className="text-xs text-primary font-semibold hover:text-primary-light cursor-pointer">Forgot password?</button>
                </motion.div>
                <motion.div variants={fadeUp}>
                  <button type="submit" disabled={loading} className="w-full py-3 chrome-gradient text-background font-bold rounded-xl hover:shadow-chrome hover:brightness-110 transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2">
                    {loading ? <><Loader2 size={16} className="animate-spin" /> Signing in…</> : <>Sign In <ArrowRight size={16} /></>}
                  </button>
                </motion.div>
              </motion.form>
            ) : (
              <motion.div key="phone-form" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-highlight mb-1.5">Phone Number</label>
                  <div className="flex gap-2">
                    <div className="flex items-center gap-1 px-3 bg-[#0A0D14] border border-border rounded-xl text-sm text-muted"><span>🇮🇳</span><span>+91</span></div>
                    <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))} className={ic} placeholder="10 digit number" disabled={otpSent} />
                  </div>
                </div>
                {!otpSent ? (
                  <button onClick={handleSendOtp} disabled={loading} className="w-full py-3 chrome-gradient text-background font-bold rounded-xl hover:shadow-chrome hover:brightness-110 transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2">
                    {loading ? <><Loader2 size={16} className="animate-spin" /> Sending…</> : <>Send OTP <ArrowRight size={16} /></>}
                  </button>
                ) : (
                  <>
                    <div>
                      <label className="block text-xs font-semibold text-highlight mb-2 text-center">Enter 6-digit OTP</label>
                      <OtpInput value={otp} onChange={setOtp} />
                    </div>
                    <div className="text-center">
                      {timer > 0 ? <p className="text-xs text-muted">Resend in {timer}s</p> : <button onClick={handleSendOtp} className="text-xs text-primary font-semibold cursor-pointer hover:text-primary-light">Resend OTP</button>}
                    </div>
                    <button onClick={handleVerifyOtp} disabled={loading} className="w-full py-3 chrome-gradient text-background font-bold rounded-xl hover:shadow-chrome hover:brightness-110 transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2">
                      {loading ? <><Loader2 size={16} className="animate-spin" /> Verifying…</> : <>Verify & Login <ArrowRight size={16} /></>}
                    </button>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div variants={fadeUp} className="mt-6 text-center">
            <p className="text-xs text-muted">New supplier? <Link to="/register" className="text-primary font-semibold hover:text-primary-light">Register here</Link></p>
          </motion.div>
        </motion.div>

        <motion.p variants={fadeUp} initial="hidden" animate="show" className="text-[10px] text-muted mt-4 text-center">
          Admin: admin@nexaforge.com / Admin@2026 &nbsp;|&nbsp; Supplier: supplier@nexaforge.com / Supplier@2026
        </motion.p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
