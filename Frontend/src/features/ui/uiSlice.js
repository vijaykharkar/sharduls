import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    authModalOpen: false,
    authModalTab: 'login',
    searchQuery: '',
  },
  reducers: {
    openAuthModal(state, { payload = 'login' }) {
      state.authModalOpen = true;
      state.authModalTab = payload;
    },
    closeAuthModal(state) {
      state.authModalOpen = false;
    },
    setSearchQuery(state, { payload }) {
      state.searchQuery = payload;
    },
    resetUI(state) {
      state.authModalOpen = false;
      state.authModalTab = 'login';
      state.searchQuery = '';
    },
  },
});

export const { openAuthModal, closeAuthModal, setSearchQuery, resetUI } = uiSlice.actions;
export default uiSlice.reducer;
