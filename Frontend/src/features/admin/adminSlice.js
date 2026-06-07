import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import adminService from '@modules/admin/api/adminService';

export const fetchAdminDashboardThunk = createAsyncThunk(
  'admin/fetchDashboard',
  async (_, { rejectWithValue }) => {
    try {
      const res = await adminService.getDashboard();
      return res.data?.data || res.data;
    } catch (err) {
      return rejectWithValue(err.userMessage || err.message || 'Failed to load dashboard');
    }
  },
);

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    dashboardStats: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearAdminState(state) {
      state.dashboardStats = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminDashboardThunk.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchAdminDashboardThunk.fulfilled, (state, { payload }) => {
        state.dashboardStats = payload;
        state.loading = false;
      })
      .addCase(fetchAdminDashboardThunk.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const { clearAdminState } = adminSlice.actions;
export default adminSlice.reducer;
