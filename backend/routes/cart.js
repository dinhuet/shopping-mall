const express = require('express');
const router = express.Router();

const cartController = require('../app/controllers/CartController');
const authMiddleware = require('../app/middlewares/authMiddleware');

router.post('/add', authMiddleware.verifyToken, cartController.addToCart);
router.put('/update', authMiddleware.verifyToken, cartController.updateCart);

module.exports = router;
