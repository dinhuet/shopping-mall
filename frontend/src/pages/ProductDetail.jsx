import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import productAPI from '../api/productAPI';
import { useCart } from '../context/CartContext';

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
        <div>
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
            <p>Giá: {product.price}₫</p>
            <p>{product.description}</p>
            <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
            />
            <button onClick={() => addToCart(product._id, quantity)}>
                Thêm vào giỏ hàng
            </button>
        </div>
    );
};

export default ProductDetail;
