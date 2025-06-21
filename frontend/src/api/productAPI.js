import axiosClient from './axiosClient';

const productAPI = {
    getAll: (type) => {
        return axiosClient.get(`/product?type=${type || ''}`);
    },

    getById: (id) => {
        return axiosClient.get(`/product/detail/${id}`);
    },
};

export default productAPI;
