import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Giả lập đăng ký thành công
    alert('Đăng ký thành công!');
    navigate('/login');
  };

  return (
    <div className="form-container">
      <h2>Đăng ký</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Họ tên" value={form.name} onChange={handleChange} required />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Mật khẩu" value={form.password} onChange={handleChange} required />
        <button type="submit">Đăng ký</button>
      </form>
    </div>
  );
}

export default Register;
