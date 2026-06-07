import { createAsyncThunk } from '@reduxjs/toolkit';
import profileService from '@modules/supplier/api/profileService';

export const fetchSupplierProfileThunk = createAsyncThunk(
  'supplier/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const res = await profileService.getProfile();
      return res?.data || res;
    } catch (err) {
      return rejectWithValue(err.userMessage || err.message || 'Failed to load profile');
    }
  },
);
