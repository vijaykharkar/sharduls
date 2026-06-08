import api from '@shared/api/axiosInstance';

const wishlistApi = {
  getAll:  ()          => api.get('/wishlist'),
  add:     (productId) => api.post(`/wishlist/${productId}`),
  remove:  (productId) => api.delete(`/wishlist/${productId}`),
  toggle:  (productId) => api.post(`/wishlist/${productId}/toggle`),
};

export default wishlistApi;
