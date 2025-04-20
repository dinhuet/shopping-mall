const express = require('express');
const router = express.Router();

const productController = require('../app/controllers/ProductController');
const authMiddleware = require('../app/middlewares/authMiddleware');

router.get('/detail/:id', productController.getProductDetail);
router.post(
    '/review/:id',
    authMiddleware.verifyToken,
    productController.createProductReview,
);
router.get('/review/:id', productController.getProductReview);
router.put(
    '/update/:id',
    authMiddleware.verifyToken,
    authMiddleware.verifyAdmin,
    productController.updateProduct,
);
router.delete(
    '/delete/:id',
    authMiddleware.verifyToken,
    authMiddleware.verifyAdmin,
    productController.deleteProduct,
);

router.post(
    '/',
    authMiddleware.verifyToken,
    authMiddleware.verifyAdmin,
    productController.createProduct,
);
router.get('/', productController.getListproduct);

module.exports = router;
