import axios from 'axios';

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001', // API URL của backend
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Cần thiết để gửi cookie hoặc token
});

// Thêm interceptor để gửi token nếu có
axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// tự động xử lý khi token hết hạn
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Nếu lỗi 401 và chưa thử refresh token
    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        // Gọi API để lấy access_token mới
        const res = await axios.post(
          'http://localhost:3001/user/refresh-token',
          {},
          { withCredentials: true } // gửi cookie chứa refresh_token
        );

        const newToken = res.data.accessToken;

        // Lưu lại vào localStorage
        localStorage.setItem('token', newToken);

        // Gắn lại token và retry request
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosClient(originalRequest);
      } catch (refreshErr) {
        console.error('Refresh token failed', refreshErr);
        // Có thể logout ở đây
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);
export default axiosClient;
