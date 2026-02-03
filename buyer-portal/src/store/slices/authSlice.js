import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../api/authService';

// Load initial state from localStorage
const loadUserFromStorage = () => {
  try {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('access_token');
    if (user && token) {
      return { user: JSON.parse(user), isAuthenticated: true };
    }
  } catch (error) {
    console.error('Error loading user from storage:', error);
  }
  return { user: null, isAuthenticated: false };
};

const { user: initialUser, isAuthenticated: initialAuth } = loadUserFromStorage();

const initialState = {
  user: initialUser,
  isAuthenticated: initialAuth,
  loading: false,
  error: null,
  otpSent: false,
  otpLoading: false,
};

// Async thunks
export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authService.register(userData);
      localStorage.setItem('access_token', response.access_token);
      localStorage.setItem('refresh_token', response.refresh_token);
      localStorage.setItem('user', JSON.stringify(response.user));
      return response.user;
    } catch (error) {
      return rejectWithValue(error.response?.data?.detail || 'Registration failed');
    }
  }
);

export const loginEmailPassword = createAsyncThunk(
  'auth/loginEmailPassword',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authService.loginEmailPassword(credentials);
      localStorage.setItem('access_token', response.access_token);
      localStorage.setItem('refresh_token', response.refresh_token);
      localStorage.setItem('user', JSON.stringify(response.user));
      return response.user;
    } catch (error) {
      return rejectWithValue(error.response?.data?.detail || 'Login failed');
    }
  }
);

export const sendPhoneOTP = createAsyncThunk(
  'auth/sendPhoneOTP',
  async (phone, { rejectWithValue }) => {
    try {
      const response = await authService.sendPhoneOTP(phone);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.detail || 'Failed to send OTP');
    }
  }
);

export const sendEmailOTP = createAsyncThunk(
  'auth/sendEmailOTP',
  async (email, { rejectWithValue }) => {
    try {
      const response = await authService.sendEmailOTP(email);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.detail || 'Failed to send OTP');
    }
  }
);

export const loginPhoneOTP = createAsyncThunk(
  'auth/loginPhoneOTP',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authService.loginPhoneOTP(credentials);
      localStorage.setItem('access_token', response.access_token);
      localStorage.setItem('refresh_token', response.refresh_token);
      localStorage.setItem('user', JSON.stringify(response.user));
      return response.user;
    } catch (error) {
      return rejectWithValue(error.response?.data?.detail || 'OTP verification failed');
    }
  }
);

export const loginEmailOTP = createAsyncThunk(
  'auth/loginEmailOTP',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authService.loginEmailOTP(credentials);
      localStorage.setItem('access_token', response.access_token);
      localStorage.setItem('refresh_token', response.refresh_token);
      localStorage.setItem('user', JSON.stringify(response.user));
      return response.user;
    } catch (error) {
      return rejectWithValue(error.response?.data?.detail || 'OTP verification failed');
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.getCurrentUser();
      localStorage.setItem('user', JSON.stringify(response));
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.detail || 'Failed to fetch user');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
      return null;
    } catch (error) {
      // Logout locally even if API call fails
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
      return null;
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetOtpState: (state) => {
      state.otpSent = false;
      state.otpLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Login Email Password
      .addCase(loginEmailPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginEmailPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(loginEmailPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Send Phone OTP
      .addCase(sendPhoneOTP.pending, (state) => {
        state.otpLoading = true;
        state.error = null;
      })
      .addCase(sendPhoneOTP.fulfilled, (state) => {
        state.otpLoading = false;
        state.otpSent = true;
      })
      .addCase(sendPhoneOTP.rejected, (state, action) => {
        state.otpLoading = false;
        state.error = action.payload;
      })
      // Send Email OTP
      .addCase(sendEmailOTP.pending, (state) => {
        state.otpLoading = true;
        state.error = null;
      })
      .addCase(sendEmailOTP.fulfilled, (state) => {
        state.otpLoading = false;
        state.otpSent = true;
      })
      .addCase(sendEmailOTP.rejected, (state, action) => {
        state.otpLoading = false;
        state.error = action.payload;
      })
      // Login Phone OTP
      .addCase(loginPhoneOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginPhoneOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.otpSent = false;
      })
      .addCase(loginPhoneOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Login Email OTP
      .addCase(loginEmailOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginEmailOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.otpSent = false;
      })
      .addCase(loginEmailOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get Current User
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = null;
        state.otpSent = false;
      });
  },
});

export const { clearError, resetOtpState } = authSlice.actions;
export default authSlice.reducer;
