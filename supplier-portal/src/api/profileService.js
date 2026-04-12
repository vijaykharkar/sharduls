import axiosInstance from './axiosInstance';

const profileService = {
  getProfile: async () => {
    const res = await axiosInstance.get('/profile/me');
    return res.data;
  },

  saveBusinessDetails: async (data) => {
    const res = await axiosInstance.post('/profile/business-details', data);
    return res.data;
  },

  saveContactDetails: async (data) => {
    const res = await axiosInstance.post('/profile/contact-details', data);
    return res.data;
  },

  saveCategoryBrand: async (data) => {
    const res = await axiosInstance.post('/profile/category-brand', data);
    return res.data;
  },

  saveAddresses: async (data) => {
    const res = await axiosInstance.post('/profile/addresses', data);
    return res.data;
  },

  saveBankDetails: async (data) => {
    const res = await axiosInstance.post('/profile/bank-details', data);
    return res.data;
  },

  uploadDocument: async (docType, file) => {
    const formData = new FormData();
    formData.append('doc_type', docType);
    formData.append('file', file);
    const res = await axiosInstance.post('/profile/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: 60000,
    });
    return res.data;
  },
};

export default profileService;
