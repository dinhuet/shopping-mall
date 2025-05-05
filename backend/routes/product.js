const express = require('express');
const router = express.Router();

// Import controller product (menu) và middleware xác thực
const productController = require('../app/controllers/ProductController');
const authMiddleware = require('../app/middlewares/authMiddleware');

router.get('/menu', productController.getMenuItems);

router.post('/menu', authMiddleware.verifyToken, authMiddleware.verifyAdmin, productController.createMenuItem);

router.delete('/menu/:id', authMiddleware.verifyToken, authMiddleware.verifyAdmin, productController.deleteProduct);

router.get('/detail/:id', productController.getProductDetail);

router.put('/update/:id', authMiddleware.verifyToken, authMiddleware.verifyAdmin, productController.updateProduct);

// Nếu dùng POST /api để tạo sản phẩm (không phải menu item)
router.post('/', authMiddleware.verifyToken, authMiddleware.verifyAdmin, productController.createProduct);

router.get('/', productController.getListproduct);


module.exports = router;