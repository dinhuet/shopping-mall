const Cart = require('../models/Cart');
const cartService = require('../../services/CartService');

const {
    mongooseToObject,
    muiltipleMongooseToObject,
} = require('../../utils/mongoose');

class CartController {
    getCart(req, res, next) {
        cartService
            .getCartById(req.user.id)
            .then((items) => {
                res.status(200).json(muiltipleMongooseToObject(items));
            })
            .catch(next);
    }

    /**
     * Add product to cart.
     * @param {*} req
     * - Lấy dữ liệu req.user thông qua middleware.
     * - Truyền vào req.body thông tin sản phẩm { productId, quantity }
     * @param {*} res
     * @param {*} next
     */
    addToCart(req, res, next) {
        cartService
            .addToCart(req.user.id, req.body)
            .then((cart) => {
                if (cart.status === 'OK') {
                    return res.status(200).json(cart);
                }
                return res.status(cart.status).json(cart.message);
            })
            .catch(next);
    }

    /**
     * Update product in cart.
     * @param {*} req
     * - Lấy dữ liệu req.user thông qua middleware.
     * - Truyền vào req.body thông tin sản phẩm { productId, quantity }
     * @param {*} res
     * @param {*} next
     */
    updateCart(req, res, next) {
        cartService
            .updateCart(req.user.id, req.body)
            .then((cart) => {
                if (cart.status === 'OK') {
                    return res.status(200).json(cart);
                }
                return res.status(cart.status).json(cart.message);
            })
            .catch(next);
    }

    /**
     * Remove product from cart.
     * @param {*} req
     * - Lấy dữ liệu req.user thông qua middleware.
     * - Truyền vào req.params.productId
     */
    removeFromCart(req, res, next) {
        cartService
            .removeFromCart(req.user.id, req.params.id)
            .then((cart) => {
                if (cart.status === 'OK') {
                    return res.status(200).json(cart);
                }
                return res.status(cart.status).json(cart.message);
            })
            .catch(next);
    }
}

module.exports = new CartController();
