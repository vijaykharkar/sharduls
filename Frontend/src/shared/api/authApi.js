import api from './axiosInstance';

const authApi = {
  register: (data) => api.post('/auth/register', data),
  login: (email, password) => api.post('/auth/login', { email, password }),
  sendOtp: (phone) => api.post('/auth/login-otp', { phone }),
  verifyOtp: (identifier, otp) => api.post('/auth/verify-otp', { identifier, otp }),
  sendRegistrationOtp: (phone) => api.post('/auth/register-send-otp', { phone }),
  verifyRegistrationOtp: (phone, otp) => api.post('/auth/register-verify-otp', { phone, otp }),
  sendEmailOtp: (email) => api.post('/auth/send-email-otp', { email }),
  logout: () => api.post('/auth/logout'),
  getMe: () => api.get('/auth/me'),
  refreshToken: (refresh_token) => api.post('/auth/refresh-token', { refresh_token }),
};

export default authApi;
