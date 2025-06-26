import React from 'react';
import { useCart } from '../context/CartContext';
import productAPI from '../api/productAPI';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css'; // Import CSS for styling

function Cart() {
    const { cartItems, removeFromCart } = useCart();
    const [productMap, setProductMap] = useState({});
    const navigate = useNavigate();

    const total = cartItems.totalPrice ? cartItems.totalPrice : 0;

    const getProductById = async (productId) => {
        try {
            console.log('Lấy sản phẩm với ID:', productId);
            const response = await productAPI.getById(productId);
            console.log('Sản phẩm đã lấy:', response.data);
            return response.data;
        } catch (error) {
            console.error('Lỗi khi lấy sản phẩm:', error);
            return null;
        }
    };

    useEffect(() => {
        const fetchProducts = async () => {
            const map = {};
            for (const item of cartItems.items) {
                try {
                    const product = await getProductById(item.productId);
                    map[item.productId] = product;
                } catch (error) {
                    console.error('Lỗi khi lấy sản phẩm:', error);
                }
            }
            setProductMap(map);
            console.log('Sản phẩm đã được cập nhật:', map);
            console.log('chay den day roi');
        };

        if (cartItems.items.length > 0) {
            fetchProducts();
        }
    }, [cartItems.items]);

    const handleClick = (product_id) => {
        navigate(`/product/${product_id}`);
    }

    return (
        <div className="cart-container">
            <h2 className="cart-title">Giỏ hàng của bạn</h2>
            {cartItems.items.length === 0 ? (
                <p className="empty-cart">Giỏ hàng đang trống.</p>
            ) : (
                <div className="cart-list" >
                    
                    {cartItems.items.map((item) => {
                        const product = productMap[item.productId];
                        console.log('Sản phẩm hiện tại:', product);
                        console.log('ID sản phẩm:', item.productId);
                        if (!product) return null; // Nếu sản phẩm không có, bỏ qua
                        return (
                            <div key={product._id} className="cart-item" onClick={() => handleClick(product._id)}>
                                
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="cart-image"
                                />
                                <div className="cart-details">
                                    <h4>{product.name}</h4>
                                    <p>Số lượng: {item.quantity}</p>
                                    <p>
                                        Giá: {product.price.toLocaleString()}₫
                                    </p>
                                    <button
                                        className="remove-btn"
                                        onClick={(e) =>
                                        {   e.stopPropagation(); // Ngăn chặn sự kiện click lan truyền
                                            removeFromCart(item.productId);
                                        }
                                        }>
                                        Xoá
                                    </button>
                                </div>  
                                
                            </div>
                        );
                    })}
                    <div className='footer-cart'>
                        <h3 className="cart-total">
                        Tổng cộng: {total.toLocaleString()}₫
                    </h3>
                    </div>
                    <div className='button-cart'>
                        <button className='button'>
    Payment
</button>
                    </div>
                    
                </div>
            )}
        </div>
    );
}

export default Cart;
