import axiosInstance from './axiosInstance';

const adminService = {
  getDashboard: async () => {
    const res = await axiosInstance.get('/admin/dashboard');
    return res.data;
  },
  listSuppliers: async (params = {}) => {
    const res = await axiosInstance.get('/admin/suppliers', { params });
    return res.data;
  },
  getSupplier: async (id) => {
    const res = await axiosInstance.get(`/admin/suppliers/${id}`);
    return res.data;
  },
  updateSupplier: async (id, data) => {
    const res = await axiosInstance.patch(`/admin/suppliers/${id}`, data);
    return res.data;
  },
  deleteSupplier: async (id) => {
    const res = await axiosInstance.delete(`/admin/suppliers/${id}`);
    return res.data;
  },
  toggleStatus: async (id) => {
    const res = await axiosInstance.post(`/admin/suppliers/${id}/toggle-status`);
    return res.data;
  },
  approveSupplier: async (id) => {
    const res = await axiosInstance.post(`/admin/suppliers/${id}/approve`);
    return res.data;
  },
  rejectSupplier: async (id) => {
    const res = await axiosInstance.post(`/admin/suppliers/${id}/reject`);
    return res.data;
  },
  submitReview: async (id, reviewData) => {
    const res = await axiosInstance.post(`/admin/suppliers/${id}/review`, reviewData);
    return res.data;
  },
  getReview: async (id) => {
    const res = await axiosInstance.get(`/admin/suppliers/${id}/review`);
    return res.data;
  },
  getNotifications: async () => {
    const res = await axiosInstance.get('/admin/notifications');
    return res.data;
  },
  markNotificationRead: async (notifId) => {
    const res = await axiosInstance.post(`/admin/notifications/${notifId}/read`);
    return res.data;
  },

  // ── Products ──
  listProducts: async (params = {}) => {
    const res = await axiosInstance.get('/admin/products', { params });
    return res.data;
  },
  getProductStats: async () => {
    const res = await axiosInstance.get('/admin/products/stats');
    return res.data;
  },
  getProduct: async (id) => {
    const res = await axiosInstance.get(`/admin/products/${id}`);
    return res.data;
  },
  updateProductPricing: async (id, data) => {
    const res = await axiosInstance.patch(`/admin/products/${id}/pricing`, data);
    return res.data;
  },
  approveProduct: async (id) => {
    const res = await axiosInstance.post(`/admin/products/${id}/approve`);
    return res.data;
  },
  rejectProduct: async (id, reason = '') => {
    const res = await axiosInstance.post(`/admin/products/${id}/reject`, { reason });
    return res.data;
  },
  bulkApproveProducts: async (productIds) => {
    const res = await axiosInstance.post('/admin/products/bulk-approve', { product_ids: productIds });
    return res.data;
  },
  bulkPricingProducts: async (productIds, pricing) => {
    const res = await axiosInstance.post('/admin/products/bulk-pricing', { product_ids: productIds, ...pricing });
    return res.data;
  },
};

export default adminService;
