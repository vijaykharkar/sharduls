import { createSlice } from '@reduxjs/toolkit';
import { loginThunk, registerThunk, logoutThunk, fetchMeThunk } from './authThunks';

const KEYS = { access: 'access_token', refresh: 'refresh_token', user: 'user' };

const normalizeRole = (r) => (r || '').toLowerCase().replace('_', '');

const persistAuth = (user, tokens) => {
  localStorage.setItem(KEYS.access, tokens.access_token);
  localStorage.setItem(KEYS.refresh, tokens.refresh_token);
  localStorage.setItem(KEYS.user, JSON.stringify(user));
};

const clearAuthStorage = () => {
  Object.values(KEYS).forEach((k) => localStorage.removeItem(k));
};

const hydrateFromStorage = () => {
  try {
    const token = localStorage.getItem(KEYS.access);
    const raw = localStorage.getItem(KEYS.user);
    if (token && raw) {
      const u = JSON.parse(raw);
      const role = normalizeRole(u.role);
      return { user: { ...u, role }, token, role, isAuthenticated: true };
    }
  } catch {}
  return { user: null, token: null, role: null, isAuthenticated: false };
};

const initialState = {
  ...hydrateFromStorage(),
  loading: true,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, { payload: { user, tokens } }) {
      const role = normalizeRole(user.role);
      const normUser = { ...user, role };
      state.user = normUser;
      state.token = tokens.access_token;
      state.role = role;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
      persistAuth(normUser, tokens);
    },
    updateUser(state, action) {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        localStorage.setItem(KEYS.user, JSON.stringify(state.user));
      }
    },
    setAuthLoading(state, action) {
      state.loading = action.payload;
    },
    clearAuthError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    /* ── Login ── */
    builder
      .addCase(loginThunk.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(loginThunk.fulfilled, (state, { payload }) => {
        const { user, tokens } = payload;
        const role = normalizeRole(user.role);
        const normUser = { ...user, role };
        state.user = normUser;
        state.token = tokens.access_token;
        state.role = role;
        state.isAuthenticated = true;
        state.loading = false;
        state.error = null;
        persistAuth(normUser, tokens);
      })
      .addCase(loginThunk.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload || 'Login failed';
      });

    /* ── Register ── */
    builder
      .addCase(registerThunk.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(registerThunk.fulfilled, (state, { payload }) => {
        const { user, tokens } = payload;
        const role = normalizeRole(user.role);
        const normUser = { ...user, role };
        state.user = normUser;
        state.token = tokens.access_token;
        state.role = role;
        state.isAuthenticated = true;
        state.loading = false;
        state.error = null;
        persistAuth(normUser, tokens);
      })
      .addCase(registerThunk.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload || 'Registration failed';
      });

    /* ── Logout ── */
    builder.addCase(logoutThunk.fulfilled, (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      clearAuthStorage();
    });

    /* ── Fetch Me (session validation on load) ── */
    builder
      .addCase(fetchMeThunk.pending, (state) => { state.loading = true; })
      .addCase(fetchMeThunk.fulfilled, (state, { payload }) => {
        const role = normalizeRole(payload.role);
        const normUser = { ...payload, role };
        state.user = normUser;
        state.role = role;
        state.isAuthenticated = true;
        state.loading = false;
        localStorage.setItem(KEYS.user, JSON.stringify(normUser));
      })
      .addCase(fetchMeThunk.rejected, (state) => {
        state.user = null;
        state.token = null;
        state.role = null;
        state.isAuthenticated = false;
        state.loading = false;
        clearAuthStorage();
      });
  },
});

export const { setAuth, updateUser, setAuthLoading, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
