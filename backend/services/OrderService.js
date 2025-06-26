const Cart = require('../app/models/Cart');
const Order = require('../app/models/Order');
const productService = require('../services/ProductService');
const mongoose = require('mongoose');
const { calculateShippingFee } = require('../utils/shippingCalculator');


require('dotenv').config();

const getOrderById = async (userId) => {
    return await Order.find({ user: userId });
};

const getOrderByOrderId = async (orderId) =>{
    return await Order.findOne({ _id: orderId });
}

// const getAllOrder = async () => {
//     return await Order.find();
// }

/**
 * create an order.
 * @param {String} userId - ID người dùng
 * @param {Object} orderInfo - Thông tin sản phẩm { shippingAddress, paymentMethod }
 * @returns {Promise<Object>} - Đơn hàng đã được tạo và cập nhật kho thành công
 */
const createOrder = async (userId, orderInfo) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // check cart
        const cart = await Cart.findOne({ userId }).populate('items.productId').session(session);
        if (!cart || cart.items.length === 0) {
            throw new Error('Giỏ hàng đang trống');
        }

        const orderItems = [];
        let itemsPrice = 0;

        // check stock and exist
        for (const item of cart.items) {
            const product = await productService.getProductById(item.productId, session);
            if (!product) {
                throw new Error(`Sản phẩm với ID ${item.productId} không tồn tại`);
            }

            if (product.countInStock < item.quantity) {
                throw new Error(`Sản phẩm "${product.name}" không đủ hàng trong kho`);
            }

            product.countInStock -= item.quantity;
            await product.save({ session });

            // add to orderItems
            orderItems.push({
                name: product.name,
                amount: item.quantity,
                image: product.image,
                price: product.price,
                product: product._id,
            });

            itemsPrice += product.price * item.quantity;
        }

        // calculate price
        const shipping = await calculateShippingFee('Hà Nội', 'Hải Phòng');
        const shippingPrice = shipping.shippingFee;
        const taxPrice = Number((itemsPrice * 0.1).toFixed(2));
        const totalPrice = itemsPrice + shippingPrice + taxPrice;

        // create order
        const order = new Order({
            orderItems,
            shippingAddress: {
                fullname: orderInfo.fullname,
                address: orderInfo.address,
                city: orderInfo.city,
                phone: orderInfo.phone,
            },
            paymentMethod: orderInfo.paymentMethod,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice,
            user: userId,
        });

        const savedOrder = await order.save({ session });

        // del cart after save order
        await Cart.deleteOne({ userId }).session(session);

        await session.commitTransaction();
        session.endSession();

        return {
            status: 'OK',
            message: 'Đơn hàng đã được tạo và cập nhật kho thành công',
            data: savedOrder,
        };
    } catch (error) {
        // Bắt lỗi và rollback transaction
        await session.abortTransaction();
        session.endSession();

        console.error('Lỗi trong quá trình tạo đơn hàng:', error.message);
    }
};

/**
 * Update an existing order.
 * @param {String} userId - ID người dùng
 * @param {Object} orderInfo - Thông tin cập nhật đơn hàng { orderId, shippingAddress, paymentMethod, isPaid, isDelivered }
 * @returns {Promise<Object>} - Đơn hàng đã được cập nhật thành công
 */
const updateOrder = async (userId, orderInfo) => {
    try {
      
        const order = await Order.findOne({ _id: orderInfo.orderId, user: userId });
        if (!order) {
            throw new Error('Không tìm thấy đơn hàng');
        }

        if (orderInfo.shippingAddress) {
            order.shippingAddress = 
                orderInfo.shippingAddress;
        }

        if (orderInfo.paymentMethod) {
            order.paymentMethod = orderInfo.paymentMethod;
        }

        if (typeof orderInfo.isPaid === 'boolean') {
            order.isPaid = orderInfo.isPaid;
            if (order.isPaid) {
                order.paidAt = new Date();
            } else {
                order.paidAt = null;
            }
        }

        if (typeof orderInfo.isDelivered === 'boolean') {
            order.isDelivered = orderInfo.isDelivered;
            if (order.isDelivered) {
                order.deliveredAt = new Date();
            } else {
                order.deliveredAt = null;
            }
        }

        await order.save();

        return {
            status: 'OK',
            message: 'Cập nhật đơn hàng thành công',
            data: order,
        };
    } catch (error) {
        console.error('Lỗi cập nhật đơn hàng:', error);
        throw error;
    }
};

/**
 * Delete an order.
 * @param {String} userId - ID người dùng
 * @param {String} orderId - ID đơn hàng cần xoá
 * @returns {Promise<Object>} - Thông báo xoá đơn hàng thành công
 */
const deleteOrder = async (userId, orderId) => {
    try {
       
        const order = await Order.findOne({ _id: orderId, user: userId });
        if (!order) {
            throw new Error('Không tìm thấy đơn hàng hoặc bạn không có quyền xoá đơn này');
        }

        await Order.deleteOne({ _id: orderId });

        return {
            status: 'OK',
            message: 'Xoá đơn hàng thành công',
        };
    } catch (error) {
        console.error('Lỗi xoá đơn hàng:', error);
        throw error;
    }
};



module.exports = {
    getOrderById,
    getOrderByOrderId,
  //  getAllOrder,
    createOrder,
    updateOrder,
    deleteOrder,
};