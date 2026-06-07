import { createSlice } from '@reduxjs/toolkit';

const loadWishlist = () => {
  try { return JSON.parse(localStorage.getItem('buyer_wishlist') || '[]'); } catch { return []; }
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: { items: loadWishlist() },
  reducers: {
    setWishlist(state, { payload }) {
      state.items = payload;
      localStorage.setItem('buyer_wishlist', JSON.stringify(state.items));
    },
    toggleWishlist(state, { payload }) {
      const idx = state.items.findIndex((i) => i.id === payload.id);
      if (idx >= 0) {
        state.items.splice(idx, 1);
      } else {
        state.items.push(payload);
      }
      localStorage.setItem('buyer_wishlist', JSON.stringify(state.items));
    },
    clearWishlist(state) {
      state.items = [];
      localStorage.removeItem('buyer_wishlist');
    },
  },
});

export const { setWishlist, toggleWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
