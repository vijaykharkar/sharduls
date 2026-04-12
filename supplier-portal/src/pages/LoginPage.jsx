import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Eye, EyeOff, Loader2, Phone, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const BG_IMAGE = 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=1920&q=80';

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
        <input key={i} ref={(el) => (refs.current[i] = el)}
          type="text" inputMode="numeric" maxLength={1} value={value[i] || ''}
          onChange={(e) => handleChange(i, e.target.value)} onKeyDown={(e) => handleKey(i, e)}
          className="w-11 h-12 text-center text-lg font-bold bg-white border-2 border-gray-200 rounded-xl text-gray-800 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition-all" />
      ))}
    </div>
  );
};

const ic = 'w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-400 placeholder-gray-400 transition-all';

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
    if (!email.trim()) { setError('Email is required'); return; }
    if (!/\S+@\S+\.\S+/.test(email)) { setError('Enter a valid email address'); return; }
    if (!password) { setError('Password is required'); return; }
    setLoading(true);
    try {
      const user = await login(email, password);
      addToast(`Welcome back, ${user.full_name || user.name}!`, 'success');
      const role = user.role;
      navigate(role === 'admin' || role === 'superadmin' ? '/admin' : '/dashboard');
    } catch (err) { setError(err.message); } finally { setLoading(false); }
  };

  const handleSendOtp = async () => {
    setError('');
    if (!/^\d{10}$/.test(phone)) { setError('Enter a valid 10-digit phone number'); return; }
    setLoading(true);
    try {
      await sendOtp('+91' + phone);
      setOtpSent(true); setTimer(30);
      addToast('OTP sent successfully!', 'info');
    } catch (err) { setError(err.message); } finally { setLoading(false); }
  };

  const handleVerifyOtp = async () => {
    setError('');
    if (otp.length !== 6) { setError('Enter the 6-digit OTP'); return; }
    setLoading(true);
    try {
      const user = await verifyOtp('+91' + phone, otp);
      addToast(`Welcome back, ${user.full_name || user.name}!`, 'success');
      navigate(user.role === 'admin' || user.role === 'superadmin' ? '/admin' : '/dashboard');
    } catch (err) { setError(err.message); } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${BG_IMAGE}')` }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-900/70 via-purple-800/60 to-indigo-900/70" />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-10">
          {/* Logo + Header */}
          <div className="text-center mb-7">
            <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center shadow-lg">
              <ShieldCheck className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
            <p className="text-gray-500 text-sm mt-1">Sign in to your Supplier Portal</p>
          </div>

          <div className="h-px bg-gray-100 mb-6" />

          {/* Tab Toggle */}
          <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
            {['email', 'phone'].map((t) => (
              <button key={t} onClick={() => { setTab(t); setError(''); setOtpSent(false); setOtp(''); }}
                className={`flex-1 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all ${tab === t ? 'bg-violet-600 text-white shadow' : 'text-gray-500 hover:text-gray-700'}`}>
                {t === 'email' ? 'Email / Password' : 'Phone OTP'}
              </button>
            ))}
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-600 text-xs">{error}</p>
            </div>
          )}

          <AnimatePresence mode="wait">
            {tab === 'email' ? (
              <motion.form key="email-form" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 16 }} transition={{ duration: 0.2 }} onSubmit={handleEmailLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Email Address</label>
                  <div className="relative">
                    <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={`${ic} pl-9`} placeholder="you@company.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Password</label>
                  <div className="relative">
                    <input type={showPw ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} className={`${ic} pr-10`} placeholder="••••••••" />
                    <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer">{showPw ? <EyeOff size={17} /> : <Eye size={17} />}</button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="w-4 h-4 rounded accent-violet-600" />
                    <span className="text-xs text-gray-500">Remember me</span>
                  </label>
                  <button type="button" className="text-xs text-violet-600 font-semibold hover:text-violet-700 cursor-pointer">Forgot password?</button>
                </div>
                <button type="submit" disabled={loading} className="w-full py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold rounded-xl hover:from-violet-700 hover:to-purple-700 transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2 shadow-md">
                  {loading ? <><Loader2 size={16} className="animate-spin" /> Signing in…</> : <>Sign In <ArrowRight size={16} /></>}
                </button>
              </motion.form>
            ) : (
              <motion.div key="phone-form" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.2 }} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Phone Number</label>
                  <div className="flex gap-2">
                    <div className="flex items-center gap-1.5 px-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-600 whitespace-nowrap">
                      <span>🇮🇳</span><span>+91</span>
                    </div>
                    <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))} className={ic} placeholder="10 digit number" disabled={otpSent} />
                  </div>
                </div>
                {!otpSent ? (
                  <button onClick={handleSendOtp} disabled={loading} className="w-full py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold rounded-xl hover:from-violet-700 hover:to-purple-700 transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2 shadow-md">
                    {loading ? <><Loader2 size={16} className="animate-spin" /> Sending…</> : <>Send OTP <ArrowRight size={16} /></>}
                  </button>
                ) : (
                  <>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-2 text-center">Enter 6-digit OTP</label>
                      <OtpInput value={otp} onChange={setOtp} />
                    </div>
                    <div className="text-center">
                      {timer > 0
                        ? <p className="text-xs text-gray-400">Resend in {timer}s</p>
                        : <button onClick={handleSendOtp} className="text-xs text-violet-600 font-semibold cursor-pointer hover:text-violet-700">Resend OTP</button>}
                    </div>
                    <button onClick={handleVerifyOtp} disabled={loading} className="w-full py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold rounded-xl hover:from-violet-700 hover:to-purple-700 transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2 shadow-md">
                      {loading ? <><Loader2 size={16} className="animate-spin" /> Verifying…</> : <>Verify & Login <ArrowRight size={16} /></>}
                    </button>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">New supplier? <Link to="/register" className="text-violet-600 font-semibold hover:text-violet-700">Register here</Link></p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
