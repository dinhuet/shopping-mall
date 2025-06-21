import React, { createContext, useContext, useEffect, useState } from 'react';
import cartAPI from '../api/cartAPI';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const token = localStorage.getItem('token');

    const fetchCart = async () => {
        try {
            const res = await cartAPI.getCart(token);
            setCartItems(res.data);
        } catch (err) {
            console.error('Lỗi khi tải giỏ hàng:', err.response?.data?.message);
        }
    };

    const addToCart = async (productId, quantity = 1) => {
        try {
            await cartAPI.addToCart(productId, quantity, token);
            fetchCart();
        } catch (err) {
            console.error(
                'Lỗi thêm vào giỏ hàng:',
                err.response?.data?.message,
            );
        }
    };

    const removeFromCart = async (productId) => {
        try {
            await cartAPI.removeCartItem(productId, token);
            fetchCart();
        } catch (err) {
            console.error(
                'Lỗi xoá khỏi giỏ hàng:',
                err.response?.data?.message,
            );
        }
    };

    useEffect(() => {
        if (token) fetchCart();
    }, [token]);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
