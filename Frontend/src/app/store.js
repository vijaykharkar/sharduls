import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@features/auth/authSlice';
import cartReducer from '@features/cart/cartSlice';
import wishlistReducer from '@features/wishlist/wishlistSlice';
import addressReducer from '@features/address/addressSlice';
import uiReducer from '@features/ui/uiSlice';
import supplierReducer from '@features/supplier/supplierSlice';
import adminReducer from '@features/admin/adminSlice';
import notificationReducer from '@features/notifications/notificationSlice';

/**
 * SINGLE APPLICATION STORE
 * All feature reducers register here.
 * Never create a second store anywhere in the application.
 *
 * Slice layout:
 *  auth         — user session, token, role, isAuthenticated
 *  cart         — buyer cart items (localStorage-synced)
 *  wishlist     — buyer wishlist items (localStorage-synced)
 *  address      — buyer addresses (localStorage-synced)
 *  ui           — modal state, search query
 *  supplier     — supplier profile steps and sections
 *  admin        — admin dashboard global data
 *  notifications — supplier/admin notification feed
 */
const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    address: addressReducer,
    ui: uiReducer,
    supplier: supplierReducer,
    admin: adminReducer,
    notifications: notificationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        /* Ignore these paths for file objects in supplier profile */
        ignoredPaths: ['supplier.businessDetails.udyamFile', 'supplier.bankDetails.cheque'],
      },
    }),
});

export default store;
