import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:3001', // Backend đang chạy cổng 3001
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // giả sử bạn lưu token ở localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;
