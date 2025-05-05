import axiosClient from './axiosClient';

const authAPI = {
  login: (credentials) => {
    return axiosClient.post('/user/login', credentials, { withCredentials: true })
      .then((res) => res.data)
      .catch((error) => {
        throw new Error(error.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại');
      });
  },

  adminLogin: async (credentials) => {
    try {
      const response = await axiosClient.post('/admin/login', credentials, { withCredentials: true });
      const { token, admin } = response.data;
      if (!token) {
        throw new Error('Không nhận được token từ server');
      }
      return { token, admin }; // Trả về object đầy đủ
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Đăng nhập thất bại');
    }
  },

  register: (userData) => {
    return axiosClient.post('/user/register', userData, { withCredentials: true })
      .then((res) => res.data)
      .catch((error) => {
        if (error.response) {
          throw new Error(error.response.data.message || 'Có lỗi xảy ra, vui lòng thử lại');
        } else {
          throw new Error('Lỗi kết nối, vui lòng kiểm tra lại');
        }
      });
  },

  getProfile: (token) => {
    return axiosClient.get('/user/profile', {
      headers: {
        Authorization: `Bearer ${token}`, // Sửa lỗi dấu nháy ngược ở đây
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      throw new Error(error.response?.data?.message || 'Có lỗi xảy ra khi lấy thông tin người dùng');
    });
  },
};

export default authAPI;
