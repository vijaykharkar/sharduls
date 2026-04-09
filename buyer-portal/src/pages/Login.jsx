import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginEmailPassword, register } from '../store/slices/authSlice';
import { Eye, EyeOff, Shield, Globe, Award, Loader2 } from 'lucide-react';

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    full_name: '',
    phone: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegister) {
        await dispatch(register(formData)).unwrap();
      } else {
        await dispatch(loginEmailPassword({ email: formData.email, password: formData.password })).unwrap();
      }
      navigate('/');
    } catch (err) {
      console.error('Authentication failed:', err);
    }
  };

  const features = [
    { icon: <Shield size={20} />, text: 'Verified suppliers & quality products' },
    { icon: <Globe size={20} />, text: 'Pan-India delivery network' },
    { icon: <Award size={20} />, text: 'Best prices guaranteed' },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a3a5c 0%, #0a1929 100%)' }}>
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-gold-400/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-gold-400/10 rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-10 w-24 h-24 bg-gold-400/5 rounded-full" />
        <div className="absolute bottom-1/3 left-16 w-16 h-16 bg-gold-400/5 rounded-full" />

        <div className="relative z-10 flex flex-col justify-center px-16">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-14 h-14 bg-gradient-to-br from-gold-400 to-gold-500 rounded-2xl flex items-center justify-center shadow-gold">
              <span className="text-white font-bold text-2xl">S</span>
            </div>
            <div>
              <h1 className="text-white font-bold text-xl tracking-wide">SHARDUL-GE</h1>
              <p className="text-gold-400 text-xs tracking-[0.3em]">MARKETPLACE</p>
            </div>
          </div>

          <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
            India's Leading<br />
            <span className="text-gold-400">B2B Marketplace</span>
          </h2>
          <p className="text-gray-400 mb-10 leading-relaxed max-w-md">
            Connect with verified suppliers, get wholesale prices, and grow your business on our trusted platform.
          </p>

          <div className="space-y-4">
            {features.map((feat, i) => (
              <div key={i} className="flex items-center gap-3 text-gray-300 animate-slideUp" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-gold-400 flex-shrink-0">{feat.icon}</div>
                <span className="text-sm">{feat.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 px-4 py-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="w-14 h-14 bg-gradient-to-br from-navy-500 to-navy-700 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-navy">
              <span className="text-gold-400 font-bold text-2xl">S</span>
            </div>
            <h1 className="text-xl font-bold text-navy-500">SHARDUL-GE</h1>
            <p className="text-gold-400 text-xs tracking-widest">MARKETPLACE</p>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-navy-500">
              {isRegister ? 'Create Account' : 'Welcome back'}
            </h2>
            <p className="text-gray-500 mt-1 text-sm">
              {isRegister ? 'Register to start ordering' : 'Sign in to your buyer account'}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-6">
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {isRegister && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-navy-500 mb-1.5">Full Name</label>
                    <input
                      type="text"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-gold-400/30 focus:border-gold-400 outline-none transition-all"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-navy-500 mb-1.5">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-gold-400/30 focus:border-gold-400 outline-none transition-all"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-xs font-semibold text-navy-500 mb-1.5">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-gold-400/30 focus:border-gold-400 outline-none transition-all"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy-500 mb-1.5">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 pr-10 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-gold-400/30 focus:border-gold-400 outline-none transition-all"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-navy-500 cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-navy-500 to-navy-700 text-white rounded-xl font-semibold hover:from-navy-600 hover:to-navy-800 transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
              >
                {loading ? (
                  <><Loader2 size={18} className="animate-spin" /> Processing...</>
                ) : (
                  isRegister ? 'Create Account' : 'Sign In'
                )}
              </button>
            </form>

            <div className="mt-5 text-center">
              <button
                onClick={() => setIsRegister(!isRegister)}
                className="text-gold-400 hover:text-gold-500 font-semibold text-sm cursor-pointer transition-colors"
              >
                {isRegister ? 'Already have an account? Sign In' : "Don't have an account? Register"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
