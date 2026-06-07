import api from '@shared/api/axiosInstance';

const paymentApi = {
  createOrder: (data) => api.post('/orders/checkout', data),
  verifyPayment: (data) => api.post('/payments/verify', data),
  getHistory: (params = {}) => api.get('/payments/history', { params }),
  getById: (paymentId) => api.get(`/payments/${paymentId}`),
  getStatusByOrder: (orderId) => api.get(`/orders/${orderId}/payment-status`),
};

export default paymentApi;
