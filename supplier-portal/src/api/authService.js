import axiosInstance from './axiosInstance';

const authService = {
  register: async (data) => {
    const res = await axiosInstance.post('/auth/register', {
      full_name: data.name,
      email: data.email,
      phone: data.phone || null,
      password: data.password,
      role: data.role || 'supplier',
    });
    return res.data;
  },

  login: async (email, password) => {
    const res = await axiosInstance.post('/auth/login', { email, password });
    return res.data;
  },

  sendPhoneOtp: async (phone) => {
    const res = await axiosInstance.post('/auth/login-otp', { phone });
    return res.data;
  },

  sendEmailOtp: async (email) => {
    const res = await axiosInstance.post('/auth/send-email-otp', { email });
    return res.data;
  },

  verifyOtp: async (identifier, otp) => {
    const res = await axiosInstance.post('/auth/verify-otp', { identifier, otp });
    return res.data;
  },

  refreshToken: async (refreshToken) => {
    const res = await axiosInstance.post('/auth/refresh-token', { refresh_token: refreshToken });
    return res.data;
  },

  logout: async () => {
    const res = await axiosInstance.post('/auth/logout');
    return res.data;
  },

  getMe: async () => {
    const res = await axiosInstance.get('/auth/me');
    return res.data;
  },
};

export default authService;
