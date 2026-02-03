import axiosInstance from './axiosInstance';

const authService = {
  // Registration
  register: async (userData) => {
    const response = await axiosInstance.post('/auth/customer/register', userData);
    return response.data;
  },

  // Login - Email & Password
  loginEmailPassword: async (credentials) => {
    const response = await axiosInstance.post('/auth/customer/login', credentials);
    return response.data;
  },

  // Send OTP to Phone
  sendPhoneOTP: async (phone) => {
    const response = await axiosInstance.post('/auth/otp/send/phone', { phone });
    return response.data;
  },

  // Send OTP to Email
  sendEmailOTP: async (email) => {
    const response = await axiosInstance.post('/auth/otp/send/email', { email });
    return response.data;
  },

  // Login - Phone & OTP
  loginPhoneOTP: async (credentials) => {
    const response = await axiosInstance.post('/auth/customer/login/phone-otp', credentials);
    return response.data;
  },

  // Login - Email & OTP
  loginEmailOTP: async (credentials) => {
    const response = await axiosInstance.post('/auth/customer/login/email-otp', credentials);
    return response.data;
  },

  // Refresh Token
  refreshToken: async (refreshToken) => {
    const response = await axiosInstance.post('/auth/refresh', { refresh_token: refreshToken });
    return response.data;
  },

  // Get Current User
  getCurrentUser: async () => {
    const response = await axiosInstance.get('/auth/me');
    return response.data;
  },

  // Logout
  logout: async () => {
    const response = await axiosInstance.post('/auth/logout');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    return response.data;
  },
};

export default authService;
