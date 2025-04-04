const Cart = require('../models/Cart');
const cartService = require('../../services/CartService');

const {
    mongooseToObject,
    muiltipleMongooseToObject,
} = require('../../utils/mongoose');

class CartController {
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
}

module.exports = new CartController();
