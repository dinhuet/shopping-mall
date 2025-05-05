import React, { createContext, useContext, useState, useEffect } from 'react';
import authAPI from '../api/authAPI';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);

  const token = localStorage.getItem('token');
  const adminToken = localStorage.getItem('adminToken');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (token && !adminToken) {
          const res = await authAPI.getProfile(token);
          setUser(res);
        }
        // Bạn có thể thêm API riêng để lấy admin profile nếu cần
        // Ví dụ: const adminRes = await authAPI.getAdminProfile(adminToken);
        // setAdmin(adminRes);
      } catch (err) {
        console.error('Lỗi khi lấy thông tin người dùng:', err.message);
        localStorage.removeItem('token');
        localStorage.removeItem('adminToken');
        setUser(null);
        setAdmin(null);
      }
    };
    fetchProfile();
  }, [token, adminToken]);

  const login = async (credentials) => {
    try {
      const res = await authAPI.login(credentials);
      localStorage.setItem('token', res.access_token);
      setUser(res.user);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  const adminLogin = async (credentials) => {
    try {
      const { token, admin } = await authAPI.adminLogin(credentials);
      localStorage.setItem('adminToken', token);
      setAdmin(admin);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  const register = async (userData) => {
    try {
      const res = await authAPI.register(userData);
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('adminToken');
    setUser(null);
    setAdmin(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        admin,
        setUser,
        setAdmin,
        login,
        adminLogin,
        logout,
        register,
        isAuthenticated: !!user,
        isAdminAuthenticated: !!admin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);