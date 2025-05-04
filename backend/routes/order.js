const express = require('express');
const router = express.Router();

const orderController = require('../app/controllers/OrderController');
const authMiddleware = require('../app/middlewares/authMiddleware');

router.get('/', authMiddleware.verifyToken, orderController.getOrder);
router.post('/create', authMiddleware.verifyToken, orderController.createOrder);
router.put('/update', authMiddleware.verifyToken, orderController.updateOrder);
router.put(
    '/remove/:id',
    authMiddleware.verifyToken,
    orderController.deleteOrder,
);
//router.get('/all', orderController.getAllOrder)



module.exports = router;
