import React, { createContext, useContext, useCallback } from 'react';
import { toast } from 'react-toastify';

/**
 * ToastContext — compatibility bridge over react-toastify.
 * All existing addToast(message, type) call-sites continue to work unchanged.
 * react-toastify handles rendering; ToastContainer is mounted in main.jsx.
 *
 * type mapping: 'success' | 'error' | 'warning' | 'info'
 */
const ToastContext = createContext(null);

const TYPE_MAP = {
  success: 'success',
  error: 'error',
  warning: 'warn',
  info: 'info',
};

export function ToastProvider({ children }) {
  const addToast = useCallback((message, type = 'info', _duration) => {
    const method = TYPE_MAP[type] || 'info';
    toast[method](message);
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be inside ToastProvider');
  return ctx;
}

export default ToastContext;
