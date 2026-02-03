import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context';
import SignUpStep1 from '../components/SignUpStep1';
import SignUpStep2 from '../components/SignUpStep2';

const SignUpPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    full_name: '',
    phone: '',
    company_name: '',
  });

  const { register, loading, error, clearError } = useAuth();
  const navigate = useNavigate();

  const handleNext = (data) => {
    setFormData({ ...formData, ...data });
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = async (data) => {
    const finalData = { ...formData, ...data };
    try {
      await register(finalData);
      navigate('/supplier/dashboard');
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-blue-600 rounded-xl mb-4">
            <div className="w-12 h-12 flex items-center justify-center">
              <span className="text-white font-bold text-2xl">S</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800">SHARDUL-GE</h1>
          <p className="text-gray-600 mt-2">Supplier Registration</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            <div className={`flex items-center ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                1
              </div>
              <span className="ml-2 font-medium hidden sm:inline">Business Info</span>
            </div>
            <div className="w-16 h-1 bg-gray-300"></div>
            <div className={`flex items-center ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                2
              </div>
              <span className="ml-2 font-medium hidden sm:inline">Account Details</span>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
              <div className="flex-1">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
              <button onClick={clearError} className="text-red-400 hover:text-red-600 text-xl">
                ×
              </button>
            </div>
          )}

          {step === 1 && (
            <SignUpStep1 onNext={handleNext} initialData={formData} />
          )}

          {step === 2 && (
            <SignUpStep2
              onSubmit={handleSubmit}
              onBack={handleBack}
              initialData={formData}
              loading={loading}
            />
          )}

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/supplier/signin" className="text-blue-600 hover:text-blue-700 font-semibold">
                Sign In
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-gray-600 text-sm mt-6">
          © 2026 SHARDUL-GE. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
