import { createSlice } from '@reduxjs/toolkit';

const ACTIVE_KEY = 'buyer_wishlist';
const userKey = (uid) => `buyer_wishlist_${uid}`;

const loadWishlist = () => {
  try { return JSON.parse(localStorage.getItem(ACTIVE_KEY) || '[]'); } catch { return []; }
};

const save = (items) => localStorage.setItem(ACTIVE_KEY, JSON.stringify(items));

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: { items: loadWishlist() },
  reducers: {
    setWishlist(state, { payload }) {
      state.items = payload;
      save(state.items);
    },
    toggleWishlist(state, { payload }) {
      const idx = state.items.findIndex((i) => i.id === payload.id);
      if (idx >= 0) { state.items.splice(idx, 1); } else { state.items.push(payload); }
      save(state.items);
    },
    clearWishlist(state) {
      state.items = [];
      localStorage.removeItem(ACTIVE_KEY);
    },
    saveUserWishlist(state, { payload: userId }) {
      if (userId) localStorage.setItem(userKey(userId), JSON.stringify(state.items));
      state.items = [];
      localStorage.removeItem(ACTIVE_KEY);
    },
    loadUserWishlist(state, { payload: userId }) {
      try {
        const saved = JSON.parse(localStorage.getItem(userKey(userId)) || '[]');
        const current = state.items;
        const merged = [...saved];
        for (const item of current) {
          if (!merged.find((i) => i.id === item.id)) merged.push(item);
        }
        state.items = merged;
        save(merged);
      } catch { state.items = []; }
    },
  },
});

export const { setWishlist, toggleWishlist, clearWishlist, saveUserWishlist, loadUserWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
