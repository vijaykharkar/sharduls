import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { X, Loader2 } from 'lucide-react';
import {
  loginEmailPassword,
  sendPhoneOTP,
  sendEmailOTP,
  loginPhoneOTP,
  loginEmailOTP,
  clearError,
  resetOtpState,
} from '../../store/slices/authSlice';

const LoginModal = ({ isOpen, onClose }) => {
  const [loginMethod, setLoginMethod] = useState('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');

  const dispatch = useDispatch();
  const { loading, error, otpSent, otpLoading } = useSelector((state) => state.auth);

  const handleClose = () => {
    setEmail(''); setPassword(''); setPhone(''); setOtp('');
    dispatch(clearError());
    dispatch(resetOtpState());
    onClose();
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try { await dispatch(loginEmailPassword({ email, password })).unwrap(); handleClose(); }
    catch (err) { console.error('Login failed:', err); }
  };

  const handleSendPhoneOTP = async () => {
    try { await dispatch(sendPhoneOTP(phone)).unwrap(); }
    catch (err) { console.error('Failed to send OTP:', err); }
  };

  const handleSendEmailOTP = async () => {
    try { await dispatch(sendEmailOTP(email)).unwrap(); }
    catch (err) { console.error('Failed to send OTP:', err); }
  };

  const handleVerifyPhoneOTP = async (e) => {
    e.preventDefault();
    try { await dispatch(loginPhoneOTP({ phone, otp })).unwrap(); handleClose(); }
    catch (err) { console.error('OTP verification failed:', err); }
  };

  const handleVerifyEmailOTP = async (e) => {
    e.preventDefault();
    try { await dispatch(loginEmailOTP({ email, otp })).unwrap(); handleClose(); }
    catch (err) { console.error('OTP verification failed:', err); }
  };

  if (!isOpen) return null;

  const inputClass = "w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-gold-400/30 focus:border-gold-400 outline-none transition-all";
  const btnPrimary = "w-full py-2.5 bg-gradient-to-r from-navy-500 to-navy-700 text-white rounded-xl font-semibold hover:from-navy-600 hover:to-navy-800 transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2";

  const tabClass = (active) =>
    `flex-1 py-2 px-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
      active ? 'bg-navy-500 text-white shadow-navy' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
    }`;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 relative shadow-strong animate-scaleIn">
        <button onClick={handleClose} className="absolute top-4 right-4 text-gray-300 hover:text-gray-500 cursor-pointer transition-colors">
          <X size={20} />
        </button>

        {/* Logo */}
        <div className="flex items-center gap-2 mb-5">
          <div className="w-9 h-9 bg-gradient-to-br from-gold-400 to-gold-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">S</span>
          </div>
          <div>
            <p className="text-navy-500 font-bold text-sm leading-tight">SHARDUL-GE</p>
            <p className="text-gold-400 text-[7px] tracking-widest">MARKETPLACE</p>
          </div>
        </div>

        <h2 className="text-xl font-bold text-navy-500 mb-1">Sign In</h2>
        <p className="text-gray-400 text-xs mb-5">Choose your preferred login method</p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-red-600 text-xs">{error}</p>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 mb-5">
          <button onClick={() => { setLoginMethod('email'); dispatch(resetOtpState()); }} className={tabClass(loginMethod === 'email')}>Email</button>
          <button onClick={() => { setLoginMethod('phone'); dispatch(resetOtpState()); }} className={tabClass(loginMethod === 'phone')}>Phone OTP</button>
          <button onClick={() => { setLoginMethod('emailOtp'); dispatch(resetOtpState()); }} className={tabClass(loginMethod === 'emailOtp')}>Email OTP</button>
        </div>

        {/* Email/Password */}
        {loginMethod === 'email' && (
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-navy-500 mb-1.5">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} placeholder="you@company.com" required />
            </div>
            <div>
              <label className="block text-xs font-semibold text-navy-500 mb-1.5">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} placeholder="Enter password" required />
            </div>
            <button type="submit" disabled={loading} className={btnPrimary}>
              {loading ? <><Loader2 size={16} className="animate-spin" /> Signing in...</> : 'Sign In'}
            </button>
          </form>
        )}

        {/* Phone OTP */}
        {loginMethod === 'phone' && (
          <div className="space-y-4">
            {!otpSent ? (
              <>
                <div>
                  <label className="block text-xs font-semibold text-navy-500 mb-1.5">Phone Number</label>
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 1234567890" className={inputClass} required />
                </div>
                <button onClick={handleSendPhoneOTP} disabled={otpLoading || !phone} className={btnPrimary}>
                  {otpLoading ? <><Loader2 size={16} className="animate-spin" /> Sending...</> : 'Send OTP'}
                </button>
              </>
            ) : (
              <form onSubmit={handleVerifyPhoneOTP} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-navy-500 mb-1.5">Enter OTP</label>
                  <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} maxLength={6} placeholder="123456" className={inputClass} required />
                </div>
                <button type="submit" disabled={loading} className={btnPrimary}>
                  {loading ? <><Loader2 size={16} className="animate-spin" /> Verifying...</> : 'Verify OTP'}
                </button>
                <button type="button" onClick={() => dispatch(resetOtpState())} className="w-full py-2 text-gold-400 hover:text-gold-500 text-xs font-semibold cursor-pointer">
                  Resend OTP
                </button>
              </form>
            )}
          </div>
        )}

        {/* Email OTP */}
        {loginMethod === 'emailOtp' && (
          <div className="space-y-4">
            {!otpSent ? (
              <>
                <div>
                  <label className="block text-xs font-semibold text-navy-500 mb-1.5">Email</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} placeholder="you@company.com" required />
                </div>
                <button onClick={handleSendEmailOTP} disabled={otpLoading || !email} className={btnPrimary}>
                  {otpLoading ? <><Loader2 size={16} className="animate-spin" /> Sending...</> : 'Send OTP'}
                </button>
              </>
            ) : (
              <form onSubmit={handleVerifyEmailOTP} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-navy-500 mb-1.5">Enter OTP</label>
                  <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} maxLength={6} placeholder="123456" className={inputClass} required />
                </div>
                <button type="submit" disabled={loading} className={btnPrimary}>
                  {loading ? <><Loader2 size={16} className="animate-spin" /> Verifying...</> : 'Verify OTP'}
                </button>
                <button type="button" onClick={() => dispatch(resetOtpState())} className="w-full py-2 text-gold-400 hover:text-gold-500 text-xs font-semibold cursor-pointer">
                  Resend OTP
                </button>
              </form>
            )}
          </div>
        )}

        <div className="mt-5 text-center">
          <p className="text-xs text-gray-400">
            Don't have an account?{' '}
            <Link to="/login" onClick={handleClose} className="text-gold-400 hover:text-gold-500 font-semibold">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
