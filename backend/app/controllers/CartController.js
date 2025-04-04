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
                return res.status(404).json('cannot do that work');
            })
            .catch(next);
    }
}

module.exports = new CartController();
