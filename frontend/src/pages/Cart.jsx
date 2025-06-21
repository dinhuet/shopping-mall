import React from 'react';
import { useCart } from '../context/CartContext';

function Cart() {
    const { cartItems, removeFromCart } = useCart();

    const total = cartItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0,
    );

    return (
        <div className="cart-container">
            <h2 className="cart-title">Giỏ hàng của bạn</h2>
            {cartItems.length === 0 ? (
                <p className="empty-cart">Giỏ hàng đang trống.</p>
            ) : (
                <div className="cart-list">
                    {cartItems.map((item) => (
                        <div key={item.product._id} className="cart-item">
                            <img
                                src={item.product.image}
                                alt={item.product.name}
                                className="cart-image"
                            />
                            <div className="cart-details">
                                <h4>{item.product.name}</h4>
                                <p>Số lượng: {item.quantity}</p>
                                <p>
                                    Giá: {item.product.price.toLocaleString()}₫
                                </p>
                                <button
                                    className="remove-btn"
                                    onClick={() =>
                                        removeFromCart(item.product._id)
                                    }
                                >
                                    Xoá
                                </button>
                            </div>
                        </div>
                    ))}
                    <h3 className="cart-total">
                        Tổng cộng: {total.toLocaleString()}₫
                    </h3>
                </div>
            )}
        </div>
    );
}

export default Cart;
