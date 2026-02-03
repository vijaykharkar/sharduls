import axiosInstance from './axiosInstance';

const authService = {
  // Registration for Suppliers
  register: async (userData) => {
    const response = await axiosInstance.post('/auth/supplier/register', userData);
    return response.data;
  },

  // Login for Suppliers
  login: async (credentials) => {
    const response = await axiosInstance.post('/auth/supplier/login', credentials);
    return response.data;
  },

  // Refresh Token
  refreshToken: async (refreshToken) => {
    const response = await axiosInstance.post('/auth/refresh', { refresh_token: refreshToken });
    return response.data;
  },

  // Get Current User
  getCurrentUser: async () => {
    const response = await axiosInstance.get('/auth/me');
    return response.data;
  },

  // Logout
  logout: async () => {
    const response = await axiosInstance.post('/auth/logout');
    localStorage.removeItem('supplier_access_token');
    localStorage.removeItem('supplier_refresh_token');
    localStorage.removeItem('supplier_user');
    return response.data;
  },
};

export default authService;
