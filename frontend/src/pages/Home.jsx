import React, { useEffect, useState, useRef } from 'react';
import productAPI from '../api/productAPI';
import ProductCard from '../components/ProductCard';
import './Home.css';
import { useLocation } from 'react-router-dom';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const featuredRef = useRef(null);
  const contactRef = useRef(null); // Thêm ref cho phần Liên hệ

  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#featured-products') {
      setTimeout(() => {
        if (featuredRef.current) {
          featuredRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100); // delay nhỏ
    } else if (location.hash === '#contact-section') {
      setTimeout(() => {
        if (contactRef.current) {
          contactRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100); // delay nhỏ
    }
  }, [location]);

  const reviews = [
    {
      name: 'Nguyễn Quang Huy',
      rating: 5,
      comment: 'Sản phẩm rất tuyệt vời, chất lượng vượt ngoài mong đợi!',
    },
    {
      name: 'Trần Xuân Đỉnh',
      rating: 4,
      comment: 'Dịch vụ giao hàng nhanh chóng, sản phẩm đẹp, chỉ có điều giá hơi cao.',
    },
    {
      name: 'Lê Kim Thành',
      rating: 5,
      comment: 'Mua lần thứ 2, chất lượng vẫn tuyệt vời, rất hài lòng!',
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProducts = async () => {
      try {
        const response = await productAPI.getAll();
        if (Array.isArray(response)) {
          setProducts(response);
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

      {/* Sản phẩm nổi bật */}
      <h1 ref={featuredRef} id="featured-products">🔥 Sản phẩm nổi bật</h1>

      {loading && <p>⏳ Đang tải sản phẩm...</p>}
      {error && <p className="error">❌ {error}</p>}
      {!loading && products.length === 0 && !error && (
        <p>🙁 Không có sản phẩm nào để hiển thị.</p>
      )}

      <div className="product-list">
        {products.map((product) => (
          <ProductCard key={product._id || product.id} product={product} />
        ))}
      </div>

      {/* Thêm ảnh Shopping.jpg */}
      <div className="shopping-image">
        <img src={`${process.env.PUBLIC_URL}/Shopping.jpg`} alt="Shopping" />
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
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.8612163515872!2d105.78010407503167!3d21.0382383806135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab354920c233%3A0x5d0313a3bfdc4f37!2sVNU%20University%20of%20Engineering%20and%20Technology!5e0!3m2!1sen!2s!4v1744813173296!5m2!1sen!2s"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Map"
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
