import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    useCallback,
} from 'react';
import cartAPI from '../api/cartAPI';
import { useAuth } from './AuthContext'; // Import hook để lấy token
import { toast } from 'react-toastify';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState({ items: [], totalPrice: 0 });
    const { token } = useAuth(); // Sử dụng hook để lấy token từ AuthContext

    const fetchCart = useCallback(async () => {
        console.log('Token trong CartContext:', token); // Kiểm tra token
        try {
            if (!token) {
                console.warn('Không có token, không thể tải giỏ hàng.');
                setCartItems({ items: [], totalPrice: 0 });
            } else {
                const res = await cartAPI.getCart(token);
                if (!res.data) {
                    console.warn('Giỏ hàng rỗng hoặc không có dữ liệu.');
                    setCartItems({ items: [], totalPrice: 0 });
                } else {
                    console.log('Giỏ hàng đã tải:', res.data);
                    setCartItems(res.data);
                }
            }
        } catch (err) {
            console.error('Lỗi khi tải giỏ hàng:', err.response?.data?.message);
        }
    }, [token]); // phụ thuộc token

    const addToCart = async (productId, quantity) => {
        try {
            console.log(cartItems, 'cartItems in addToCart');
            if (quantity <= 0) {
                toast.error('Số lượng phải lớn hơn 0');
                return;
            }
            if (
                cartItems.items.length !== 0 &&
                cartItems.items.some((item) => item.productId === productId)
            ) {
                await cartAPI.updateCartItem(productId, quantity, token);
                fetchCart();
            } else {
                await cartAPI.addToCart(productId, quantity, token);
                fetchCart();
            }
            toast.success('Thêm vào giỏ hàng thành công!');
        } catch (err) {
            if (token)
            toast.error(
                    err.response?.data?.message || 'Thêm vào giỏ hàng thất bại',
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
        if (!token) {
            setCartItems({ items: [], totalPrice: 0 }); // Nếu không có token, đặt giỏ hàng thành rỗng
        }
    }, [token, fetchCart]);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
