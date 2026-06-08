import { createSlice } from '@reduxjs/toolkit';

const ACTIVE_KEY = 'buyer_cart';
const userKey = (uid) => `buyer_cart_${uid}`;

const loadCart = () => {
  try { return JSON.parse(localStorage.getItem(ACTIVE_KEY) || '[]'); } catch { return []; }
};

const save = (items) => localStorage.setItem(ACTIVE_KEY, JSON.stringify(items));

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: loadCart() },
  reducers: {
    setCart(state, { payload }) {
      state.items = payload;
      save(state.items);
    },
    addToCart(state, { payload }) {
      const existing = state.items.find((i) => i.id === payload.id);
      if (existing) { existing.qty += 1; } else { state.items.push({ ...payload, qty: 1 }); }
      save(state.items);
    },
    removeFromCart(state, { payload }) {
      state.items = state.items.filter((i) => i.id !== payload);
      save(state.items);
    },
    updateCartQty(state, { payload: { id, qty } }) {
      const item = state.items.find((i) => i.id === id);
      if (item) item.qty = Math.max(1, qty);
      save(state.items);
    },
    clearCart(state) {
      state.items = [];
      localStorage.removeItem(ACTIVE_KEY);
    },
    saveUserCart(state, { payload: userId }) {
      if (userId) localStorage.setItem(userKey(userId), JSON.stringify(state.items));
      state.items = [];
      localStorage.removeItem(ACTIVE_KEY);
    },
    loadUserCart(state, { payload: userId }) {
      try {
        const items = JSON.parse(localStorage.getItem(userKey(userId)) || '[]');
        state.items = items;
        save(items);
      } catch { state.items = []; }
    },
  },
});

export const {
  setCart, addToCart, removeFromCart, updateCartQty, clearCart,
  saveUserCart, loadUserCart,
} = cartSlice.actions;
export default cartSlice.reducer;
