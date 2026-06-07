import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import supplierService from '@modules/supplier/api/supplierService';

export const fetchNotificationsThunk = createAsyncThunk(
  'notifications/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const res = await supplierService.getMyNotifications();
      return res.data || res;
    } catch (err) {
      return rejectWithValue(err.userMessage || err.message || 'Failed to load notifications');
    }
  },
);

export const markNotificationReadThunk = createAsyncThunk(
  'notifications/markRead',
  async (id, { rejectWithValue }) => {
    try {
      await supplierService.markNotificationRead(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.userMessage || err.message);
    }
  },
);

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: {
    items: [],
    unreadCount: 0,
    loading: false,
  },
  reducers: {
    clearNotifications(state) {
      state.items = [];
      state.unreadCount = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotificationsThunk.pending, (state) => { state.loading = true; })
      .addCase(fetchNotificationsThunk.fulfilled, (state, { payload }) => {
        state.items = Array.isArray(payload) ? payload : payload?.items || [];
        state.unreadCount = state.items.filter((n) => !n.is_read).length;
        state.loading = false;
      })
      .addCase(fetchNotificationsThunk.rejected, (state) => { state.loading = false; })
      .addCase(markNotificationReadThunk.fulfilled, (state, { payload: id }) => {
        const notif = state.items.find((n) => n.id === id);
        if (notif && !notif.is_read) {
          notif.is_read = true;
          state.unreadCount = Math.max(0, state.unreadCount - 1);
        }
      });
  },
});

export const { clearNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;
