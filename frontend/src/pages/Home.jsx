import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient'; 
import ProductCard from '../components/ProductCard';
import './Home.css';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Slider from 'react-slick';
import { useCart } from '../context/CartContext';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { addToCart: updateCartContext } = useCart();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const featuredRef = useRef(null);
  const contactRef = useRef(null);
  const { user } = useAuth(); 
  const navigate = useNavigate();
  const location = useLocation(); 

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await axiosClient.get('/api/menu'); 
        setFeaturedProducts(response.data); 
      } catch (error) {
        setError('Không thể tải sản phẩm. Vui lòng thử lại sau.');
        console.error('Lỗi khi lấy sản phẩm:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeaturedProducts();
  }, []);

  useEffect(() => {
    if (location.state?.scrollTo === 'featured') {
      setTimeout(() => {
        featuredRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [location]);

  useEffect(() => {
    if (location.state?.scrollTo === 'contact') {
      setTimeout(() => {
        contactRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [location]);
  
  useEffect(() => {
    // Nếu có thông báo từ login, có thể tự động chuyển đến phần cần thiết trong trang Home
    if (location.state?.fromLogin) {
      window.scrollTo(0, 0);  // Đảm bảo trang được cuộn về đầu khi người dùng chuyển đến trang chủ
    }
  }, [location]);  

  const reviews = [
    {
      name: 'Nguyễn Quang Huy',
      rating: 5,
      comment: 'Sản phẩm rất tuyệt vời, chất lượng vượt ngoài mong đợi!',
    },
    {
      name: 'Trần Quang Đỉnh',
      rating: 4,
      comment: 'Dịch vụ giao hàng nhanh chóng, sản phẩm đẹp, chỉ có điều giá hơi cao.',
    },
    {
      name: 'Lê Kim Thành',
      rating: 5,
      comment: 'Mua lần thứ 2, chất lượng vẫn tuyệt vời, rất hài lòng!',
    },
    {
      name: 'Đỗ Đức Đăng',
      rating: 5,
      comment: 'Quán rất ấm cúng, nhân viên thân thiện, đặc biệt cà phê rất ngon!',
    },
  ];

  const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
  
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(value)
    );
    setFilteredProducts(filtered);
  };  

  const handleBuy = async (product) => {
    if (!user) {
      alert('Bạn cần đăng nhập để mua hàng!');
      navigate('/login');
      return;
    }
    try {
      const response = await axiosClient.post('/cart/add', {
        productId: product._id,
        quantity: 1
      });

      if (response.status === 200) {
        updateCartContext({
          product: { ...product, _id: product._id },
          quantity: 1
        });
        alert('Thêm vào giỏ hàng thành công!');
      }
    } catch (error) {
      console.error('Lỗi khi thêm sản phẩm:', error);
      alert(error.response?.data?.message || 'Lỗi server');
    }
  };
  
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProducts = async () => {
      try {
        const response = await axiosClient.get('/api/menu'); // Lấy sản phẩm từ API đúng endpoint
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          setError('Dữ liệu sản phẩm không hợp lệ.');
        }
      } catch (err) {
        setError('Không thể tải sản phẩm. Vui lòng thử lại sau.');
        console.error('Lỗi khi lấy sản phẩm:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="home-container">
      {/* Giới thiệu */}
      <div className="intro-section">
        <h2>
          🌟 CHÀO MỪNG BẠN ĐẾN VỚI <strong>E-Shop</strong> – MUA SẮM CỰC ĐÃ, GIÁ CỰC YÊU! 🌟
        </h2>
        <p>🛍️ Tại E-Shop, bạn sẽ tìm thấy mọi thứ bạn cần – từ A đến Z:</p>
        <div className="benefit-icons">
          <span>👚 Thời trang cá tính</span>
          <span>📱 Phụ kiện công nghệ xịn sò</span>
          <span>🧸 Đồ gia dụng tiện lợi</span>
          <span>🎁 Quà tặng độc đáo</span>
          <span>🍫 Đồ ăn vặt "ngon ngất ngây"</span>
        </div>

        <p>✨ Vì sao hàng ngàn khách hàng tin chọn E-Shop?</p>
        <ul className="benefits-list">
          <li>✅ Đa dạng sản phẩm: Cập nhật mỗi ngày với hàng ngàn mặt hàng HOT TREND</li>
          <li>✅ Giá siêu tốt – Ưu đãi cực khủng mỗi tuần</li>
          <li>✅ Giao hàng toàn quốc – Nhanh, an toàn và tiện lợi</li>
          <li>✅ Đổi trả linh hoạt nếu sản phẩm không như mô tả</li>
          <li>✅ Hỗ trợ 24/7 – Chat trực tiếp để được tư vấn tận tâm</li>
        </ul>

        <p>🎉 ƯU ĐÃI ĐẶC BIỆT:</p>
        <ul className="benefits-list">
          <li>🔥 Tặng ngay voucher 50K cho khách hàng mới</li>
          <li>🚚 Miễn phí vận chuyển toàn quốc cho đơn hàng từ 149K</li>
          <li>🎁 Quay số trúng quà mỗi ngày – 100% có quà!</li>
        </ul>
      </div>

      <div className="search-bar">
      <input
        type="text"
        placeholder="🔍 Tìm kiếm sản phẩm..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-input"
      />
    </div>


    <section ref={featuredRef}>
        <h2>Sản phẩm nổi bật</h2>
        <div className="product-carousel">
          {loading ? (
            <p>Đang tải sản phẩm...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <Slider dots={true} infinite={true} speed={500} slidesToShow={3} slidesToScroll={1}>
              {featuredProducts.length > 0 ? (
                (searchTerm ? filteredProducts : featuredProducts).map((product) => (
                  <div key={product._id} className="product-card">
                    <img src={product.image} alt={product.name} />
                    <div className="product-details">
                      <h3>{product.name}</h3>
                      <p><strong>Số lượng:</strong> {product.countInStock}</p>
                      <p><strong>Mô tả:</strong> {product.description}</p>
                      <p><strong>Giá:</strong> {product.price}₫</p>
                      <button className="buy-button" onClick={() => handleBuy(product)}>Mua</button>
                    </div>
                  </div>
                ))
              ) : (
                <p>Không có sản phẩm nổi bật hiện tại.</p>
              )}
            </Slider>
          )}
        </div>
      </section>

      {/* Thêm ảnh Shopping.jpg */}
      <div className="shopping-image">
        <img src={`${process.env.PUBLIC_URL}/Shopping.jpg`} alt="Shopping" />
      </div>

      {/* Đánh giá từ khách hàng */}
      <div className="review-section">
        <h2>🗣️ Đánh giá từ khách hàng</h2>
        <div className="review-list">
          {reviews.map((review, index) => (
            <div key={index} className="review-card">
              <h4>{review.name}</h4>
              <p>
                {/* Hiển thị sao đánh giá */}
                {Array.from({ length: review.rating }).map((_, i) => (
                  <span key={i}>⭐</span>
                ))}
              </p>
              <p>"{review.comment}"</p>
            </div>
          ))}
        </div>
      </div>

      {/* Liên hệ */}
      <div ref={contactRef} className="contact-section" id="contact-section">
        <div className="contact-left">
          <h2>📞 Liên hệ với chúng tôi</h2>
          <p><strong>Điện thoại:</strong> 0392656916</p>
          <p><strong>Email:</strong> tunglamp227@gmail.com</p>
          <p><strong>Giờ làm việc:</strong> 8:00 - 22:00 (Thứ 2 - Chủ Nhật)</p>
          <div className="social-icons">
            <a
              href="https://www.facebook.com/lam.phamtung.7731"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={`${process.env.PUBLIC_URL}/facebook.png`} alt="Facebook" />
            </a>
            <a
              href="https://www.instagram.com/tunglamp227/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={`${process.env.PUBLIC_URL}/instagram.png`} alt="Instagram" />
            </a>
          </div>
        </div>

        <div className="contact-right">
        <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.861091188072!2d105.78010407471469!3d21.038243387453836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab354920c233%3A0x5d0313a3bfdc4f37!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBDw7RuZyBuZ2jhu4csIMSQ4bqhaSBo4buNYyBRdeG7kWMgZ2lhIEjDoCBO4buZaQ!5e0!3m2!1svi!2s!4v1745857620146!5m2!1svi!2s"
        width="600"
        height="450"
        style={{ border: '0' }} // Sửa ở đây
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />

        </div>
      </div>

      {/* Bản quyền */}
      <footer className="footer">
        <p>
          © 2025 E-Shop. Bản quyền thuộc về <strong>Phạm Tùng Lâm</strong>. Mọi hành vi sao chép đều phải có sự đồng ý bằng văn bản.
        </p>
        <p>Made with ❤️ by E-Shop Team</p>
      </footer>

      {/* Thanh toán */}
      <div className="payment-section">
        <h2>💳 Chúng tôi chấp nhận các hình thức thanh toán</h2>
        <div className="payment-icons">
          <img src={`${process.env.PUBLIC_URL}/visa.png`} alt="Visa" />
          <img src={`${process.env.PUBLIC_URL}/mastercard.png`} alt="Mastercard" />
          <img src={`${process.env.PUBLIC_URL}/momo.png`} alt="Momo" />
          <img src={`${process.env.PUBLIC_URL}/zalopay.png`} alt="ZaloPay" />
          <img src={`${process.env.PUBLIC_URL}/union-pay.png`} alt="UnionPay" />
        </div>
      </div>
    </div>
  );
}

export default Home;