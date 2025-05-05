import axiosClient from './axiosClient';

const productAPI = {
  getAll: () => {
    return axiosClient.get('/api/menu'); // Đảm bảo là /api/menu
  },

  getById: (id) => {
    return axiosClient.get(`/api/menu/${id}`); // Đảm bảo là /api/menu/:id
  },
};

export default productAPI;
