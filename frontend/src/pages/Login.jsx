import React, { useState, useEffect } from 'react';
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
  const [success, setSuccess] = useState('');
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

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
      const result = await login(credentials); // GỌI login TỪ AuthContext
  
      if (result.success) {
        setSuccess('Đăng nhập thành công!');
        navigate('/', { state: { fromLogin: true } });
      } else {
        setError(result.message || 'Thông tin đăng nhập không đúng!');
      }
    } catch (err) {
      console.error(err);
      setError('Đăng nhập thất bại, vui lòng thử lại!');
    } finally {
      setLoading(false);
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