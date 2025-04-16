import React from 'react';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <Link to={`/product/${product._id}`}>
        <img src={product.image} alt={product.name} />
        <h3>{product.name}</h3>
        <p>{product.price.toLocaleString()}₫</p>
      </Link>
    </div>
  );
}

export default ProductCard;
