import { useCallback, useMemo } from 'react';
import { useAppContext, A } from '../store/AppContext';

export default function useCart() {
  const { state, dispatch, addToast } = useAppContext();

  const addToCart = useCallback((product) => {
    dispatch({ type: A.ADD_TO_CART, payload: product });
    addToast(`${product.name} added to cart`, 'success');
  }, [dispatch, addToast]);

  const removeFromCart = useCallback((id) => {
    dispatch({ type: A.REMOVE_FROM_CART, payload: id });
    addToast('Item removed from cart', 'info');
  }, [dispatch, addToast]);

  const updateQty = useCallback((id, qty) => {
    dispatch({ type: A.UPDATE_CART_QTY, payload: { id, qty } });
  }, [dispatch]);

  const clearCart = useCallback(() => {
    dispatch({ type: A.CLEAR_CART });
  }, [dispatch]);

  const cartCount = useMemo(() => state.cartItems.reduce((s, i) => s + i.qty, 0), [state.cartItems]);

  const cartTotal = useMemo(() => state.cartItems.reduce((s, i) => s + i.price * i.qty, 0), [state.cartItems]);

  const cartMrpTotal = useMemo(() => state.cartItems.reduce((s, i) => s + (i.mrp || i.price) * i.qty, 0), [state.cartItems]);

  return {
    cartItems: state.cartItems,
    cartCount,
    cartTotal,
    cartMrpTotal,
    addToCart,
    removeFromCart,
    updateQty,
    clearCart,
  };
}
