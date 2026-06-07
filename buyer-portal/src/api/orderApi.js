import api from './axiosInstance';

const orderApi = {
  /**
   * Create order + Stripe PaymentIntent.
   * @param {{ items: {product_id:number, quantity:number}[], shipping_address: object }} data
   * @returns {{ order_id, order_number, total_amount, currency, payment_id, client_secret, stripe_publishable_key }}
   */
  checkout: (data) => api.post('/orders/checkout', data),

  getAll: (params = {}) => api.get('/orders', { params }),

  getById: (id) => api.get(`/orders/${id}`),

  getPaymentStatus: (orderId) => api.get(`/orders/${orderId}/payment-status`),
};

export default orderApi;
