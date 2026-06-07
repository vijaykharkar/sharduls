import api from '@shared/api/axiosInstance';

const supplierService = {
  step1: async (data) => {
    const response = await api.post('/supplier/onboarding/step1', data);
    return response.data;
  },

  verifyOTP: async (data) => {
    const response = await api.post('/supplier/onboarding/verify-otp', data);
    return response.data;
  },

  step2: async (data) => {
    const response = await api.post('/supplier/onboarding/step2', data);
    return response.data;
  },

  step3: async (data) => {
    const response = await api.post('/supplier/onboarding/step3', data);
    return response.data;
  },

  loginPhone: async (credentials) => {
    const response = await api.post('/supplier/login/phone', credentials);
    return response.data;
  },

  loginEmail: async (credentials) => {
    const response = await api.post('/supplier/login/email', credentials);
    return response.data;
  },

  getProductCategories: async () => {
    const response = await api.get('/products/categories');
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  getMyReview: async () => {
    const response = await api.get('/supplier/my-review');
    return response.data;
  },

  getMyNotifications: async () => {
    const response = await api.get('/supplier/notifications');
    return response.data;
  },

  markNotificationRead: async (notifId) => {
    const response = await api.post(`/supplier/notifications/${notifId}/read`);
    return response.data;
  },

  uploadProductImages: async (files) => {
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));
    const response = await api.post('/supplier/products/upload-images', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  getMyProducts: async (params = {}) => {
    const response = await api.get('/supplier/products', { params });
    return response.data;
  },
  createProduct: async (data) => {
    const response = await api.post('/supplier/products', data);
    return response.data;
  },
  updateProduct: async (id, data) => {
    const response = await api.patch(`/supplier/products/${id}`, data);
    return response.data;
  },
  deleteProduct: async (id) => {
    const response = await api.delete(`/supplier/products/${id}`);
    return response.data;
  },
};

export default supplierService;
