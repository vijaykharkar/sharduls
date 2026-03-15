import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Phone, Lock, Eye, EyeOff } from 'lucide-react';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import supplierService from '../api/supplierService';

const Login = () => {
  const navigate = useNavigate();
  const [loginMethod, setLoginMethod] = useState('phone');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [phoneForm, setPhoneForm] = useState({ phone: '', password: '' });
  const [emailForm, setEmailForm] = useState({ email: '', password: '' });

  const handlePhoneLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      // const result = await supplierService.loginPhone(phoneForm);
      // localStorage.setItem('supplier_access_token', result.access_token);
      // localStorage.setItem('supplier_refresh_token', result.refresh_token);
      // localStorage.setItem('supplier_user', JSON.stringify(result.user));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
    //   const result = await supplierService.loginEmail(emailForm);
    //   localStorage.setItem('supplier_access_token', result.access_token);
    //   localStorage.setItem('supplier_refresh_token', result.refresh_token);
    //   localStorage.setItem('supplier_user', JSON.stringify(result.user));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">S</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Supplier Login</h1>
          <p className="text-gray-500 mt-1">Sign in to your supplier dashboard</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => { setLoginMethod('phone'); setError(''); }}
              className={`flex-1 py-3 text-sm font-semibold transition flex items-center justify-center gap-2 ${
                loginMethod === 'phone'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Phone size={16} /> Phone + Password
            </button>
            <button
              onClick={() => { setLoginMethod('email'); setError(''); }}
              className={`flex-1 py-3 text-sm font-semibold transition flex items-center justify-center gap-2 ${
                loginMethod === 'email'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Mail size={16} /> Email + Password
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="mx-6 mt-6 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Phone Login */}
          {loginMethod === 'phone' && (
            <form onSubmit={handlePhoneLogin} className="p-6 space-y-4">
              <Input
                label="Phone Number"
                required
                type="tel"
                value={phoneForm.phone}
                onChange={(e) => setPhoneForm({ ...phoneForm, phone: e.target.value })}
                placeholder="+91 9876543210"
              />
              <div className="relative">
                <Input
                  label="Password"
                  required
                  type={showPassword ? 'text' : 'password'}
                  value={phoneForm.password}
                  onChange={(e) => setPhoneForm({ ...phoneForm, password: e.target.value })}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <Button type="submit" loading={loading} className="w-full">
                <Lock size={16} /> Login
              </Button>
            </form>
          )}

          {/* Email Login */}
          {loginMethod === 'email' && (
            <form onSubmit={handleEmailLogin} className="p-6 space-y-4">
              <Input
                label="Email Address"
                required
                type="email"
                value={emailForm.email}
                onChange={(e) => setEmailForm({ ...emailForm, email: e.target.value })}
                placeholder="john@company.com"
              />
              <div className="relative">
                <Input
                  label="Password"
                  required
                  type={showPassword ? 'text' : 'password'}
                  value={emailForm.password}
                  onChange={(e) => setEmailForm({ ...emailForm, password: e.target.value })}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <Button type="submit" loading={loading} className="w-full">
                <Lock size={16} /> Login
              </Button>
            </form>
          )}

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-600 hover:text-blue-700 font-semibold">
                Register as Supplier
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
