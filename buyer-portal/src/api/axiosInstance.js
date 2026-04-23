import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: `${API_BASE}/api/v1`,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

/* ── Request interceptor: attach token ── */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('buyer_access_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

/* ── Response interceptor: normalize errors ── */
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response) {
      const msg =
        err.response.data?.message ||
        err.response.data?.detail ||
        `Error ${err.response.status}`;
      err.userMessage = msg;
    } else if (err.request) {
      err.userMessage = 'Network error — please check your connection';
    } else {
      err.userMessage = err.message || 'Something went wrong';
    }
    return Promise.reject(err);
  },
);

export default api;
