import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import authAPI from '../api/authAPI';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await authAPI.adminLogin({ email, password });
      console.log('Admin Token:', res.token); // Kiểm tra token đã nhận đúng không

      // Lưu token vào localStorage
      localStorage.setItem('adminToken', res.token);

      // Điều hướng tới trang AdminDashboard
      navigate('/admin-dashboard');
    } catch (err) {
      setError(err.message); // Xử lý lỗi nếu có
    }
};  

  return (
    <div className="login-container">
      <h2>Đăng nhập Admin</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Đăng nhập</button>
      </form>
    </div>
  );
}

export default AdminLogin;