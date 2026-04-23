import { useCallback, useMemo } from 'react';
import { useAppContext, A } from '../store/AppContext';

export default function useWishlist() {
  const { state, dispatch, addToast } = useAppContext();

  const toggleWishlist = useCallback((product) => {
    const inList = state.wishlistItems.some((i) => i.id === product.id);
    dispatch({ type: A.TOGGLE_WISHLIST, payload: product });
    addToast(inList ? 'Removed from wishlist' : 'Added to wishlist', inList ? 'info' : 'success');
  }, [state.wishlistItems, dispatch, addToast]);

  const isInWishlist = useCallback((id) => state.wishlistItems.some((i) => i.id === id), [state.wishlistItems]);

  return {
    wishlistItems: state.wishlistItems,
    wishlistCount: state.wishlistItems.length,
    toggleWishlist,
    isInWishlist,
  };
}
