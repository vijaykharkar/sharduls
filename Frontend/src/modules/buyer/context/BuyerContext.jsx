import React from 'react';

/**
 * BuyerContext — State has been migrated to Redux Toolkit.
 *
 * Slice mapping:
 *   cartItems        → store.cart        (features/cart/cartSlice)
 *   wishlistItems    → store.wishlist     (features/wishlist/wishlistSlice)
 *   addresses        → store.address      (features/address/addressSlice)
 *   authModal / UI   → store.ui           (features/ui/uiSlice)
 *
 * BuyerProvider is kept as a pass-through so BuyerLayout does not need to change.
 */

export function BuyerProvider({ children }) {
  return children;
}

export default BuyerProvider;
