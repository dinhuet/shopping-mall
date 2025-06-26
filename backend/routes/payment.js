const express = require('express');
const router = express.Router();

const paymentController = require('../app/controllers/PaymentController');
const authMiddleware = require('../app/middlewares/authMiddleware');

router.post('/',authMiddleware.verifyToken,paymentController.payment);
router.post('/callback',authMiddleware.verifyToken, paymentController.callback);
router.post('/check-status-order/:app_trans_id',authMiddleware.verifyToken, paymentController.checkStatusOrder);

module.exports = router;