import React from 'react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();

  return (
    <div>
      <h2>Giỏ hàng của bạn</h2>
      {cartItems.length === 0 ? (
        <p>Giỏ hàng trống.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item._id}>
              {item.product.name} - Số lượng: {item.quantity}
              <button onClick={() => removeFromCart(item.product._id)}>
                Xóa
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
