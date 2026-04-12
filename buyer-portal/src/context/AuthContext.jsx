import React, { createContext, useState, useEffect } from 'react';
import authService from '../api/authService';

export const AuthContext = createContext(null);

const TOKEN_KEYS = {
  access: 'access_token',
  refresh: 'refresh_token',
  user: 'user',
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
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
        setIsAuthenticated(true);
      } catch { /* ignore */ }
    }
    setLoading(false);
  }, []);

  const persist = (userData, tokens) => {
    setUser(userData);
    setToken(tokens.access_token);
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
      const res = await authService.loginEmailPassword({ email, password });
      const { user: userData, tokens } = res.data;
      persist(userData, tokens);
      return userData;
    } catch (err) {
      throw new Error(extractError(err));
    }
  };

  const register = async ({ name, email, phone, password }) => {
    try {
      const res = await authService.register({ name, email, phone, password });
      const { user: userData, tokens } = res.data;
      persist(userData, tokens);
      return userData;
    } catch (err) {
      throw new Error(extractError(err));
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch { /* ignore */ }
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem(TOKEN_KEYS.access);
    localStorage.removeItem(TOKEN_KEYS.refresh);
    localStorage.removeItem(TOKEN_KEYS.user);
  };

  const updateProfile = (updates) => {
    const updated = { ...user, ...updates };
    setUser(updated);
    localStorage.setItem(TOKEN_KEYS.user, JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, loading, role: user?.role || 'buyer', login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
