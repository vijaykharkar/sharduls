import { createSlice } from '@reduxjs/toolkit';

const loadCart = () => {
  try { return JSON.parse(localStorage.getItem('buyer_cart') || '[]'); } catch { return []; }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: loadCart() },
  reducers: {
    setCart(state, { payload }) {
      state.items = payload;
      localStorage.setItem('buyer_cart', JSON.stringify(state.items));
    },
    addToCart(state, { payload }) {
      const existing = state.items.find((i) => i.id === payload.id);
      if (existing) {
        existing.qty += 1;
      } else {
        state.items.push({ ...payload, qty: 1 });
      }
      localStorage.setItem('buyer_cart', JSON.stringify(state.items));
    },
    removeFromCart(state, { payload }) {
      state.items = state.items.filter((i) => i.id !== payload);
      localStorage.setItem('buyer_cart', JSON.stringify(state.items));
    },
    updateCartQty(state, { payload: { id, qty } }) {
      const item = state.items.find((i) => i.id === id);
      if (item) item.qty = Math.max(1, qty);
      localStorage.setItem('buyer_cart', JSON.stringify(state.items));
    },
    clearCart(state) {
      state.items = [];
      localStorage.removeItem('buyer_cart');
    },
  },
});

export const { setCart, addToCart, removeFromCart, updateCartQty, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
