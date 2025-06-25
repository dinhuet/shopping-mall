import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import productAPI from '../api/productAPI';
import { useCart } from '../context/CartContext';
import './ProductDetail.css'; // Import CSS for styling 

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await productAPI.getById(id);
                setProduct(res.data);
            } catch (err) {
                console.error(
                    'Lỗi khi lấy thông tin sản phẩm:',
                    err.response?.data?.message,
                );
            }
        };
        fetchProduct();
    }, [id]);

    if (!product) return <p>Đang tải...</p>;
    console.log('Product Detail:', product);

    return (
    <div className="card">
      <div className="card__shine"></div>   
      <div className="card__glow"></div>
      <div className="card__content">
        <div className="card__badge">{product.type}</div>
        <div
          className="card__image"
          style={{
            '--bg-color': product.bgColor,
            backgroundImage: `url(${product.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
        <div className="card__text">
          <p className="card__title">{product.name}</p>
          <p className="card__description">{product.description}</p>
        </div>
        <div className="card__input">
            <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="card__quantity-input"
            />
        </div>
        <div className="card__footer">
          <div className="card__price">{product.price}₫</div>
          <div className="card__button" onClick={() => addToCart(product._id, quantity)}>
            <svg height="16" width="16" viewBox="0 0 24 24">
              <path
                strokeWidth="2"
                stroke="currentColor"
                d="M4 12H20M12 4V20"
                fill="currentColor"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
