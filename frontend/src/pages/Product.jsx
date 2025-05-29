import React, { useEffect, useState } from 'react';
import productAPI from '../api/productAPI';
import ProductCard from '../components/ProductCard';
import './Product.css'; // Import CSS for styling

function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productAPI.getAll();
        // Giả sử response có dạng { data: [...] }
        setProducts(response.data);
      } catch (error) {
        setError('Không thể tải sản phẩm');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Đang tải sản phẩm...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="product-list">
      {products.map(product => (
        <ProductCard key={product._id || product.id} product={product} />
      ))}
    </div>
  );
}

export default Product;
