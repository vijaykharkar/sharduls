import axiosInstance from './axiosInstance';

const supplierService = {
  // Step 1: Personal info + send OTP
  step1: async (data) => {
    const response = await axiosInstance.post('/supplier/onboarding/step1', data);
    return response.data;
  },

  // Verify OTP
  verifyOTP: async (data) => {
    const response = await axiosInstance.post('/supplier/onboarding/verify-otp', data);
    return response.data;
  },

  // Step 2: Business details
  step2: async (data) => {
    const response = await axiosInstance.post('/supplier/onboarding/step2', data);
    return response.data;
  },

  // Step 3: Create password
  step3: async (data) => {
    const response = await axiosInstance.post('/supplier/onboarding/step3', data);
    return response.data;
  },

  // Login with phone
  loginPhone: async (credentials) => {
    const response = await axiosInstance.post('/supplier/login/phone', credentials);
    return response.data;
  },

  // Login with email
  loginEmail: async (credentials) => {
    const response = await axiosInstance.post('/supplier/login/email', credentials);
    return response.data;
  },

  // Get product categories
  getProductCategories: async () => {
    const response = await axiosInstance.get('/supplier/product-categories');
    return response.data;
  },

  // Get current user
  getCurrentUser: async () => {
    const response = await axiosInstance.get('/auth/me');
    return response.data;
  },

  // Logout
  logout: () => {
    localStorage.removeItem('supplier_access_token');
    localStorage.removeItem('supplier_refresh_token');
    localStorage.removeItem('supplier_user');
  },
};

export default supplierService;
