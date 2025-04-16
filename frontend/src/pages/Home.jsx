// Home.jsx
import React, { useEffect, useState } from 'react';
import productAPI from '../api/productAPI';
import ProductCard from '../components/ProductCard';
import './Home.css'; // nếu có file CSS riêng cho Home

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // trạng thái loading
  const [error, setError] = useState(null);     // lưu lỗi nếu có

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productAPI.getAll();
        setProducts(response);
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
      <h1>Sản phẩm nổi bật</h1>

      {loading && <p>Đang tải sản phẩm...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && products.length === 0 && !error && (
        <p>Không có sản phẩm nào để hiển thị.</p>
      )}

      <div className="product-list">
        {products.map((product) => (
          <ProductCard key={product._id || product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Home;
