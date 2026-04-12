import axiosInstance from './axiosInstance';

const authService = {
  // Registration
  register: async (userData) => {
    const response = await axiosInstance.post('/auth/register', {
      full_name: userData.name || userData.full_name,
      email: userData.email,
      phone: userData.phone || null,
      password: userData.password,
      role: 'buyer',
    });
    return response.data;
  },

  // Login - Email & Password
  loginEmailPassword: async (credentials) => {
    const response = await axiosInstance.post('/auth/login', {
      email: credentials.email,
      password: credentials.password,
    });
    return response.data;
  },

  // Send OTP to Phone
  sendPhoneOTP: async (phone) => {
    const response = await axiosInstance.post('/auth/login-otp', { phone });
    return response.data;
  },

  // Send OTP to Email
  sendEmailOTP: async (email) => {
    const response = await axiosInstance.post('/auth/send-email-otp', { email });
    return response.data;
  },

  // Verify OTP (works for both phone and email)
  verifyOTP: async (identifier, otp) => {
    const response = await axiosInstance.post('/auth/verify-otp', { identifier, otp });
    return response.data;
  },

  // Login - Phone & OTP (send then verify)
  loginPhoneOTP: async (credentials) => {
    const response = await axiosInstance.post('/auth/verify-otp', {
      identifier: credentials.phone,
      otp: credentials.otp,
    });
    return response.data;
  },

  // Login - Email & OTP (send then verify)
  loginEmailOTP: async (credentials) => {
    const response = await axiosInstance.post('/auth/verify-otp', {
      identifier: credentials.email,
      otp: credentials.otp,
    });
    return response.data;
  },

  // Refresh Token
  refreshToken: async (refreshToken) => {
    const response = await axiosInstance.post('/auth/refresh-token', { refresh_token: refreshToken });
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
