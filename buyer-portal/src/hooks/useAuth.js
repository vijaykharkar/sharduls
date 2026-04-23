import { useCallback } from 'react';
import { useAppContext, A } from '../store/AppContext';
import authApi from '../api/authApi';

export default function useAuth() {
  const { state, dispatch, addToast } = useAppContext();

  const persist = (userData, tokens) => {
    localStorage.setItem('buyer_access_token', tokens.access_token);
    localStorage.setItem('buyer_refresh_token', tokens.refresh_token);
    localStorage.setItem('buyer_user', JSON.stringify(userData));
    dispatch({ type: A.LOGIN_SUCCESS, payload: { user: userData, token: tokens.access_token } });
  };

  const login = useCallback(async (email, password) => {
    try {
      const res = await authApi.login(email, password);
      const { user, tokens } = res.data.data;
      persist(user, tokens);
      addToast(`Welcome back, ${user.full_name || user.name}!`, 'success');
      return user;
    } catch (err) {
      addToast(err.userMessage || 'Login failed', 'error');
      throw err;
    }
  }, [dispatch, addToast]);

  const register = useCallback(async (data) => {
    try {
      const res = await authApi.register(data);
      const { user, tokens } = res.data.data;
      persist(user, tokens);
      addToast('Account created successfully!', 'success');
      return user;
    } catch (err) {
      addToast(err.userMessage || 'Registration failed', 'error');
      throw err;
    }
  }, [dispatch, addToast]);

  const logout = useCallback(async () => {
    try { await authApi.logout(); } catch { /* ignore */ }
    localStorage.removeItem('buyer_access_token');
    localStorage.removeItem('buyer_refresh_token');
    localStorage.removeItem('buyer_user');
    dispatch({ type: A.LOGOUT });
    addToast('Logged out', 'info');
  }, [dispatch, addToast]);

  const openAuthModal = useCallback((tab = 'login') => {
    dispatch({ type: A.OPEN_AUTH_MODAL, payload: tab });
  }, [dispatch]);

  const closeAuthModal = useCallback(() => {
    dispatch({ type: A.CLOSE_AUTH_MODAL });
  }, [dispatch]);

  return {
    user: state.user,
    token: state.token,
    isAuthenticated: state.isAuthenticated,
    authLoading: state.authLoading,
    authModalOpen: state.authModalOpen,
    authModalTab: state.authModalTab,
    login,
    register,
    logout,
    openAuthModal,
    closeAuthModal,
  };
}
