import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authAPI from '../api/authAPI';
import { useAuth } from '../context/AuthContext';
import './Login.css';

function Login() {
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState(''); // Thêm trạng thái success
    const { login } = useAuth(); // Lấy hàm login từ AuthContext
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    // Hàm xử lý thay đổi giá trị input
    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await login(credentials); // Gọi hàm login từ AuthContext

            // ✅ response chính là response.data (vì đã .then(...response.data))
            console.log('API Response:', response);

            if (response.success) {
                navigate('/', {
                    replace: true,
                    state: { fromLogin: true },
                });
            } else {
                setError('Phản hồi từ máy chủ không hợp lệ');
            }
        } catch (err) {
            console.error('Login Error:', err);

            if (err.message === 'Network Error') {
                setError('Không thể kết nối đến server');
            } else {
                setError(err.message || 'Lỗi đăng nhập');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login">
            <h2>Đăng nhập</h2>
            {error && <p className="error">{error}</p>}{' '}
            {/* Hiển thị thông báo lỗi nếu có */}
            {success && <p className="success">{success}</p>}{' '}
            {/* Hiển thị thông báo thành công */}
            <form onSubmit={handleLogin}>
                <div>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={credentials.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                        name="password"
                        placeholder="Mật khẩu"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                </button>
            </form>
        </div>
    );
}

export default Login;
