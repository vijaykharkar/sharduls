import { createSlice } from '@reduxjs/toolkit';

const loadAddresses = () => {
  try { return JSON.parse(localStorage.getItem('buyer_addresses') || '[]'); } catch { return []; }
};

const addressSlice = createSlice({
  name: 'address',
  initialState: {
    items: loadAddresses(),
    selectedId: null,
  },
  reducers: {
    setAddresses(state, { payload }) {
      state.items = payload;
      localStorage.setItem('buyer_addresses', JSON.stringify(state.items));
    },
    addAddress(state, { payload }) {
      state.items.push(payload);
      localStorage.setItem('buyer_addresses', JSON.stringify(state.items));
    },
    updateAddress(state, { payload }) {
      const idx = state.items.findIndex((a) => a.id === payload.id);
      if (idx >= 0) state.items[idx] = payload;
      localStorage.setItem('buyer_addresses', JSON.stringify(state.items));
    },
    removeAddress(state, { payload }) {
      state.items = state.items.filter((a) => a.id !== payload);
      if (state.selectedId === payload) state.selectedId = null;
      localStorage.setItem('buyer_addresses', JSON.stringify(state.items));
    },
    selectAddress(state, { payload }) {
      state.selectedId = payload;
    },
    clearAddresses(state) {
      state.items = [];
      state.selectedId = null;
      localStorage.removeItem('buyer_addresses');
    },
  },
});

export const {
  setAddresses, addAddress, updateAddress, removeAddress, selectAddress, clearAddresses,
} = addressSlice.actions;
export default addressSlice.reducer;
