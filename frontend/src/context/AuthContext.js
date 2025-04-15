import React, { createContext, useContext, useState, useEffect } from 'react';
import authAPI from '../api/authAPI';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProfile = async () => {
      if (token) {
        try {
          const res = await authAPI.getProfile(token);
          setUser(res.data);
        } catch (err) {
          console.error('Lỗi khi lấy thông tin người dùng:', err.response?.data?.message);
          localStorage.removeItem('token');
        }
      }
    };
    fetchProfile();
  }, [token]);

  const login = async (credentials) => {
    const res = await authAPI.login(credentials);
    localStorage.setItem('token', res.data.token);
    setUser(res.data.user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
