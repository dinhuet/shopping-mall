const Product = require('../models/Product');
const productService = require('../../services/ProductService');

const {
    mongooseToObject,
    muiltipleMongooseToObject,
} = require('../../utils/mongoose');

class ProductController {
    /**
     * Get list of products.
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    getListproduct(req, res, next) {
        productService
            .getAllProduct(req.query.type)
            .then((products) => {
                res.json(muiltipleMongooseToObject(products.data));
            })
            .catch(next);
    }

    /**
     * Get product detail by id.
     * @param {*} req - Lấy id từ params.
     * @param {*} res
     * @param {*} next
     */
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

    /**
     * Create new product.
     * @param {*} req - Truyền vào req.body thông tin khởi tạo { name, price, countInStock, type, description, image, rating }
     * @param {*} res
     * @param {*} next
     */
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
    /**
     * update product by id.
     * @param {*} req - Truyền vào req.body thông tin mới.
     * @param {*} res
     * @param {*} next
     */
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
     * delete product by id.
     * @param {*} req
     * @param {*} res
     * @param {*} next
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

    /**
     * Tạo mới bình luận.
     * @param {*} req - Truyền vào req.body {productId, rating, comment}
     * - req.header chứa access token của user
     * @param {*} res
     * @param {*} next
     */
    createProductReview(req, res, next) {
        productService
            .createProductReview(req.body, req.user.id)
            .then((review) => {
                if (review.status === 'OK') {
                    return res.status(200).json(review);
                }
                return res.json(review.message);
            })
            .catch(next);
    }

    /**
     * Lấy tất cả bình luận.
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    getProductReview(req, res, next) {
        productService
            .getProductReview(req.params.id)
            .then((reviews) => {
                res.status(200).json(reviews);
            })
            .catch(next);
    }
}

module.exports = new ProductController();
