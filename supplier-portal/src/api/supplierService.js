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

  // Get product categories (public endpoint)
  getProductCategories: async () => {
    const response = await axiosInstance.get('/products/categories');
    return response.data;
  },

  // Get current user
  getCurrentUser: async () => {
    const response = await axiosInstance.get('/auth/me');
    return response.data;
  },

  // Get admin review for my profile
  getMyReview: async () => {
    const response = await axiosInstance.get('/supplier/my-review');
    return response.data;
  },

  // Get my notifications
  getMyNotifications: async () => {
    const response = await axiosInstance.get('/supplier/notifications');
    return response.data;
  },

  // Mark notification as read
  markNotificationRead: async (notifId) => {
    const response = await axiosInstance.post(`/supplier/notifications/${notifId}/read`);
    return response.data;
  },

  // ── Product Images ──
  uploadProductImages: async (files) => {
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));
    const response = await axiosInstance.post('/supplier/products/upload-images', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  // ── Product CRUD ──
  getMyProducts: async (params = {}) => {
    const response = await axiosInstance.get('/supplier/products', { params });
    return response.data;
  },
  createProduct: async (data) => {
    const response = await axiosInstance.post('/supplier/products', data);
    return response.data;
  },
  updateProduct: async (id, data) => {
    const response = await axiosInstance.patch(`/supplier/products/${id}`, data);
    return response.data;
  },
  deleteProduct: async (id) => {
    const response = await axiosInstance.delete(`/supplier/products/${id}`);
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
