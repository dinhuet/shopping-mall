import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Navbar.css';

function Navbar() {
    const { user, logout, loading, token } = useAuth();
    const { cartItems } = useCart();
    const navigate = useNavigate();

    // Hàm chuyển đến phần "Liên hệ" trong Home.jsx
    const goToContact = () => {
        navigate('/#contact-section');
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    if (loading) return <div className="loading">Loading...</div>;

    console.log('Cart items in Navbar:', cartItems);
    const quantityInCart = cartItems.items.length;

    return (
        <nav className="navbar">
            {/* Bên trái - Logo */}
            <div className="navbar-left">
                <Link to="/" className="logo" onClick={scrollToTop}>
                    <button className="shop-name"> E-Shop</button>
                </Link>
            </div>

            {/* Ở giữa - Liên kết điều hướng */}
            <div className="navbar-center">
                <Link to="/" onClick={scrollToTop}>
                    <button className="link-button"> Trang chủ</button>
                </Link>
                <Link to="/products">
                    <button className="link-button"> Sản phẩm</button>
                </Link>
                <Link to="/support">
                    <button className="link-button"> Hỗ trợ</button>
                </Link>
                <button className="link-button" onClick={goToContact}>
                    Liên hệ
                </button>
            </div>

            {/* Bên phải - Giỏ hàng + người dùng */}
            <div className="navbar-right">
                <Link to="/cart" className="cart-icon">
                    🛒 <span>({token ? quantityInCart : 0})</span>
                </Link>
                {user ? (
                    <>
                        <span className="greeting">
                            👋 {user.name || 'User'}
                        </span>
                        <button onClick={logout}>Đăng xuất</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">
                            <button role="img" aria-label="login">
                                Đăng nhập
                            </button>{' '}
                        </Link>
                        <Link to="/register">
                            <button role="img" aria-label="register">
                                Đăng ký
                            </button>{' '}
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
