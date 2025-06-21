// src/api/authAPI.js
import axiosClient from './axiosClient';

const authAPI = {
    login: (credentials) => {
        return axiosClient
            .post('/user/login', credentials, { withCredentials: true })
            .then((response) => response.data)
            .catch((error) => {
                throw new Error(
                    error.response?.data?.message ||
                        'Có lỗi xảy ra, vui lòng thử lại',
                );
            });
    },

    logout: () => {
        return axiosClient
            .post('/user/logout', {}, { withCredentials: true })
            .then((response) => response.data)
            .catch((error) => {
                throw new Error(
                    error.response?.data?.message ||
                        'Có lỗi xảy ra khi đăng xuất',
                );
            });
    },

    register: (userData) => {
        return axiosClient
            .post('/user/register', userData, { withCredentials: true })
            .then((response) => response.data)
            .catch((error) => {
                if (error.response) {
                    console.log('Error response:', error.response);
                    console.log('Error data:', error);
                    throw new Error(
                        error.response?.data?.message ||
                            'Có lỗi xảy ra, vui lòng thử lại',
                    );
                } else {
                    throw new Error('Lỗi kết nối, vui lòng kiểm tra lại');
                }
            });
    },

    getProfile: (token) => {
        return axiosClient
            .get('/user/profile', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            })
            .then((response) => response.data)
            .catch((error) => {
                throw new Error(
                    error.response?.data?.message ||
                        'Có lỗi xảy ra khi lấy thông tin người dùng',
                );
            });
    },
};

export default authAPI;
