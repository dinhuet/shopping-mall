import axiosClient from './axiosClient';

const userAPI = {
  getProfile: () => {
    return axiosClient.get('/user/profile');
  },

  updateProfile: (data) => {
    return axiosClient.put('/user/profile', data);
  },

  changePassword: (data) => {
    return axiosClient.put('/user/change-password', data);
  },

  getAllUsers: () => {
    return axiosClient.get('/user/all');
  },

  deleteUser: (id) => {
    return axiosClient.delete(`/user/${id}`);
  }
};

export default userAPI;
