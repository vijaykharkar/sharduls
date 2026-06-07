import api from '@shared/api/axiosInstance';

const orderApi = {
  checkout: (data) => api.post('/orders/checkout', data),
  getAll: (params = {}) => api.get('/orders', { params }),
  getById: (id) => api.get(`/orders/${id}`),
  getPaymentStatus: (orderId) => api.get(`/orders/${orderId}/payment-status`),
};

export default orderApi;
