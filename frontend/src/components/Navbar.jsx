import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Navbar.css';

function Navbar() {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Thêm trạng thái để mở/đóng menu

  const goToContact = () => {
    navigate('/', { state: { scrollTo: 'contact' } });
  };  

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
      <div className={`navbar-center ${isMenuOpen ? 'show' : ''}`}>
        <Link to="/" onClick={scrollToTop}>
          <span role="img" aria-label="home">🏠</span> Trang chủ
        </Link>
        <button className="link-button" onClick={() => navigate('/', { state: { scrollTo: 'featured' } })}>
          📦 Sản phẩm
        </button>
        <Link to="/support">
          <span role="img" aria-label="support">🛟</span> Hỗ trợ
        </Link>
        <button className="link-button" onClick={goToContact}>
          📞 Liên hệ
        </button>
      </div>

      {/* Bên phải - Giỏ hàng + người dùng */}
      <div className="navbar-right">
        <Link to="/cart" className="cart-icon">
          🛒 <span>({cartItems.reduce((total, item) => total + item.quantity, 0)})</span>
        </Link>

        {user ? (
          <>
            <span className="greeting">👋 {user.name || 'User'}</span>
            {user.role === 'admin' && (
              <Link to="/admin-dashboard">Dashboard Admin</Link>
            )}
            <button onClick={logout}>Đăng xuất</button>
          </>
        ) : (
          <>
            <Link to="/login"><span role="img" aria-label="login">🔑</span> Đăng nhập</Link>
            <Link to="/register"><span role="img" aria-label="register">📝</span> Đăng ký</Link>
            <Link to="/admin-login"><span role="img" aria-label="admin-login">🔑</span> Đăng nhập Admin</Link>
          </>
        )}
      </div>

      {/* Menu Hamburger */}
      <div className="burger-menu" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </nav>
  );
}

export default Navbar;
