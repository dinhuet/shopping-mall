import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Navbar.css'; // Đừng quên import CSS

function Navbar() {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();

  return (
    <nav className="navbar">
      {/* Bên trái - Logo */}
      <div className="navbar-left">
        <Link to="/">🛍️ <span className="shop-name">E-Shop</span></Link>
      </div>

      {/* Ở giữa - Các liên kết điều hướng */}
      <div className="navbar-center">
        <Link to="/">Trang chủ</Link>
        <Link to="/products">Sản phẩm</Link>
        <Link to="/about">Giới thiệu</Link>
        <Link to="/contact">Liên hệ</Link>
      </div>

      {/* Bên phải - Icon giỏ hàng và người dùng */}
      <div className="navbar-right">
        <Link to="/cart" className="cart-icon">🛒 <span>({cartItems.length})</span></Link>

        {user ? (
          <>
            <span className="greeting">👋 {user.name || 'User'}</span>
            <button onClick={logout}>Đăng xuất</button>
          </>
        ) : (
          <>
            <Link to="/login">Đăng nhập</Link>
            <Link to="/register">Đăng ký</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
