import axiosClient from './axiosClient';

const authAPI = {
  // Đăng ký người dùng
  register: (userData) => {
    return axiosClient.post('/user/register', userData, { withCredentials: true })
      .then(response => response.data)
      .catch(error => {
        if (error.response) {
          // Nếu có lỗi từ server (ví dụ: email đã tồn tại)
          throw new Error(error.response.data.message || 'Có lỗi xảy ra, vui lòng thử lại');
        } else {
          // Nếu không có phản hồi từ server
          throw new Error('Lỗi kết nối, vui lòng kiểm tra lại');
        }
      });
  },

  // Đăng nhập người dùng
  login: (credentials) => {
    return axiosClient.post('/user/login', credentials, { withCredentials: true })
      .then(response => response.data)
      .catch(error => {
        throw new Error(error.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại');
      });
  },

  // Lấy thông tin người dùng từ token
  getProfile: (token) => {
    return axiosClient.get('/user/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    })
    .then(response => response.data)
    .catch(error => {
      throw new Error(error.response?.data?.message || 'Có lỗi xảy ra khi lấy thông tin người dùng');
    });
  },
};

export default authAPI;
