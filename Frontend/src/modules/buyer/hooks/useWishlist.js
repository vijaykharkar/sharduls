import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWishlist as toggleWishlistAction, setWishlist } from '@features/wishlist/wishlistSlice';
import { selectWishlistItems, selectWishlistCount } from '@features/wishlist/wishlistSelectors';
import { useToast } from '@shared/context/ToastContext';
import { useAuth } from '@shared/context/AuthContext';
import wishlistApi from '../api/wishlistApi';

export default function useWishlist() {
  const dispatch  = useDispatch();
  const { addToast } = useToast();
  const { user }  = useAuth();

  const wishlistItems = useSelector(selectWishlistItems);
  const wishlistCount = useSelector(selectWishlistCount);

  useEffect(() => {
    if (!user?.id) return;
    wishlistApi.getAll()
      .then((res) => {
        const list = res.data?.data ?? [];
        dispatch(setWishlist(list));
      })
      .catch(() => {});
  }, [user?.id]);

  const toggleWishlist = useCallback(async (product) => {
    const inList = wishlistItems.some((i) => i.id === product.id);
    dispatch(toggleWishlistAction(product));
    try {
      await wishlistApi.toggle(product.id);
      addToast(inList ? 'Removed from wishlist' : 'Added to wishlist', inList ? 'info' : 'success');
    } catch {
      dispatch(toggleWishlistAction(product));
      addToast('Wishlist update failed', 'error');
    }
  }, [wishlistItems, dispatch, addToast]);

  const isInWishlist = useCallback((id) => wishlistItems.some((i) => i.id === id), [wishlistItems]);

  return { wishlistItems, wishlistCount, toggleWishlist, isInWishlist };
}
