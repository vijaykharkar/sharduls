import api from './axiosInstance';

const productApi = {
  getAll: (params = {}) => api.get('/products', { params }),
  getById: (id) => api.get(`/products/${id}`),
  getCategories: () => api.get('/products/categories'),
  getBrands: () => api.get('/products/brands'),
  search: (query) => api.get('/products/search', { params: { q: query } }),
};

export default productApi;
