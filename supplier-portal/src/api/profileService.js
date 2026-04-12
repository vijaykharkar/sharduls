import axiosInstance from './axiosInstance';

const profileService = {
  getProfile: async () => {
    const res = await axiosInstance.get('/profile/me');
    return res.data;
  },

  updateProfile: async (data) => {
    const res = await axiosInstance.patch('/profile/me', data);
    return res.data;
  },
};

export default profileService;
