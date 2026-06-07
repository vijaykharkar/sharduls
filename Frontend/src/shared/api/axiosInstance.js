import axios from 'axios';
import env from '@shared/config/env';

const API_BASE_URL = env.API_BASE_URL;

const api = axios.create({
  baseURL: `${API_BASE_URL}/api/v1`,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

/* ── Request: attach token ── */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

/* ── Response: refresh token on 401 + normalize errors ── */
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    const isAuthEndpoint = originalRequest.url?.includes('/auth/');

    if (error.response?.status === 401 && !originalRequest._retry && !isAuthEndpoint) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) throw new Error('No refresh token');

        const response = await axios.post(`${API_BASE_URL}/api/v1/auth/refresh-token`, {
          refresh_token: refreshToken,
        });

        const tokens = response.data?.data?.tokens || response.data;
        localStorage.setItem('access_token', tokens.access_token);
        localStorage.setItem('refresh_token', tokens.refresh_token);

        originalRequest.headers.Authorization = `Bearer ${tokens.access_token}`;
        return api(originalRequest);
      } catch {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        window.location.href = '/login';
        return Promise.reject(error);
      }
    }

    if (error.response) {
      error.userMessage =
        error.response.data?.message ||
        error.response.data?.detail ||
        `Error ${error.response.status}`;
    } else if (error.request) {
      error.userMessage = 'Network error — please check your connection';
    } else {
      error.userMessage = error.message || 'Something went wrong';
    }
    return Promise.reject(error);
  },
);

export default api;
