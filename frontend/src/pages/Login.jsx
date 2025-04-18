import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // ✅ dùng custom hook
import { useNavigate } from 'react-router-dom';

function Login() {
  const { login } = useAuth(); // ✅ dùng hook thay vì useContext
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(form); // chờ login thành công
      navigate('/');
    } catch (err) {
      alert('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
    }
  };

  return (
    <div className="form-container">
      <h2>Đăng nhập</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Mật khẩu"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Đăng nhập</button>
      </form>
    </div>
  );
}

export default Login;
