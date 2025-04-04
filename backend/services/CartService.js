const Cart = require('../app/models/Cart');
const productService = require('./ProductService');
const mongoose = require('mongoose');

require('dotenv').config();

const addToCart = (userId, cart) => {
    return new Promise(async (resolve, reject) => {
        const { productId, quantity } = cart;
        try {
            const product = await productService.getProductById(productId);
            if (!product) {
                return resolve({
                    status: 404,
                    message: 'Product not found',
                });
            }

            let cart = await Cart.findOne({ userId });
            if (!cart) {
                cart = new Cart({
                    userId,
                    items: [{ productId, quantity }],
                    totalPrice: product.price * quantity,
                });
            } else {
                const existingItem = cart.items.find((item) =>
                    item.productId.equals(productId),
                );
                if (existingItem) {
                    existingItem.quantity += quantity;

                    cart.totalPrice += (product.price * quantity);

                } else {
                    cart.items.push({ productId, quantity });
                    cart.totalPrice += product.price * quantity;
                }
            }

            await cart.save();
            return resolve({
                status: 'OK',
                message: 'Cart added successfully',
                data: cart,
            });
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    addToCart,
};
