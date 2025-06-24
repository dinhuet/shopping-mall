// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import authAPI from '../api/authAPI';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(() => localStorage.getItem('token')); // Lấy token từ localStorage

    // Lấy token từ localStorage

    // Hàm lấy thông tin user nếu đã đăng nhập
    useEffect(() => {
        const fetchProfile = async () => {
            if (token) {
                try {
                    const res = await authAPI.getProfile(token);
                    console.log('Thông tin người dùng:', res);
                    setUser(res); // Cập nhật user nếu có
                } catch (err) {
                    console.error(
                        'Lỗi khi lấy thông tin người dùng:',
                        err?.response?.data?.message || err.message,
                    );
                    setUser(null); // Nếu có lỗi, đặt user thành null
                    setUser(null);
                }
            }
            setLoading(false); // Đặt loading thành false sau khi hoàn thành
        };
        fetchProfile();
    }, [token]); // Chỉ chạy khi token thay đổi

    // useEffect(() => {
    //     console.log('User state đã được cập nhật:', user);
    // }, [user]);

    // Hàm đăng nhập
    const login = async (credentials) => {
        try {
            const res = await authAPI.login(credentials);
            console.log('Đăng nhập thành công:', res);
            localStorage.setItem('token', res.access_token);
            setToken(res.access_token); // Cập nhật token
            setUser(res.user);
            return { success: true };
        } catch (err) {
            console.error('Lỗi đăng nhập:', err);
            return {
                success: false,
                message: err?.response?.data?.message || 'Đăng nhập thất bại',
            };
        }
    };

    // Hàm đăng ký
    const register = async (userData) => {
        const res = await authAPI.register(userData);
        return res;
    };

    // Hàm đăng xuất
    const logout = async () => {
        if (!token) {
            console.warn('Không có token, không thể đăng xuất.');
            return { success: false, message: 'Không có token để đăng xuất' };
        }
        try {
            const confirmed = window.confirm(
                'Bạn có chắc chắn muốn đăng xuất không?',
            );
            if (confirmed) {
                await authAPI.logout(token);
                localStorage.removeItem('token');
                setToken(null); // Xoá token khỏi state
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
                loading,
                isAuthenticated: !!user,
                token, // Cung cấp token để các component khác có thể sử dụng
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
