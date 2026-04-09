import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Phone, Eye, EyeOff, Shield, Globe, Award, ArrowRight, Loader2, CheckCircle2, AlertCircle, ShieldCheck, Truck, ShoppingBag } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('phone');

  // ─── Phone + OTP State ───
  const [phone, setPhone] = useState('');
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpTouched, setOtpTouched] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [phoneError, setPhoneError] = useState('');
  const [otpError, setOtpError] = useState('');
  const [otpSuccess, setOtpSuccess] = useState('');
  const otpRefs = useRef([]);

  // ─── Email State ───
  const [email, setEmail] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailError, setEmailError] = useState('');

  // ─── Role State ───
  const [selectedRole, setSelectedRole] = useState('admin');
  const roles = [
    { id: 'admin', label: 'Admin', icon: <ShieldCheck size={16} />, desc: 'Platform management' },
    { id: 'supplier', label: 'Supplier', icon: <Truck size={16} />, desc: 'Sell & manage orders' },
    { id: 'buyer', label: 'Buyer', icon: <ShoppingBag size={16} />, desc: 'Browse & purchase' },
  ];

  // ─── Validation helpers ───
  const isPhoneValid = /^[6-9]\d{9}$/.test(phone);
  const otpString = otp.join('');
  const isOtpValid = /^\d{6}$/.test(otpString);
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPasswordValid = password.length >= 6;

  const phoneValidationMsg = phoneTouched && phone.length > 0 && !isPhoneValid
    ? 'Enter a valid 10-digit mobile number' : '';
  const emailValidationMsg = emailTouched && email.length > 0 && !isEmailValid
    ? 'Enter a valid email address' : '';
  const passwordValidationMsg = passwordTouched && password.length > 0 && !isPasswordValid
    ? 'Password must be at least 6 characters' : '';

  // ─── Resend timer ───
  useEffect(() => {
    if (resendTimer <= 0) return;
    const interval = setInterval(() => setResendTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [resendTimer]);

  // ─── Reset when switching tabs ───
  const switchTab = (tab) => {
    setActiveTab(tab);
    setPhoneError('');
    setOtpError('');
    setOtpSuccess('');
    setEmailError('');
  };

  // ─── Send OTP ───
  const handleSendOtp = useCallback(async () => {
    if (!isPhoneValid) return;
    setSendingOtp(true);
    setPhoneError('');
    setOtpSuccess('');
    try {
      // TODO: await supplierService.sendOtp({ phone_number: phone });
      await new Promise((r) => setTimeout(r, 1200));
      setOtpSent(true);
      setOtp(['', '', '', '', '', '']);
      setOtpTouched(false);
      setResendTimer(30);
      setOtpSuccess(`OTP sent to +91 ${phone}`);
      setTimeout(() => otpRefs.current[0]?.focus(), 100);
    } catch (err) {
      setPhoneError(err?.response?.data?.message || 'Failed to send OTP. Please try again.');
    } finally {
      setSendingOtp(false);
    }
  }, [isPhoneValid, phone]);

  // ─── OTP input handlers ───
  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setOtpTouched(true);
    setOtpError('');
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasted.length === 0) return;
    const newOtp = [...otp];
    for (let i = 0; i < 6; i++) {
      newOtp[i] = pasted[i] || '';
    }
    setOtp(newOtp);
    setOtpTouched(true);
    const focusIdx = Math.min(pasted.length, 5);
    otpRefs.current[focusIdx]?.focus();
  };

  // ─── Verify OTP ───
  const handleVerifyOtp = async () => {
    if (!isOtpValid) return;
    setVerifyingOtp(true);
    setOtpError('');
    try {
      // TODO: const result = await supplierService.verifyOtp({ phone_number: phone, otp: otpString });
      // localStorage.setItem('supplier_access_token', result.access_token);
      // localStorage.setItem('supplier_refresh_token', result.refresh_token);
      await new Promise((r) => setTimeout(r, 1500));
      localStorage.setItem('supplier_user', JSON.stringify({ full_name: 'Supplier User', phone, email: '' }));
      localStorage.setItem('supplier_role', selectedRole);
      navigate('/dashboard');
    } catch (err) {
      setOtpError(err?.response?.data?.message || 'Invalid OTP. Please try again.');
    } finally {
      setVerifyingOtp(false);
    }
  };

  // ─── Email Login ───
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    if (!isEmailValid || !isPasswordValid) return;
    setEmailLoading(true);
    setEmailError('');
    try {
      // TODO: const result = await supplierService.loginEmail({ email, password });
      // localStorage.setItem('supplier_access_token', result.access_token);
      // localStorage.setItem('supplier_refresh_token', result.refresh_token);
      await new Promise((r) => setTimeout(r, 1500));
      localStorage.setItem('supplier_user', JSON.stringify({ full_name: 'Supplier User', email, phone: '' }));
      localStorage.setItem('supplier_role', selectedRole);
      navigate('/dashboard');
    } catch (err) {
      setEmailError(err?.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setEmailLoading(false);
    }
  };

  // ─── Change phone number ───
  const handleChangePhone = () => {
    setOtpSent(false);
    setOtp(['', '', '', '', '', '']);
    setOtpError('');
    setOtpSuccess('');
    setResendTimer(0);
  };

  const features = [
    { icon: <Shield className="w-5 h-5" />, text: 'ISO 9001:2015 Certified Quality' },
    { icon: <Globe className="w-5 h-5" />, text: 'Global Supply Chain Network' },
    { icon: <Award className="w-5 h-5" />, text: 'Trusted by Industry Leaders' },
  ];

  // ─── Spinner component ───
  const Spinner = () => (
    <Loader2 size={18} className="animate-spin" />
  );

  return (
    <div className="min-h-screen flex">
      {/* ═══════════ Left Panel — Branding ═══════════ */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a3a5c 0%, #102a43 100%)' }}>
        <div className="absolute inset-0 bg-pattern opacity-10" />
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-[#d4a853]/10 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#d4a853]/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />

        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <div className="animate-slideDown">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#d4a853] to-[#c49843] rounded-xl flex items-center justify-center shadow-gold">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <div>
                <p className="text-white font-bold text-lg tracking-wide">SHARDUL-GE</p>
                <p className="text-[#d4a853] text-xs tracking-widest">TECHNOLOGIES</p>
              </div>
            </div>
          </div>

          <div className="animate-slideUp">
            <h1 className="text-4xl xl:text-5xl font-bold text-white mb-4 leading-tight">
              Supplier<br />
              <span className="text-gradient">Portal</span>
            </h1>
            <p className="text-gray-300 text-lg max-w-md leading-relaxed mb-10">
              Access your dashboard, manage orders, and grow your business with India's leading B2B sourcing partner.
            </p>
            <div className="space-y-4">
              {features.map((f, i) => (
                <div key={i} className={`flex items-center gap-4 stagger-${i + 1} animate-slideRight`}>
                  <div className="w-10 h-10 glass rounded-xl flex items-center justify-center text-[#d4a853]">{f.icon}</div>
                  <span className="text-gray-300 text-sm">{f.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="animate-fadeIn stagger-5">
            <div className="h-px bg-white/10 mb-6" />
            <p className="text-gray-400 text-xs">&copy; 2026 SHARDUL-GE Technologies Pvt. Ltd. All rights reserved.</p>
          </div>
        </div>
      </div>

      {/* ═══════════ Right Panel — Login Form ═══════════ */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="w-full max-w-md animate-scaleIn">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="w-14 h-14 bg-gradient-to-br from-[#1a3a5c] to-[#102a43] rounded-xl flex items-center justify-center mx-auto mb-4 shadow-navy">
              <span className="text-[#d4a853] font-bold text-2xl">S</span>
            </div>
            <h1 className="text-xl font-bold text-[#1a3a5c]">SHARDUL-GE</h1>
            <p className="text-[#d4a853] text-xs tracking-widest">TECHNOLOGIES</p>
          </div>

          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#1a3a5c]">Welcome back</h2>
            <p className="text-gray-500 mt-1 text-sm">Sign in to your dashboard</p>
          </div>

          {/* Role Selector */}
          <div className="flex gap-2 mb-6">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`flex-1 flex flex-col items-center gap-1 py-3 px-2 rounded-xl border-2 transition-all duration-300 cursor-pointer text-center ${
                  selectedRole === role.id
                    ? 'border-[#d4a853] bg-[#d4a853]/5 text-[#1a3a5c]'
                    : 'border-gray-100 bg-white hover:border-gray-200 text-gray-400'
                }`}
              >
                <span className={selectedRole === role.id ? 'text-[#d4a853]' : ''}>{role.icon}</span>
                <span className="text-xs font-semibold">{role.label}</span>
                <span className="text-[9px] leading-tight opacity-60">{role.desc}</span>
              </button>
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden">
            {/* ── Tabs ── */}
            <div className="flex">
              <button
                onClick={() => switchTab('phone')}
                className={`flex-1 py-3.5 text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer border-b-2 ${
                  activeTab === 'phone'
                    ? 'text-[#1a3a5c] border-[#d4a853] bg-[#d4a853]/5'
                    : 'text-gray-400 hover:text-gray-600 border-transparent'
                }`}
              >
                <Phone size={15} /> Phone
              </button>
              <button
                onClick={() => switchTab('email')}
                className={`flex-1 py-3.5 text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer border-b-2 ${
                  activeTab === 'email'
                    ? 'text-[#1a3a5c] border-[#d4a853] bg-[#d4a853]/5'
                    : 'text-gray-400 hover:text-gray-600 border-transparent'
                }`}
              >
                <Mail size={15} /> Email
              </button>
            </div>

            {/* ════════════ PHONE + OTP TAB ════════════ */}
            {activeTab === 'phone' && (
              <div className="p-6 animate-fadeIn">
                {!otpSent ? (
                  /* ── Phone Number Input ── */
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-semibold text-[#1a3a5c] mb-1.5">
                        Phone Number <span className="text-[#d4a853]">*</span>
                      </label>
                      <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 focus-within:ring-2 focus-within:ring-[#d4a853]/40 focus-within:border-[#d4a853] hover:border-[#d4a853]/50">
                        <span className="pl-4 pr-2 py-3 text-sm font-medium text-[#1a3a5c] bg-gray-50 border-r border-gray-200 select-none">+91</span>
                        <input
                          type="tel"
                          maxLength={10}
                          value={phone}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, '');
                            setPhone(val);
                            setPhoneError('');
                          }}
                          onBlur={() => setPhoneTouched(true)}
                          placeholder="9876543210"
                          className="flex-1 px-3 py-3 text-sm outline-none bg-transparent"
                        />
                        {isPhoneValid && (
                          <CheckCircle2 size={18} className="mr-3 text-green-500 flex-shrink-0" />
                        )}
                      </div>
                      {(phoneValidationMsg || phoneError) && (
                        <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1 animate-slideDown">
                          <AlertCircle size={12} /> {phoneValidationMsg || phoneError}
                        </p>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={!isPhoneValid || sendingOtp}
                      className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                        isPhoneValid && !sendingOtp
                          ? 'bg-gradient-to-r from-[#d4a853] to-[#c49843] hover:from-[#c49843] hover:to-[#b08536] text-white shadow-gold hover:shadow-lg hover:-translate-y-0.5'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {sendingOtp ? <><Spinner /> Sending OTP...</> : <>Send OTP <ArrowRight size={16} /></>}
                    </button>
                  </div>
                ) : (
                  /* ── OTP Input ── */
                  <div className="space-y-5 animate-scaleIn">
                    {/* Phone display */}
                    <div className="flex items-center justify-between bg-[#1a3a5c]/5 rounded-xl px-4 py-3">
                      <div>
                        <p className="text-xs text-gray-500">OTP sent to</p>
                        <p className="text-sm font-semibold text-[#1a3a5c]">+91 {phone}</p>
                      </div>
                      <button
                        type="button"
                        onClick={handleChangePhone}
                        className="text-xs text-[#d4a853] hover:text-[#c49843] font-semibold cursor-pointer transition-colors"
                      >
                        Change
                      </button>
                    </div>

                    {otpSuccess && (
                      <p className="text-xs text-green-600 flex items-center gap-1 animate-slideDown">
                        <CheckCircle2 size={12} /> {otpSuccess}
                      </p>
                    )}

                    {/* OTP boxes */}
                    <div>
                      <label className="block text-sm font-semibold text-[#1a3a5c] mb-2">
                        Enter OTP <span className="text-[#d4a853]">*</span>
                      </label>
                      <div className="flex gap-2 sm:gap-3 justify-center">
                        {otp.map((digit, i) => (
                          <input
                            key={i}
                            ref={(el) => (otpRefs.current[i] = el)}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleOtpChange(i, e.target.value)}
                            onKeyDown={(e) => handleOtpKeyDown(i, e)}
                            onPaste={i === 0 ? handleOtpPaste : undefined}
                            onFocus={(e) => e.target.select()}
                            className={`w-11 h-13 sm:w-12 sm:h-14 text-center text-lg font-bold rounded-xl border-2 transition-all duration-300 outline-none ${
                              digit
                                ? 'border-[#d4a853] bg-[#d4a853]/5 text-[#1a3a5c]'
                                : 'border-gray-200 hover:border-[#d4a853]/50'
                            } focus:border-[#d4a853] focus:ring-2 focus:ring-[#d4a853]/30`}
                          />
                        ))}
                      </div>
                      {otpTouched && otpString.length > 0 && !isOtpValid && (
                        <p className="mt-2 text-xs text-red-500 flex items-center gap-1 justify-center animate-slideDown">
                          <AlertCircle size={12} /> OTP must be 6 digits
                        </p>
                      )}
                      {otpError && (
                        <p className="mt-2 text-xs text-red-500 flex items-center gap-1 justify-center animate-slideDown">
                          <AlertCircle size={12} /> {otpError}
                        </p>
                      )}
                    </div>

                    {/* Verify button */}
                    <button
                      type="button"
                      onClick={handleVerifyOtp}
                      disabled={!isOtpValid || verifyingOtp}
                      className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                        isOtpValid && !verifyingOtp
                          ? 'bg-gradient-to-r from-[#d4a853] to-[#c49843] hover:from-[#c49843] hover:to-[#b08536] text-white shadow-gold hover:shadow-lg hover:-translate-y-0.5'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {verifyingOtp ? <><Spinner /> Verifying...</> : <>Verify OTP <ArrowRight size={16} /></>}
                    </button>

                    {/* Resend */}
                    <div className="text-center">
                      {resendTimer > 0 ? (
                        <p className="text-xs text-gray-400">
                          Resend OTP in <span className="font-semibold text-[#1a3a5c]">{resendTimer}s</span>
                        </p>
                      ) : (
                        <button
                          type="button"
                          onClick={handleSendOtp}
                          disabled={sendingOtp}
                          className="text-xs text-[#d4a853] hover:text-[#c49843] font-semibold cursor-pointer transition-colors"
                        >
                          {sendingOtp ? 'Sending...' : 'Resend OTP'}
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ════════════ EMAIL TAB ════════════ */}
            {activeTab === 'email' && (
              <form onSubmit={handleEmailLogin} className="p-6 space-y-5 animate-fadeIn" noValidate>
                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-[#1a3a5c] mb-1.5">
                    Email Address <span className="text-[#d4a853]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setEmailError(''); }}
                      onBlur={() => setEmailTouched(true)}
                      placeholder="john@company.com"
                      className={`w-full px-4 py-3 border rounded-xl transition-all duration-300 text-sm outline-none ${
                        emailValidationMsg
                          ? 'border-red-400 focus:ring-2 focus:ring-red-300'
                          : 'border-gray-200 focus:ring-2 focus:ring-[#d4a853]/40 focus:border-[#d4a853] hover:border-[#d4a853]/50'
                      }`}
                    />
                    {isEmailValid && (
                      <CheckCircle2 size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500" />
                    )}
                  </div>
                  {emailValidationMsg && (
                    <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1 animate-slideDown">
                      <AlertCircle size={12} /> {emailValidationMsg}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-semibold text-[#1a3a5c] mb-1.5">
                    Password <span className="text-[#d4a853]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => { setPassword(e.target.value); setEmailError(''); }}
                      onBlur={() => setPasswordTouched(true)}
                      placeholder="Enter your password"
                      className={`w-full px-4 py-3 border rounded-xl transition-all duration-300 text-sm outline-none pr-11 ${
                        passwordValidationMsg
                          ? 'border-red-400 focus:ring-2 focus:ring-red-300'
                          : 'border-gray-200 focus:ring-2 focus:ring-[#d4a853]/40 focus:border-[#d4a853] hover:border-[#d4a853]/50'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1a3a5c] transition-colors cursor-pointer"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {passwordValidationMsg && (
                    <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1 animate-slideDown">
                      <AlertCircle size={12} /> {passwordValidationMsg}
                    </p>
                  )}
                </div>

                {/* Error */}
                {emailError && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl animate-slideDown">
                    <p className="text-red-600 text-sm flex items-center gap-1.5">
                      <AlertCircle size={14} /> {emailError}
                    </p>
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={!isEmailValid || !isPasswordValid || emailLoading}
                  className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                    isEmailValid && isPasswordValid && !emailLoading
                      ? 'bg-gradient-to-r from-[#d4a853] to-[#c49843] hover:from-[#c49843] hover:to-[#b08536] text-white shadow-gold hover:shadow-lg hover:-translate-y-0.5'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {emailLoading ? <><Spinner /> Signing In...</> : <>Sign In <ArrowRight size={16} /></>}
                </button>
              </form>
            )}

            {/* ── Footer ── */}
            <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 text-center">
              <p className="text-sm text-gray-500">
                Don't have an account?{' '}
                <Link to="/register" className="text-[#d4a853] hover:text-[#c49843] font-semibold transition-colors">
                  Register as Supplier
                </Link>
              </p>
            </div>
          </div>

          {/* Copyright (mobile) */}
          <p className="text-center text-[10px] text-gray-400 mt-6 lg:hidden">
            &copy; 2026 SHARDUL-GE Technologies Pvt. Ltd.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
