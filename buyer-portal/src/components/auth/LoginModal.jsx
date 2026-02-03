import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { X } from 'lucide-react';
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
  const [loginMethod, setLoginMethod] = useState('email'); // 'email', 'phone', 'emailOtp'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');

  const dispatch = useDispatch();
  const { loading, error, otpSent, otpLoading } = useSelector((state) => state.auth);

  const handleClose = () => {
    setEmail('');
    setPassword('');
    setPhone('');
    setOtp('');
    dispatch(clearError());
    dispatch(resetOtpState());
    onClose();
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginEmailPassword({ email, password })).unwrap();
      handleClose();
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  const handleSendPhoneOTP = async () => {
    try {
      await dispatch(sendPhoneOTP(phone)).unwrap();
    } catch (err) {
      console.error('Failed to send OTP:', err);
    }
  };

  const handleSendEmailOTP = async () => {
    try {
      await dispatch(sendEmailOTP(email)).unwrap();
    } catch (err) {
      console.error('Failed to send OTP:', err);
    }
  };

  const handleVerifyPhoneOTP = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginPhoneOTP({ phone, otp })).unwrap();
      handleClose();
    } catch (err) {
      console.error('OTP verification failed:', err);
    }
  };

  const handleVerifyEmailOTP = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginEmailOTP({ email, otp })).unwrap();
      handleClose();
    } catch (err) {
      console.error('OTP verification failed:', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Header */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Login</h2>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* Login Method Tabs */}
        <div className="flex space-x-2 mb-6">
          <button
            onClick={() => {
              setLoginMethod('email');
              dispatch(resetOtpState());
            }}
            className={`flex-1 py-2 px-4 rounded-lg transition ${
              loginMethod === 'email'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Email/Password
          </button>
          <button
            onClick={() => {
              setLoginMethod('phone');
              dispatch(resetOtpState());
            }}
            className={`flex-1 py-2 px-4 rounded-lg transition ${
              loginMethod === 'phone'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Phone OTP
          </button>
          <button
            onClick={() => {
              setLoginMethod('emailOtp');
              dispatch(resetOtpState());
            }}
            className={`flex-1 py-2 px-4 rounded-lg transition ${
              loginMethod === 'emailOtp'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Email OTP
          </button>
        </div>

        {/* Email/Password Login */}
        {loginMethod === 'email' && (
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        )}

        {/* Phone OTP Login */}
        {loginMethod === 'phone' && (
          <div className="space-y-4">
            {!otpSent ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 1234567890"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <button
                  onClick={handleSendPhoneOTP}
                  disabled={otpLoading || !phone}
                  className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {otpLoading ? 'Sending OTP...' : 'Send OTP'}
                </button>
              </>
            ) : (
              <form onSubmit={handleVerifyPhoneOTP} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Enter OTP
                  </label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                    placeholder="123456"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {loading ? 'Verifying...' : 'Verify OTP'}
                </button>
                <button
                  type="button"
                  onClick={() => dispatch(resetOtpState())}
                  className="w-full py-2 px-4 text-blue-600 hover:text-blue-700"
                >
                  Resend OTP
                </button>
              </form>
            )}
          </div>
        )}

        {/* Email OTP Login */}
        {loginMethod === 'emailOtp' && (
          <div className="space-y-4">
            {!otpSent ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <button
                  onClick={handleSendEmailOTP}
                  disabled={otpLoading || !email}
                  className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {otpLoading ? 'Sending OTP...' : 'Send OTP'}
                </button>
              </>
            ) : (
              <form onSubmit={handleVerifyEmailOTP} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Enter OTP
                  </label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                    placeholder="123456"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {loading ? 'Verifying...' : 'Verify OTP'}
                </button>
                <button
                  type="button"
                  onClick={() => dispatch(resetOtpState())}
                  className="w-full py-2 px-4 text-blue-600 hover:text-blue-700"
                >
                  Resend OTP
                </button>
              </form>
            )}
          </div>
        )}

        {/* Register Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <button className="text-blue-600 hover:text-blue-700 font-medium">
              Register
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
