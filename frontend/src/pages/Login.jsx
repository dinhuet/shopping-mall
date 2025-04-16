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
  const [success, setSuccess] = useState('');  // Thêm trạng thái success
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Hàm xử lý thay đổi giá trị input
  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  // Hàm xử lý đăng nhập
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);  // Bắt đầu quá trình đăng nhập
    setError('');
    setSuccess('');   // Reset success message khi bắt đầu đăng nhập
    try {
      const response = await authAPI.login(credentials);

      if (response.status === 200) {
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        setUser(user);

        // Hiển thị thông báo đăng nhập thành công
        setSuccess('Đăng nhập thành công!');

        // Đợi 1 giây để hiển thị thông báo trước khi chuyển hướng
        setTimeout(() => {
          navigate('/'); // Điều hướng đến trang chủ
        }, 1000); // Giảm thời gian chờ xuống còn 1 giây

        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Thông tin đăng nhập không đúng');
      } else {
        setError('Đã xảy ra lỗi, vui lòng thử lại');
      }
    }
  };

  return (
    <div className="login">
      <h2>Đăng nhập</h2>
      {error && <p className="error">{error}</p>}  {/* Hiển thị thông báo lỗi nếu có */}
      {success && <p className="success">{success}</p>}  {/* Hiển thị thông báo thành công */}

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
