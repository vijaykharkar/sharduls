import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Phone, Loader2, Eye, EyeOff } from 'lucide-react';
import useAuth from '../../hooks/useAuth';

const ic = 'w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 outline-none focus:ring-2 focus:ring-[#d4a853]/20 focus:border-[#d4a853] placeholder-gray-400 transition-all';

function LoginForm() {
  const { login, closeAuthModal } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try { await login(email, password); } catch { /* toast handles */ }
    finally { setLoading(false); }
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="relative">
        <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className={ic} required />
      </div>
      <div className="relative">
        <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input type={showPw ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className={`${ic} pr-10`} required />
        <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer">
          {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
      <button type="submit" disabled={loading}
        className="w-full py-2.5 bg-[#0a1929] text-white rounded-xl font-semibold text-sm hover:bg-[#102a43] disabled:opacity-60 transition-colors flex items-center justify-center gap-2 cursor-pointer">
        {loading ? <Loader2 size={16} className="animate-spin" /> : null} Login
      </button>
    </form>
  );
}

function RegisterForm() {
  const { register } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try { await register(form); } catch { /* toast handles */ }
    finally { setLoading(false); }
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="relative">
        <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input type="text" value={form.name} onChange={set('name')} placeholder="Full Name" className={ic} required />
      </div>
      <div className="relative">
        <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input type="email" value={form.email} onChange={set('email')} placeholder="Email" className={ic} required />
      </div>
      <div className="relative">
        <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input type="tel" value={form.phone} onChange={set('phone')} placeholder="Phone (optional)" className={ic} />
      </div>
      <div className="relative">
        <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input type={showPw ? 'text' : 'password'} value={form.password} onChange={set('password')} placeholder="Password" className={`${ic} pr-10`} required minLength={6} />
        <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer">
          {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
      <button type="submit" disabled={loading}
        className="w-full py-2.5 bg-[#0a1929] text-white rounded-xl font-semibold text-sm hover:bg-[#102a43] disabled:opacity-60 transition-colors flex items-center justify-center gap-2 cursor-pointer">
        {loading ? <Loader2 size={16} className="animate-spin" /> : null} Create Account
      </button>
    </form>
  );
}

export default function AuthModal() {
  const { authModalOpen, authModalTab, closeAuthModal, openAuthModal } = useAuth();

  return (
    <AnimatePresence>
      {authModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeAuthModal} />
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
            <button onClick={closeAuthModal} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer z-10">
              <X size={20} />
            </button>

            {/* Header */}
            <div className="bg-gradient-to-br from-[#102a43] to-[#d4a853] px-6 pt-8 pb-6 text-white">
              <h2 className="text-xl font-bold">{authModalTab === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
              <p className="text-white/70 text-sm mt-1">{authModalTab === 'login' ? 'Login to access your account' : 'Join us for the best deals'}</p>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200">
              {['login', 'register'].map((tab) => (
                <button key={tab} onClick={() => openAuthModal(tab)}
                  className={`flex-1 py-3 text-sm font-semibold transition-colors cursor-pointer ${authModalTab === tab ? 'text-[#d4a853] border-b-2 border-[#d4a853]' : 'text-gray-500 hover:text-gray-700'}`}>
                  {tab === 'login' ? 'Login' : 'Register'}
                </button>
              ))}
            </div>

            {/* Form */}
            <div className="p-6">
              {authModalTab === 'login' ? <LoginForm /> : <RegisterForm />}
              <p className="text-center text-xs text-gray-400 mt-4">
                {authModalTab === 'login' ? "Don't have an account? " : 'Already have an account? '}
                <button onClick={() => openAuthModal(authModalTab === 'login' ? 'register' : 'login')} className="text-[#d4a853] font-semibold cursor-pointer hover:underline">
                  {authModalTab === 'login' ? 'Register' : 'Login'}
                </button>
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
