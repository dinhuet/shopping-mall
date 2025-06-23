import React, { createContext, useContext, useEffect, useState, useCallback  } from 'react';
import cartAPI from '../api/cartAPI';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const token = localStorage.getItem('token');
    console.log('Token in CartProvider:', token);

    
    const fetchCart = useCallback(async () => {
        try {
            const res = await cartAPI.getCart(token);
            setCartItems(res.data);
        } catch (err) {
            console.error('Lỗi khi tải giỏ hàng:', err.response?.data?.message);
        }
    }, [token]); // phụ thuộc token

    const addToCart = async (productId) => {
        try {
            console.log(cartItems, 'cartItems in addToCart');
            if (
                cartItems &&
                cartItems.some((item) => item.productId === productId)
            ) {
                await cartAPI.updateCartItem(productId, 1, token);
                fetchCart();
            } else {
                 await cartAPI.addToCart(productId, 1, token);
                fetchCart();
            }
        } catch (err) {
            console.error('Lỗi thêm vào giỏ hàng:', err);
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
    }, [token, fetchCart]);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
