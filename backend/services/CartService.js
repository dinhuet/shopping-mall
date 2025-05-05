const Cart = require('../app/models/Cart');
const productService = require('./ProductService');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

require('dotenv').config();

// Hàm kiểm tra và chuyển đổi userId thành ObjectId hợp lệ
const toObjectId = (id) => {
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('Invalid userId format');
    }
    return new mongoose.Types.ObjectId(id);
};  
  
const getCartById = async (userId) => {
    const objectId = toObjectId(userId); // Chuyển đổi userId thành ObjectId hợp lệ
    if (!objectId) {
        throw new Error('Invalid userId');
    }
    try {
        return await Cart.find({ userId: objectId });
    } catch (error) {
        throw error;
    }
};

/**
 * add items to cart.
 * @param {String} userId - ID người dùng
 * @param {Object} item - Thông tin sản phẩm { productId, quantity }
 * @returns {Promise<Object>} - Giỏ hàng đã được cập nhật.
 */
const addToCart = async (userId, item) => {
    const { productId, quantity } = item;
    const userObjectId = toObjectId(userId);
    
    const product = await productService.getProductById(productId);
    if (!product) throw new Error('Product not found');

    let cart = await Cart.findOne({ userId: userObjectId });
    
    if (!cart) {
        cart = new Cart({
            userId: userObjectId,
            items: [{ productId, quantity }],
            totalPrice: product.price * quantity,
        });
    } else {
        const existingItem = cart.items.find(item => 
            item.productId.equals(productId)
        );
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({ productId, quantity });
        }
        
        cart.totalPrice += product.price * quantity;
    }

    await cart.save();
    return cart;
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
            const objectId = toObjectId(userId); // Chuyển đổi userId thành ObjectId hợp lệ

            const cart = await Cart.findOneAndUpdate(
                { userId: objectId },
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
            for (let i = cart.items.length - 1; i >= 0; i--) {
                const item = cart.items[i];
                const product = await productService.getProductById(item.productId);

                if (!product) {
                    // Sản phẩm không còn tồn tại, loại khỏi giỏ hàng
                    cart.items.splice(i, 1);
                    continue;
                }

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
            const objectId = toObjectId(userId); // Chuyển đổi userId thành ObjectId hợp lệ

            const cart = await Cart.findOneAndUpdate(
                { userId: objectId },
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
            for (let i = cart.items.length - 1; i >= 0; i--) {
                const item = cart.items[i];
                const product = await productService.getProductById(item.productId);

                if (!product) {
                    cart.items.splice(i, 1);
                    continue;
                }

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
