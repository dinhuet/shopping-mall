import axiosClient from './axiosClient';
import { toast } from 'react-toastify';

const cartAPI = {
    getCart: (token) => {
        return axiosClient.get('/cart', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },

    addToCart: (productId, quantity, token) => {
        console.log(token);
        if (!token) {
            toast.error('Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng');
            return Promise.reject(new Error('Unauthorized'));
        }
        return axiosClient.post(
            '/cart/add',
            { productId, quantity },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
    },

    updateCartItem: (productId, quantity, token) => {
        return axiosClient.put(
            `/cart/update/`,
            { productId, quantity },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
    },

    removeCartItem: (productId, token) => {
        return axiosClient.put(
            `/cart/remove`,
            {
                productId,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
    },
};

export default cartAPI;
