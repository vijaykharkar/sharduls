import { createAsyncThunk } from '@reduxjs/toolkit';
import authApi from '@shared/api/authApi';

const extractMsg = (err) => {
  const d = err.response?.data;
  if (d?.message) return d.message;
  if (d?.detail) return d.detail;
  if (d?.details) return Object.values(d.details).join(', ');
  return err.userMessage || err.message || 'Something went wrong';
};

export const loginThunk = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await authApi.login(email, password);
      return res.data.data || res.data;
    } catch (err) {
      return rejectWithValue(extractMsg(err));
    }
  },
);

export const registerThunk = createAsyncThunk(
  'auth/register',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await authApi.register(payload);
      return res.data.data || res.data;
    } catch (err) {
      return rejectWithValue(extractMsg(err));
    }
  },
);

export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authApi.logout();
    } catch {
      /* ignore — always clear client-side */
    }
  },
);

export const fetchMeThunk = createAsyncThunk(
  'auth/fetchMe',
  async (_, { rejectWithValue }) => {
    try {
      const res = await authApi.getMe();
      return res.data?.data || res.data;
    } catch (err) {
      return rejectWithValue(extractMsg(err));
    }
  },
);
