import React, { createContext, useContext, useState, useEffect } from 'react';
import authAPI from '../api/authAPI';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Lấy token từ localStorage
  const token = localStorage.getItem('token');

  // Hàm lấy thông tin user nếu đã đăng nhập
  useEffect(() => {
    const fetchProfile = async () => {
      if (token) {
        try {
          const res = await authAPI.getProfile(token);
          setUser(res.data);
        } catch (err) {
          console.error('Lỗi khi lấy thông tin người dùng:', err?.response?.data?.message || err.message);
          localStorage.removeItem('token');
          setUser(null);
        }
      }
    };
    fetchProfile();
  }, [token]);

  // Hàm đăng nhập
  const login = async (credentials) => {
    try {
      const res = await authAPI.login(credentials);
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
      return { success: true };
    } catch (err) {
      console.error('Lỗi đăng nhập:', err?.response?.data?.message || err.message);
      return { success: false, message: err?.response?.data?.message || 'Đăng nhập thất bại' };
    }
  };

  // Hàm đăng ký
  const register = async (userData) => {
    try {
      const res = await authAPI.register(userData);
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
      return { success: true };
    } catch (err) {
      console.error('Lỗi đăng ký:', err?.response?.data?.message || err.message);
      return { success: false, message: err?.response?.data?.message || 'Đăng ký thất bại' };
    }
  };

  // Hàm đăng xuất
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
