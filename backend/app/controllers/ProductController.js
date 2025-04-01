const Product = require('../models/Product');
const productService = require('../../services/ProductService');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {
    mongooseToObject,
    muiltipleMongooseToObject,
} = require('../../utils/mongoose');

class ProductController {

    getListproduct(req, res, next) {
        productService.getAllProduct()
        .then((products) => {
            res.json(muiltipleMongooseToObject(products));
        })
        .catch(next);
    }

    getProductDetail(req, res, next) {
        productService.getProductById(req.params.id)
        .then((product) => {
            if (!product)
                return res.status(404).json({ message: 'Product not found' });
            res.json(mongooseToObject(product));
        })
        .catch(next);
    }


}

module.exports = new ProductController();