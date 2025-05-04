const Order = require('../models/Order');
const orderService = require('../../services/OrderService');

const {
    mongooseToObject,
    muiltipleMongooseToObject,
} = require('../../utils/mongoose');


class OrderController {

    // getAllOrder(req, res, next) {
    //     orderService
    //         .getAllOrder()
    //         .then((items) => {
    //             res.status(200).json(muiltipleMongooseToObject(items));
    //         })
    //         .catch(next);
    // }

    getOrder(req, res, next) {
        orderService
            .getOrderById(req.user.id)
            .then((items) => {
                res.status(200).json(muiltipleMongooseToObject(items));
            })
            .catch(next);
    }


    createOrder(req, res, next) {
        orderService
            .createOrder(req.user.id, req.body)
            .then((order) => {
                if (order.status === 'OK') {
                    return res.status(200).json(order);
                }
                return res.status(order.status).json(order.message);
            })
            .catch(next);
    }

    updateOrder(req, res, next) {
        orderService
            .updateOrder(req.user.id, req.body)
            .then((order) => {
                if (order.status === 'OK') {
                    return res.status(200).json(order);
                }
                return res.status(order.status).json(order.message);
            })
            .catch(next);
    }


    deleteOrder(req, res, next) {
        orderService
            .deleteOrder(req.user.id, req, URLSearchParams.id)
            .then((order) => {
                if (order.status === 'OK') {
                    return res.status(200).json(order);
                }
                return res.status(order.status).json(order.message);
            })
            .catch(next);
    }
}

module.exports = new OrderController();