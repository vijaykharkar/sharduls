import React, { createContext, useContext, useState, useEffect } from 'react';
import { ADMIN_ACCOUNT, SEED_SUPPLIER, DEFAULT_OTP, ADMIN_OTP, maskPhone } from '../data/mockUsers';

const AuthContext = createContext(null);

const getSuppliers = () => {
  try { const s = localStorage.getItem('sp_suppliers'); return s ? JSON.parse(s) : [SEED_SUPPLIER]; } catch { return [SEED_SUPPLIER]; }
};
const saveSuppliers = (arr) => localStorage.setItem('sp_suppliers', JSON.stringify(arr));

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('sp_auth');
    if (stored) {
      try {
        const p = JSON.parse(stored);
        setUser(p.user); setToken(p.token); setRole(p.user.role); setIsAuthenticated(true);
      } catch { /* ignore */ }
    }
    if (!localStorage.getItem('sp_suppliers')) saveSuppliers([SEED_SUPPLIER]);
    setLoading(false);
  }, []);

  const persist = (userData, tokenData) => {
    setUser(userData); setToken(tokenData); setRole(userData.role); setIsAuthenticated(true);
    localStorage.setItem('sp_auth', JSON.stringify({ user: userData, token: tokenData }));
    localStorage.setItem('sp_role', userData.role);
  };

  const login = async (email, password) => {
    if (email === ADMIN_ACCOUNT.email) {
      if (password !== ADMIN_ACCOUNT.password) throw new Error('Invalid admin password');
      const u = { id: ADMIN_ACCOUNT.id, name: ADMIN_ACCOUNT.name, email: ADMIN_ACCOUNT.email, role: 'admin' };
      persist(u, 'admin-token-' + Date.now());
      return u;
    }
    const suppliers = getSuppliers();
    const found = suppliers.find((s) => s.email === email);
    if (!found) throw new Error('Account not found. Please register.');
    if (found.password !== password) throw new Error('Incorrect password');
    const u = { id: found.id, name: found.name, email: found.email, phone: found.phone, businessName: found.businessName, role: 'supplier' };
    persist(u, 'supplier-token-' + Date.now());
    return u;
  };

  const sendOtp = async (phone) => {
    if (phone === ADMIN_ACCOUNT.phone) return { success: true, maskedPhone: maskPhone(phone) };
    const suppliers = getSuppliers();
    const found = suppliers.find((s) => s.phone === phone);
    if (!found) throw new Error('Phone not registered. Please register first.');
    return { success: true, maskedPhone: maskPhone(phone) };
  };

  const verifyOtp = async (phone, otp) => {
    if (phone === ADMIN_ACCOUNT.phone) {
      if (otp !== ADMIN_OTP) throw new Error('Invalid OTP. Please try again.');
      const u = { id: ADMIN_ACCOUNT.id, name: ADMIN_ACCOUNT.name, email: ADMIN_ACCOUNT.email, role: 'admin' };
      persist(u, 'admin-token-' + Date.now());
      return u;
    }
    if (otp !== DEFAULT_OTP) throw new Error('Invalid OTP. Please try again.');
    const suppliers = getSuppliers();
    const found = suppliers.find((s) => s.phone === phone);
    if (!found) throw new Error('Phone not registered.');
    const u = { id: found.id, name: found.name, email: found.email, phone: found.phone, businessName: found.businessName, role: 'supplier' };
    persist(u, 'supplier-token-' + Date.now());
    return u;
  };

  const register = async ({ name, businessName, email, phone, password }) => {
    const suppliers = getSuppliers();
    if (suppliers.find((s) => s.email === email)) throw new Error('Email already registered');
    if (suppliers.find((s) => s.phone === phone)) throw new Error('Phone already registered');
    const id = 'SUP-' + String(suppliers.length + 1).padStart(6, '0');
    const userData = { id, name, businessName, email, phone, role: 'supplier', password, otp: DEFAULT_OTP };
    suppliers.push(userData);
    saveSuppliers(suppliers);
    const u = { id, name, businessName, email, phone, role: 'supplier' };
    persist(u, 'supplier-token-' + Date.now());
    return u;
  };

  const registerWithPhone = async ({ name, businessName, phone }) => {
    const suppliers = getSuppliers();
    if (suppliers.find((s) => s.phone === phone)) throw new Error('Phone already registered');
    const id = 'SUP-' + String(suppliers.length + 1).padStart(6, '0');
    const userData = { id, name, businessName, phone, email: '', role: 'supplier', password: '', otp: DEFAULT_OTP };
    suppliers.push(userData);
    saveSuppliers(suppliers);
    const u = { id, name, businessName, phone, role: 'supplier' };
    persist(u, 'supplier-token-' + Date.now());
    return u;
  };

  const logout = () => {
    setUser(null); setToken(null); setRole(null); setIsAuthenticated(false);
    localStorage.removeItem('sp_auth'); localStorage.removeItem('sp_role');
  };

  const updateUser = (updates) => {
    const updated = { ...user, ...updates };
    setUser(updated);
    localStorage.setItem('sp_auth', JSON.stringify({ user: updated, token }));
  };

  return (
    <AuthContext.Provider value={{ user, token, role, isAuthenticated, loading, login, sendOtp, verifyOtp, register, registerWithPhone, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
};
