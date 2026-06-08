import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '@shared/context/AuthContext';
import { useToast } from '@shared/context/ToastContext';
import { openAuthModal, closeAuthModal as closeAuthModalAction, resetUI } from '@features/ui/uiSlice';
import { saveUserCart, loadUserCart } from '@features/cart/cartSlice';
import { saveUserWishlist, loadUserWishlist } from '@features/wishlist/wishlistSlice';
import { saveUserAddresses, loadUserAddresses } from '@features/address/addressSlice';
import { selectAuthModalOpen, selectAuthModalTab } from '@features/ui/uiSelectors';

export default function useBuyerAuth() {
  const auth = useAuth();
  const dispatch = useDispatch();
  const { addToast } = useToast();

  const authModalOpen = useSelector(selectAuthModalOpen);
  const authModalTab = useSelector(selectAuthModalTab);

  const login = useCallback(async (email, password) => {
    try {
      const user = await auth.login(email, password);
      if (user?.id) {
        dispatch(loadUserCart(user.id));
        dispatch(loadUserAddresses(user.id));
        dispatch(loadUserWishlist(user.id));
      }
      dispatch(closeAuthModalAction());
      addToast(`Welcome back, ${user?.full_name || user?.name || 'User'}!`, 'success');
      return user;
    } catch (err) {
      addToast(err.message || 'Login failed', 'error');
      throw err;
    }
  }, [auth, dispatch, addToast]);

  const register = useCallback(async (data) => {
    try {
      const user = await auth.register({ ...data, role: 'buyer' });
      if (user?.id) {
        dispatch(loadUserCart(user.id));
        dispatch(loadUserAddresses(user.id));
        dispatch(loadUserWishlist(user.id));
      }
      dispatch(closeAuthModalAction());
      addToast('Account created successfully!', 'success');
      return user;
    } catch (err) {
      addToast(err.message || 'Registration failed', 'error');
      throw err;
    }
  }, [auth, dispatch, addToast]);

  const logout = useCallback(async () => {
    const userId = auth.user?.id;
    dispatch(saveUserCart(userId));
    dispatch(saveUserAddresses(userId));
    dispatch(saveUserWishlist(userId));
    dispatch(resetUI());
    await auth.logout();
    addToast('Logged out', 'info');
  }, [auth, dispatch, addToast]);

  const openModal = useCallback((tab = 'login') => {
    dispatch(openAuthModal(tab));
  }, [dispatch]);

  const closeModal = useCallback(() => {
    dispatch(closeAuthModalAction());
  }, [dispatch]);

  return {
    user: auth.user,
    token: auth.token,
    isAuthenticated: auth.isAuthenticated,
    authLoading: auth.loading,
    authModalOpen,
    authModalTab,
    login,
    register,
    logout,
    openAuthModal: openModal,
    closeAuthModal: closeModal,
  };
}
