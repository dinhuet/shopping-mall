import axiosClient from './axiosClient';

const authAPI = {
  register: (userData) => {
    return axiosClient.post('/users/register', userData);
  },

  login: (credentials) => {
    return axiosClient.post('/users/login', credentials);
  },

  getProfile: (token) => {
    return axiosClient.get('/users/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default authAPI;
