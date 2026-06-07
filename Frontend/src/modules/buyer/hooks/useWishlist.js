import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWishlist as toggleWishlistAction } from '@features/wishlist/wishlistSlice';
import { selectWishlistItems, selectWishlistCount } from '@features/wishlist/wishlistSelectors';
import { useToast } from '@shared/context/ToastContext';

export default function useWishlist() {
  const dispatch = useDispatch();
  const { addToast } = useToast();

  const wishlistItems = useSelector(selectWishlistItems);
  const wishlistCount = useSelector(selectWishlistCount);

  const toggleWishlist = useCallback((product) => {
    const inList = wishlistItems.some((i) => i.id === product.id);
    dispatch(toggleWishlistAction(product));
    addToast(inList ? 'Removed from wishlist' : 'Added to wishlist', inList ? 'info' : 'success');
  }, [wishlistItems, dispatch, addToast]);

  const isInWishlist = useCallback((id) => wishlistItems.some((i) => i.id === id), [wishlistItems]);

  return { wishlistItems, wishlistCount, toggleWishlist, isInWishlist };
}
