// CartContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  const fetchCart = async () => {
    if (!token || !user) return;

    try {
      const res = await axiosClient.get('/cart');
      setCartItems(res.data || []);
    } catch (err) {
      console.error('Lỗi khi tải giỏ hàng:', err);
    }
  };

  const addToCart = async ({ product, quantity }) => {
    try {
      const res = await axiosClient.post('/cart/add', {
        productId: product._id,
        quantity,
      });
  
      // Cập nhật trực tiếp giỏ hàng trong state
      setCartItems((prevCartItems) => {
        const existingProductIndex = prevCartItems.findIndex(item => item.product._id === product._id);
        if (existingProductIndex >= 0) {
          // Cập nhật số lượng nếu sản phẩm đã có trong giỏ hàng
          const updatedCartItems = [...prevCartItems];
          updatedCartItems[existingProductIndex].quantity += quantity;
          return updatedCartItems;
        } else {
          // Nếu sản phẩm chưa có, thêm mới vào giỏ
          return [...prevCartItems, { product, quantity }];
        }
      });
  
    } catch (err) {
      console.error('Lỗi khi thêm sản phẩm vào giỏ:', err);
    }
  };
  

  const removeFromCart = async (productId) => {
    try {
      await axiosClient.delete(`/cart/${productId}`);
  
      // Xoá trực tiếp sản phẩm khỏi state
      setCartItems((prevCartItems) =>
        prevCartItems.filter((item) => item.product._id !== productId)
      );
    } catch (err) {
      console.error('Lỗi khi xoá sản phẩm:', err);
    }
  };

  useEffect(() => {
    if (token && user) fetchCart();
  }, [token, user]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
