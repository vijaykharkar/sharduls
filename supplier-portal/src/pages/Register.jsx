import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Briefcase, Lock, ArrowRight, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import Stepper from '../components/common/Stepper';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import supplierService from '../api/supplierService';

const STEPS = ['Personal Info', 'Business Details', 'Create Password'];

const Register = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [categories, setCategories] = useState([]);

  const [step1, setStep1] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
  });

  const [otp, setOtp] = useState('');

  const [step2, setStep2] = useState({
    business_model: '',
    products_to_sell: [],
    gstin: '',
  });

  const [step3, setStep3] = useState({
    password: '',
    confirm_password: '',
  });

  useEffect(() => {
    supplierService.getProductCategories()
      .then((data) => setCategories(data.categories || []))
      .catch(() => {
        setCategories([
          'Cable Management', 'Earthing Accessories', 'Lugs & Connectors',
          'Switchboard Components', 'Electrical Components', 'Fixings & Fasteners',
          'High Precision Parts', 'CNC Components', 'Thermo Plastic Parts',
          'Sub Assembly Parts', 'Kitting Parts', 'Springs', 'Silver Plating',
          '3D Printing', 'Automotive Components', 'Industrial Fasteners',
          'Wire & Cable', 'Hydraulic Components', 'Pneumatic Components',
          'Electronic Components',
        ]);
      });
  }, []);

  const handleStep1Submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      // await supplierService.step1(step1);
      setOtpSent(true);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      // await supplierService.verifyOTP({ phone: step1.phone, otp });
      setOtpVerified(true);
      setCurrentStep(1);
    } catch (err) {
      setError(err.response?.data?.detail || 'OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleStep2Submit = async (e) => {
    e.preventDefault();
    setError('');

    if (!step2.business_model) {
      setError('Please select a business model');
      return;
    }
    if (step2.products_to_sell.length === 0) {
      setError('Please select at least one product category');
      return;
    }
    if (step2.gstin.length !== 15) {
      setError('GSTIN must be 15 characters');
      return;
    }

    setLoading(true);
    try {
      // await supplierService.step2({ ...step2, phone: step1.phone });
      setCurrentStep(2);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to save business details');
    } finally {
      setLoading(false);
    }
  };

  const handleStep3Submit = async (e) => {
    e.preventDefault();
    setError('');

    if (step3.password !== step3.confirm_password) {
      setError('Passwords do not match');
      return;
    }
    if (step3.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);
    try {
      // const result = await supplierService.step3({
      //   phone: step1.phone,
      //   password: step3.password,
      //   confirm_password: step3.confirm_password,
      // });

      // localStorage.setItem('supplier_access_token', result.access_token);
      // localStorage.setItem('supplier_refresh_token', result.refresh_token);
      // localStorage.setItem('supplier_user', JSON.stringify(result.user));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.detail || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const toggleProduct = (product) => {
    setStep2((prev) => ({
      ...prev,
      products_to_sell: prev.products_to_sell.includes(product)
        ? prev.products_to_sell.filter((p) => p !== product)
        : [...prev.products_to_sell, product],
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">S</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Become a Supplier</h1>
          <p className="text-gray-500 mt-1">Join SHARDUL-GE marketplace</p>
        </div>

        <Stepper steps={STEPS} currentStep={currentStep} />

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Error */}
          {error && (
            <div className="mx-6 mt-6 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* ========== STEP 1: Personal Info ========== */}
          {currentStep === 0 && !otpSent && (
            <form onSubmit={handleStep1Submit} className="p-6 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <User className="text-blue-600" size={20} />
                <h2 className="text-lg font-bold text-gray-800">Personal Information</h2>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  required
                  type="text"
                  value={step1.first_name}
                  onChange={(e) => setStep1({ ...step1, first_name: e.target.value })}
                  placeholder="John"
                />
                <Input
                  label="Last Name"
                  required
                  type="text"
                  value={step1.last_name}
                  onChange={(e) => setStep1({ ...step1, last_name: e.target.value })}
                  placeholder="Doe"
                />
              </div>

              <Input
                label="Phone Number"
                required
                type="tel"
                value={step1.phone}
                onChange={(e) => setStep1({ ...step1, phone: e.target.value })}
                placeholder="+91 9876543210"
                maxLength={15}
              />

              <Input
                label="Email Address"
                required
                type="email"
                value={step1.email}
                onChange={(e) => setStep1({ ...step1, email: e.target.value })}
                placeholder="john@company.com"
              />

              <Button type="submit" loading={loading} className="w-full">
                Send OTP <ArrowRight size={16} />
              </Button>
            </form>
          )}

          {/* OTP Verification */}
          {currentStep === 0 && otpSent && !otpVerified && (
            <form onSubmit={handleVerifyOTP} className="p-6 space-y-4">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Lock className="text-blue-600" size={28} />
                </div>
                <h2 className="text-lg font-bold text-gray-800">Verify Phone Number</h2>
                <p className="text-gray-500 text-sm">
                  OTP sent to <span className="font-semibold text-gray-700">{step1.phone}</span>
                </p>
              </div>

              <Input
                label="Enter OTP"
                required
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="123456"
                maxLength={6}
                className="text-center text-2xl tracking-[0.5em] font-mono"
              />

              <Button type="submit" loading={loading} className="w-full">
                Verify OTP
              </Button>

              <div className="flex justify-between text-sm">
                <button
                  type="button"
                  onClick={() => { setOtpSent(false); setOtp(''); setError(''); }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <ArrowLeft size={14} className="inline mr-1" /> Change Number
                </button>
                <button
                  type="button"
                  onClick={handleStep1Submit}
                  disabled={loading}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Resend OTP
                </button>
              </div>
            </form>
          )}

          {/* ========== STEP 2: Business Details ========== */}
          {currentStep === 1 && (
            <form onSubmit={handleStep2Submit} className="p-6 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <Briefcase className="text-blue-600" size={20} />
                <h2 className="text-lg font-bold text-gray-800">Business Details</h2>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Business Model <span className="text-red-500">*</span>
                </label>
                <select
                  value={step2.business_model}
                  onChange={(e) => setStep2({ ...step2, business_model: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white"
                  required
                >
                  <option value="">Select Business Model</option>
                  <option value="B2B">B2B (Business to Business)</option>
                  <option value="B2D">B2D (Business to Distributor)</option>
                  <option value="B2C">B2C (Business to Consumer)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Products You Wish to Sell <span className="text-red-500">*</span>
                  <span className="text-gray-400 text-xs ml-2">
                    ({step2.products_to_sell.length} selected)
                  </span>
                </label>
                <div className="max-h-48 overflow-y-auto border border-gray-300 rounded-lg p-3 space-y-1.5">
                  {categories.map((cat) => (
                    <label
                      key={cat}
                      className={`flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer transition text-sm ${
                        step2.products_to_sell.includes(cat)
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={step2.products_to_sell.includes(cat)}
                        onChange={() => toggleProduct(cat)}
                        className="rounded text-blue-600 focus:ring-blue-400"
                      />
                      {cat}
                    </label>
                  ))}
                </div>
              </div>

              <Input
                label="GSTIN Number"
                required
                type="text"
                value={step2.gstin}
                onChange={(e) => setStep2({ ...step2, gstin: e.target.value.toUpperCase() })}
                placeholder="22AAAAA0000A1Z5"
                maxLength={15}
              />

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setCurrentStep(0)}
                  className="flex-1"
                >
                  <ArrowLeft size={16} /> Back
                </Button>
                <Button type="submit" loading={loading} className="flex-1">
                  Continue <ArrowRight size={16} />
                </Button>
              </div>
            </form>
          )}

          {/* ========== STEP 3: Create Password ========== */}
          {currentStep === 2 && (
            <form onSubmit={handleStep3Submit} className="p-6 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <Lock className="text-blue-600" size={20} />
                <h2 className="text-lg font-bold text-gray-800">Create Password</h2>
              </div>

              <p className="text-gray-500 text-sm">
                Create a strong password for your supplier account.
              </p>

              <div className="relative">
                <Input
                  label="Password"
                  required
                  type={showPassword ? 'text' : 'password'}
                  value={step3.password}
                  onChange={(e) => setStep3({ ...step3, password: e.target.value })}
                  placeholder="Min. 8 characters"
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <div className="relative">
                <Input
                  label="Confirm Password"
                  required
                  type={showConfirm ? 'text' : 'password'}
                  value={step3.confirm_password}
                  onChange={(e) => setStep3({ ...step3, confirm_password: e.target.value })}
                  placeholder="Re-enter password"
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Password strength indicators */}
              <div className="bg-gray-50 rounded-lg p-3 space-y-1">
                <p className="text-xs font-medium text-gray-500 mb-1">Password requirements:</p>
                {[
                  { check: step3.password.length >= 8, label: 'At least 8 characters' },
                  { check: /[A-Z]/.test(step3.password), label: 'One uppercase letter' },
                  { check: /[a-z]/.test(step3.password), label: 'One lowercase letter' },
                  { check: /[0-9]/.test(step3.password), label: 'One digit' },
                ].map((req, i) => (
                  <p key={i} className={`text-xs flex items-center gap-1.5 ${req.check ? 'text-green-600' : 'text-gray-400'}`}>
                    <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] ${req.check ? 'bg-green-500 text-white' : 'bg-gray-300 text-white'}`}>
                      ✓
                    </span>
                    {req.label}
                  </p>
                ))}
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setCurrentStep(1)}
                  className="flex-1"
                >
                  <ArrowLeft size={16} /> Back
                </Button>
                <Button type="submit" loading={loading} variant="success" className="flex-1">
                  Create Account
                </Button>
              </div>
            </form>
          )}

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
