// src/pages/AdminDashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css'; // Thêm dòng này vào file AdminDashboard.jsx

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="admin-dashboard p-6">
      <h1 className="text-2xl font-bold mb-4">🎉 Chào mừng đến với trang quản trị!</h1>
      <p className="mb-6">Ở đây bạn có thể quản lý sản phẩm, đơn hàng, người dùng, báo cáo doanh thu, v.v.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <button onClick={() => navigate('/admin/menu')} className="bg-blue-500 text-white p-4 rounded hover:bg-blue-600 transition">📋 Quản lý Menu</button>
        <button onClick={() => navigate('/admin/invoices')} className="bg-green-500 text-white p-4 rounded hover:bg-green-600 transition">🧾 Quản lý Hóa đơn</button>
        <button onClick={() => navigate('/admin/employees')} className="bg-purple-500 text-white p-4 rounded hover:bg-purple-600 transition">👨‍💼 Quản lý Nhân viên</button>
        <button onClick={() => navigate('/admin/customers')} className="bg-pink-500 text-white p-4 rounded hover:bg-pink-600 transition">👥 Quản lý Khách hàng</button>
        <button onClick={() => navigate('/admin/revenue')} className="bg-yellow-500 text-white p-4 rounded hover:bg-yellow-600 transition">📈 Báo cáo Doanh thu</button>
      </div>
    </div>
  );
}

export default AdminDashboard;
