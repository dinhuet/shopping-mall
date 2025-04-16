import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Navbar.css';

function Navbar() {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();

  // Hàm scroll lên đầu trang
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="navbar">
      {/* Bên trái - Logo */}
      <div className="navbar-left">
        <Link to="/" className="logo" onClick={scrollToTop}>
          🛍️ <span className="shop-name">E-Shop</span>
        </Link>
      </div>

      {/* Ở giữa - Liên kết điều hướng */}
      <div className="navbar-center">
        <Link to="/" onClick={scrollToTop}>
          <span role="img" aria-label="home">🏠</span> Trang chủ
        </Link>
        <Link to="/#featured-products">
          <span role="img" aria-label="products">📦</span> Sản phẩm
        </Link>

        <Link to="/support"><span role="img" aria-label="support">🛟</span> Hỗ trợ</Link>
        {/* Thêm liên kết để cuộn đến phần Liên hệ */}
        <Link to="#contact-section">
          <span role="img" aria-label="contact">📞</span> Liên hệ
        </Link>
      </div>

      {/* Bên phải - Giỏ hàng + người dùng */}
      <div className="navbar-right">
        <Link to="/cart" className="cart-icon">
          🛒 <span>({cartItems.length})</span>
        </Link>

        {user ? (
          <>
            <span className="greeting">👋 {user.name || 'User'}</span>
            <button onClick={logout}>Đăng xuất</button>
          </>
        ) : (
          <>
            <Link to="/login"><span role="img" aria-label="login">🔑</span> Đăng nhập</Link>
            <Link to="/register"><span role="img" aria-label="register">📝</span> Đăng ký</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
