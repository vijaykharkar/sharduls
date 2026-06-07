import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import authApi from '@shared/api/authApi';
import { loginThunk, registerThunk, logoutThunk, fetchMeThunk } from '@features/auth/authThunks';
import { setAuth, updateUser as updateUserAction, setAuthLoading } from '@features/auth/authSlice';
import { selectUser, selectToken, selectRole, selectIsAuthenticated, selectAuthLoading } from '@features/auth/authSelectors';

/**
 * AuthProvider — initializes the session on mount by validating the stored
 * access token against /auth/me. All auth state lives in Redux; this provider
 * only handles the startup side-effect and exposes no Context value.
 */
export function AuthProvider({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      dispatch(fetchMeThunk());
    } else {
      dispatch(setAuthLoading(false));
    }
  }, [dispatch]);

  return children;
}

/**
 * useAuth — drop-in replacement hook with identical external API.
 * Reads auth state from Redux; wraps dispatch calls to preserve promise-based interface.
 */
export function useAuth() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const role = useSelector(selectRole);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectAuthLoading);

  const login = useCallback(async (email, password) => {
    try {
      const result = await dispatch(loginThunk({ email, password })).unwrap();
      return result.user ? { ...result.user } : null;
    } catch (msg) {
      throw new Error(typeof msg === 'string' ? msg : msg?.message || 'Login failed');
    }
  }, [dispatch]);

  const register = useCallback(async (data) => {
    const payload = {
      full_name: data.full_name || data.name,
      email: data.email,
      phone: data.phone || null,
      password: data.password,
      role: data.role || 'buyer',
      business_model: data.businessModel || null,
      product_categories: data.productCategories || null,
      gstin: data.gstin || null,
    };
    try {
      const result = await dispatch(registerThunk(payload)).unwrap();
      return result.user ? { ...result.user } : null;
    } catch (msg) {
      throw new Error(typeof msg === 'string' ? msg : msg?.message || 'Registration failed');
    }
  }, [dispatch]);

  const logout = useCallback(async () => {
    await dispatch(logoutThunk());
  }, [dispatch]);

  const updateUser = useCallback((updates) => {
    dispatch(updateUserAction(updates));
  }, [dispatch]);

  /* ── OTP helpers (local API calls — not global state) ── */
  const extractErr = (err) => {
    const d = err.response?.data;
    if (d?.message) return d.message;
    if (d?.details) return Object.values(d.details).join(', ');
    return err.userMessage || err.message || 'Something went wrong';
  };

  const sendOtp = useCallback(async (phone) => {
    try {
      const res = await authApi.sendOtp(phone);
      return res.data.data || res.data;
    } catch (err) { throw new Error(extractErr(err)); }
  }, []);

  const verifyOtp = useCallback(async (identifier, otp) => {
    try {
      const res = await authApi.verifyOtp(identifier, otp);
      const data = res.data.data || res.data;
      if (data.user && data.tokens) {
        dispatch(setAuth({ user: data.user, tokens: data.tokens }));
      }
      return data;
    } catch (err) { throw new Error(extractErr(err)); }
  }, [dispatch]);

  const sendRegistrationOtp = useCallback(async (phone) => {
    try {
      const res = await authApi.sendRegistrationOtp(phone);
      return res.data.data || res.data;
    } catch (err) { throw new Error(extractErr(err)); }
  }, []);

  const verifyRegistrationOtp = useCallback(async (phone, otp) => {
    try {
      const res = await authApi.verifyRegistrationOtp(phone, otp);
      return res.data.data || res.data;
    } catch (err) { throw new Error(extractErr(err)); }
  }, []);

  return {
    user, token, role, isAuthenticated, loading,
    login, register, logout, updateUser,
    sendOtp, verifyOtp, sendRegistrationOtp, verifyRegistrationOtp,
  };
}

export default AuthProvider;
