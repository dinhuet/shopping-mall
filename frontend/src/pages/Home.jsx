import React, { useEffect, useState, useRef } from 'react';
import productAPI from '../api/productAPI';
import './Home.css';
import { Link, useLocation } from 'react-router-dom';

function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const featuredRef = useRef(null);
    const contactRef = useRef(null); // Thêm ref cho phần Liên hệ

    const location = useLocation();

    useEffect(() => {
        let timeoutId;
        if (location.hash === '#featured-products') {
            timeoutId = setTimeout(() => {
                if (featuredRef.current) {
                    featuredRef.current.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100); // delay nhỏ
        } else if (location.hash === '#contact-section') {
            timeoutId = setTimeout(() => {
                if (contactRef.current) {
                    contactRef.current.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100); // delay nhỏ
        }

        return () => clearTimeout(timeoutId);
    }, [location]);

    return (
        <div className="home-container">
            <div className="hero-video">
                <video autoPlay loop muted playsInline className="video-bg">
                    <source src="/home-background.mp4" type="video/mp4" />
                    Trình duyệt của bạn không hỗ trợ video nền.
                </video>

                <div className="hero-content">
                    <h1>HAMPTONS SNEAKERS</h1>
                    <div className="button-group">
                        <Link to="/products?type=men">
                            <button>SHOP MEN</button>
                        </Link>

                        <Link to="/products?type=women">
                            <button>SHOP WOMEN</button>
                        </Link>
                    </div>
                </div>
            </div>

            <div
                className="contact-section"
                ref={contactRef}
                id="contact-section"
            >
                <div className="column">
                    <h3>Về E-Shop</h3>
                    <p>
                        Chúng tôi cung cấp các sản phẩm chất lượng cao với giá
                        cả hợp lý.
                    </p>
                </div>
                <div className="column">
                    <h3>Liên hệ</h3>
                    <p>Email: tqdinhtt@gmail.com</p>
                    <p>Hotline: 1900 9999</p>
                </div>
                <div className="column">
                    <h3>Kết nối</h3>
                    <a href="https://www.facebook.com/">Facebook</a>
                    <a href="https://www.instagram.com/">Instagram</a>
                    <p>Zalo</p>
                </div>
            </div>

            <div className="footer">
                <p> E-Shop Team</p>
            </div>
        </div>
    );
}

export default Home;
