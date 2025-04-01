const express = require('express');
const router = express.Router();

const productController = require('../app/controllers/ProductController');

router.get('/:id', productController.getProductDetail);

router.get('/', productController.getListproduct);

module.exports = router;
