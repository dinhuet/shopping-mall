const Cart = require('../app/models/Cart');
const productService = require('./ProductService');
const mongoose = require('mongoose');

require('dotenv').config();

const getCartById = async (userId) => {
    return await Cart.find({ userId });
};

/**
 * add items to cart.
 * @param {String} userId - ID người dùng
 * @param {Object} item - Thông tin sản phẩm { productId, quantity }
 * @returns {Promise<Object>} - Giỏ hàng đã được cập nhật.
 */
const addToCart = (userId, item) => {
    return new Promise(async (resolve, reject) => {
        const { productId, quantity } = item;
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

                    cart.totalPrice += product.price * quantity;
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

/**
 * update items in cart.
 * @param {String} userId - ID người dùng
 * @param {Object} item - Thông tin sản phẩm { productId, quantity }
 * @returns {Promise<Object>} - Giỏ hàng đã được cập nhật.
 */
const updateCart = (userId, item) => {
    return new Promise(async (resolve, reject) => {
        const { productId, quantity } = item;
        try {
            const cart = await Cart.findOneAndUpdate(
                { userId },
                { $set: { 'items.$[item].quantity': quantity } },
                {
                    new: true,
                    arrayFilters: [{ 'item.productId': productId }],
                },
            );

            if (!cart) {
                return resolve({
                    status: 404,
                    message: 'Cart not found',
                });
            }

            cart.totalPrice = 0;
            for (const item of cart.items) {
                let product = await productService.getProductById(
                    item.productId,
                );
                cart.totalPrice += item.quantity * product.price;
            }

            await cart.save();
            return resolve({
                status: 'OK',
                message: 'Cart updated successfully',
                data: cart,
            });
        } catch (error) {
            reject(error);
        }
    });
};

/**
 * remove items from cart.
 * @param {String} userId - ID người dùng
 * @param {String} productId - ID sản phẩm
 */
const removeFromCart = (userId, productId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const cart = await Cart.findOneAndUpdate(
                { userId },
                { $pull: { items: { productId } } },
                { new: true },
            );

            if (!cart) {
                return resolve({
                    status: 404,
                    message: 'Cart not found',
                });
            }

            cart.totalPrice = 0;
            for (const item of cart.items) {
                let product = await productService.getProductById(
                    item.productId,
                );
                cart.totalPrice += item.quantity * product.price;
            }

            await cart.save();
            return resolve({
                status: 'OK',
                message: 'Cart removed successfully',
                data: cart,
            });
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    addToCart,
    updateCart,
    getCartById,
    removeFromCart,
};