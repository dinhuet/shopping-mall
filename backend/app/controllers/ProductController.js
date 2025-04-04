const Product = require('../models/Product');
const productService = require('../../services/ProductService');

const {
    mongooseToObject,
    muiltipleMongooseToObject,
} = require('../../utils/mongoose');

class ProductController {
    // get all products
    getListproduct(req, res, next) {
        productService
            .getAllProduct()
            .then((products) => {
                res.json(muiltipleMongooseToObject(products));
            })
            .catch(next);
    }

    // get product by id
    getProductDetail(req, res, next) {
        productService
            .getProductById(req.params.id)
            .then((product) => {
                if (!product)
                    return res
                        .status(404)
                        .json({ message: 'Product not found' });
                return res.json(mongooseToObject(product));
            })
            .catch(next);
    }

    // create product
    createProduct(req, res, next) {
        productService
            .createProduct(req.body)
            .then((product) => {
                if (product.status === 'OK') {
                    return res.status(201).json(product);
                }
                return res.status(product.status).json(product.message);
            })
            .catch(next);
    }

    // update product by id
    updateProduct(req, res, next) {
        productService
            .updateProduct(req.params.id, req.body)
            .then((product) => {
                if (product.status === 'OK') {
                    return res.status(200).json(product);
                }
                return res.status(product.status).json(product.message);
            })
            .catch(next);
    }

    /**
     * delete product.
     */
    deleteProduct(req, res, next) {
        productService
            .deleteProduct(req.params.id)
            .then((product) => {
                if (product.status === 'OK') {
                    return res.status(200).json(product);
                }
                return res.status(product.status).json(product.message);
            })
            .catch(next);
    }
}

module.exports = new ProductController();
