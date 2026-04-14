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
};

export default adminService;
