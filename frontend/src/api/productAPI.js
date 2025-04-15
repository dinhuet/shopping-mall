import axiosClient from './axiosClient';

const productAPI = {
  getAll: () => {
    return axiosClient.get('/products');
  },

  getById: (id) => {
    return axiosClient.get(`/products/${id}`);
  },
};

export default productAPI;
