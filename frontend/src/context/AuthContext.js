// src/context/AuthContext.js
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
                    setUser(res.data); // Cập nhật user nếu có
                } catch (err) {
                    console.error(
                        'Lỗi khi lấy thông tin người dùng:',
                        err?.response?.data?.message || err.message,
                    );
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
            console.error(
                'Lỗi đăng nhập:',
                err?.response?.data?.message || err.message,
            );
            return {
                success: false,
                message: err?.response?.data?.message || 'Đăng nhập thất bại',
            };
        }
    };

    // Hàm đăng ký
    const register = async (userData) => {
        const res = await authAPI.register(userData);
        setUser(res.user); // nếu backend trả lại user sau khi đăng ký
        return res;
    };

    // Hàm đăng xuất
    const logout = async (userData) => {
        try {
            const confirmed = window.confirm(
                'Bạn có chắc chắn muốn đăng xuất không?',
            );
            if (confirmed) {
                await authAPI.logout(userData);
                localStorage.removeItem('token');
                setUser(null);
                return { success: true };
            }
        } catch (err) {
            console.error(
                'Lỗi đăng xuất:',
                err?.response?.data?.message || err.message,
            );
            return {
                success: false,
                message: err?.response?.data?.message || 'Đăng xuất thất bại',
            };
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser, // Cần phải thêm setUser ở đây
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
