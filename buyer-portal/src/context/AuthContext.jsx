import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

const MOCK_USER = {
  id: 1,
  name: 'Sophie Martin',
  email: 'sophie@example.com',
  phone: '+33 6 12 34 56 78',
  avatar: 'https://picsum.photos/100/100?random=200',
  role: 'buyer',
  loyaltyPoints: 1250,
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('buyer_auth');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUser(parsed.user);
        setToken(parsed.token);
        setIsAuthenticated(true);
      } catch { /* ignore */ }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Mock login: any email + password "password123" = success
    if (password !== 'password123') {
      throw new Error('Mot de passe incorrect');
    }
    const userData = { ...MOCK_USER, email };
    const tokenData = 'mock-jwt-token-' + Date.now();
    setUser(userData);
    setToken(tokenData);
    setIsAuthenticated(true);
    localStorage.setItem('buyer_auth', JSON.stringify({ user: userData, token: tokenData }));
    localStorage.setItem('buyer_role', 'buyer');
    return userData;
  };

  const register = async ({ name, email, phone, password }) => {
    if (password.length < 8) throw new Error('Le mot de passe doit contenir au moins 8 caractères');
    const userData = { ...MOCK_USER, name, email, phone };
    const tokenData = 'mock-jwt-token-' + Date.now();
    setUser(userData);
    setToken(tokenData);
    setIsAuthenticated(true);
    localStorage.setItem('buyer_auth', JSON.stringify({ user: userData, token: tokenData }));
    localStorage.setItem('buyer_role', 'buyer');
    return userData;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem('buyer_auth');
    localStorage.removeItem('buyer_role');
  };

  const updateProfile = (updates) => {
    const updated = { ...user, ...updates };
    setUser(updated);
    localStorage.setItem('buyer_auth', JSON.stringify({ user: updated, token }));
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, loading, role: 'buyer', login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
