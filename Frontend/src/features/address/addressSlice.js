import { createSlice } from '@reduxjs/toolkit';

const ACTIVE_KEY = 'buyer_addresses';
const userKey = (uid) => `buyer_addresses_${uid}`;

const loadAddresses = () => {
  try { return JSON.parse(localStorage.getItem(ACTIVE_KEY) || '[]'); } catch { return []; }
};

const save = (items) => localStorage.setItem(ACTIVE_KEY, JSON.stringify(items));

const addressSlice = createSlice({
  name: 'address',
  initialState: {
    items: loadAddresses(),
    selectedId: null,
  },
  reducers: {
    setAddresses(state, { payload }) {
      state.items = payload;
      save(state.items);
    },
    addAddress(state, { payload }) {
      state.items.push(payload);
      save(state.items);
    },
    updateAddress(state, { payload }) {
      const idx = state.items.findIndex((a) => a.id === payload.id);
      if (idx >= 0) state.items[idx] = payload;
      save(state.items);
    },
    removeAddress(state, { payload }) {
      state.items = state.items.filter((a) => a.id !== payload);
      if (state.selectedId === payload) state.selectedId = null;
      save(state.items);
    },
    selectAddress(state, { payload }) {
      state.selectedId = payload;
    },
    clearAddresses(state) {
      state.items = [];
      state.selectedId = null;
      localStorage.removeItem(ACTIVE_KEY);
    },
    saveUserAddresses(state, { payload: userId }) {
      if (userId) localStorage.setItem(userKey(userId), JSON.stringify(state.items));
      state.items = [];
      state.selectedId = null;
      localStorage.removeItem(ACTIVE_KEY);
    },
    loadUserAddresses(state, { payload: userId }) {
      try {
        const items = JSON.parse(localStorage.getItem(userKey(userId)) || '[]');
        state.items = items;
        save(items);
      } catch { state.items = []; }
    },
  },
});

export const {
  setAddresses, addAddress, updateAddress, removeAddress, selectAddress, clearAddresses,
  saveUserAddresses, loadUserAddresses,
} = addressSlice.actions;
export default addressSlice.reducer;
