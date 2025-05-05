const express = require('express');
const router = express.Router();

const cartController = require('../app/controllers/CartController');
const authMiddleware = require('../app/middlewares/authMiddleware');

router.get('/', authMiddleware.verifyToken, cartController.getCart);
router.post('/add', authMiddleware.verifyToken, cartController.addToCart);
router.put('/update', authMiddleware.verifyToken, cartController.updateCart);
router.put(
    '/remove/:id',
    authMiddleware.verifyToken,
    cartController.removeFromCart,
);

router.delete('/:id', authMiddleware.verifyToken, cartController.removeFromCart);

module.exports = router;