import axiosClient from './axiosClient';

const productAPI = {
  getAll: () => {
    return axiosClient.get('/product/');
  },

  getById: (id) => {
    return axiosClient.get(`/product/detail/${id}`);
  },
};

export default productAPI;
