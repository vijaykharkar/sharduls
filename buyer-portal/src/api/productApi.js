import api from './axiosInstance';

const productApi = {
  getAll: (params = {}) => api.get('/products', { params }),
  getById: (id) => api.get(`/products/${id}`),
  getCategories: () => api.get('/products/categories'),
  search: (query) => api.get('/products/search', { params: { q: query } }),
};

export default productApi;
