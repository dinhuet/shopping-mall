import axiosClient from './axiosClient';

const cartAPI = {
    getCart: (token) => {
        return axiosClient.get('/cart', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },

    addToCart: (productId, quantity = 1, token) => {
        return axiosClient.post(
            '/cart',
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
            `/cart/${productId}`,
            { quantity },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
    },

    removeCartItem: (productId, token) => {
        return axiosClient.delete(`/cart/${productId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },
};

export default cartAPI;
