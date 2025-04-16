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

export default axiosClient;
