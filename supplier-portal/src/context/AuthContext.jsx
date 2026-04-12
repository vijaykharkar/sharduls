import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../api/authService';

const AuthContext = createContext(null);

const TOKEN_KEYS = {
  access: 'supplier_access_token',
  refresh: 'supplier_refresh_token',
  user: 'supplier_user',
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const accessToken = localStorage.getItem(TOKEN_KEYS.access);
    const storedUser = localStorage.getItem(TOKEN_KEYS.user);
    if (accessToken && storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
        setToken(accessToken);
        setRole(parsed.role);
        setIsAuthenticated(true);
      } catch { /* ignore corrupt data */ }
    }
    setLoading(false);
  }, []);

  const persist = (userData, tokens) => {
    setUser(userData);
    setToken(tokens.access_token);
    setRole(userData.role);
    setIsAuthenticated(true);
    localStorage.setItem(TOKEN_KEYS.access, tokens.access_token);
    localStorage.setItem(TOKEN_KEYS.refresh, tokens.refresh_token);
    localStorage.setItem(TOKEN_KEYS.user, JSON.stringify(userData));
  };

  const extractError = (err) => {
    const resp = err.response?.data;
    if (resp?.message) return resp.message;
    if (resp?.details) return Object.values(resp.details).join(', ');
    return err.message || 'Something went wrong';
  };

  const login = async (email, password) => {
    try {
      // authService returns res.data = { success, data: { user, tokens }, message }
      const apiRes = await authService.login(email, password);
      const { user: userData, tokens } = apiRes.data;
      persist(userData, tokens);
      return userData;
    } catch (err) {
      throw new Error(extractError(err));
    }
  };

  const sendOtp = async (phone) => {
    try {
      const apiRes = await authService.sendPhoneOtp(phone);
      return apiRes.data;
    } catch (err) {
      throw new Error(extractError(err));
    }
  };

  const verifyOtp = async (identifier, otp) => {
    try {
      const apiRes = await authService.verifyOtp(identifier, otp);
      const { user: userData, tokens } = apiRes.data;
      persist(userData, tokens);
      return userData;
    } catch (err) {
      throw new Error(extractError(err));
    }
  };

  const register = async ({ name, email, phone, password }) => {
    try {
      const apiRes = await authService.register({ name, email, phone, password, role: 'supplier' });
      const { user: userData, tokens } = apiRes.data;
      persist(userData, tokens);
      return userData;
    } catch (err) {
      throw new Error(extractError(err));
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch { /* ignore logout API errors */ }
    setUser(null);
    setToken(null);
    setRole(null);
    setIsAuthenticated(false);
    localStorage.removeItem(TOKEN_KEYS.access);
    localStorage.removeItem(TOKEN_KEYS.refresh);
    localStorage.removeItem(TOKEN_KEYS.user);
  };

  const updateUser = (updates) => {
    const updated = { ...user, ...updates };
    setUser(updated);
    localStorage.setItem(TOKEN_KEYS.user, JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{ user, token, role, isAuthenticated, loading, login, sendOtp, verifyOtp, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
};
