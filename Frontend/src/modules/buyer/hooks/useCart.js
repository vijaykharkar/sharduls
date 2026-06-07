import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart as addToCartAction, removeFromCart as removeFromCartAction, updateCartQty, clearCart as clearCartAction } from '@features/cart/cartSlice';
import { selectCartItems, selectCartCount, selectCartTotal, selectCartMrpTotal } from '@features/cart/cartSelectors';
import { useToast } from '@shared/context/ToastContext';

export default function useCart() {
  const dispatch = useDispatch();
  const { addToast } = useToast();

  const cartItems = useSelector(selectCartItems);
  const cartCount = useSelector(selectCartCount);
  const cartTotal = useSelector(selectCartTotal);
  const cartMrpTotal = useSelector(selectCartMrpTotal);

  const addToCart = useCallback((product) => {
    dispatch(addToCartAction(product));
    addToast(`${product.name} added to cart`, 'success');
  }, [dispatch, addToast]);

  const removeFromCart = useCallback((id) => {
    dispatch(removeFromCartAction(id));
    addToast('Item removed from cart', 'info');
  }, [dispatch, addToast]);

  const updateQty = useCallback((id, qty) => {
    dispatch(updateCartQty({ id, qty }));
  }, [dispatch]);

  const clearCart = useCallback(() => {
    dispatch(clearCartAction());
  }, [dispatch]);

  return { cartItems, cartCount, cartTotal, cartMrpTotal, addToCart, removeFromCart, updateQty, clearCart };
}
