const Product = require('../app/models/Product');
const Review = require('../app/models/Review');

require('dotenv').config();

/**
 * get product by id service.
 * @param {String} productId - ID sản phẩm
 * @returns
 */
const getProductById = async (productId) => {
    return await Product.findById(productId);
};

/**
 * get all product service.
 * @returns
 */
const getAllProduct = async () => {
    return await Product.find({});
};

/**
 * create product service.
 * @param {Object} product - Thông tin khởi tạo sản phẩm { name, price, countInStock, type, description, image, rating }.
 * @returns
 */
const createProduct = (product) => {
    return new Promise(async (resolve, reject) => {
        const { name, price, countInStock, type, description, image, rating } =
            product;

        try {
            if (
                !name ||
                !price ||
                !countInStock ||
                !type ||
                !description ||
                !image
            ) {
                return resolve({
                    status: 400,
                    message: 'Missing required fields',
                });
            }

            const existingProduct = await Product.findOne({ name });
            if (existingProduct) {
                return resolve({
                    status: 409,
                    message: 'The product is already.',
                });
            }

            const createdProduct = await Product.create({
                name,
                price,
                countInStock,
                type,
                description,
                image,
                rating: '',
            });

            return resolve({
                status: 'OK',
                message: 'Product created successfully',
                data: createdProduct,
            });
        } catch (error) {
            reject(error);
        }
    });
};

/**
 * update product service.
 * @param {String} productId - ID sản phẩm
 * @param {Object} detail - Chi tiết cập nhật sản phẩm
 * @returns
 */
const updateProduct = (productId, detail) => {
    return new Promise(async (resolve, reject) => {
        try {
            const updatedProduct = await Product.findByIdAndUpdate(
                productId,
                detail,
                { new: true },
            );

            if (!updatedProduct) {
                return resolve({
                    status: 404,
                    message: 'Product not found',
                });
            }

            return resolve({
                status: 'OK',
                message: 'Product updated successfully',
                data: updatedProduct,
            });
        } catch (error) {
            reject(error);
        }
    });
};

/**
 * delete product service.
 * @param {String} productId - ID sản phẩm
 * @returns
 */
const deleteProduct = (productId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const deletedProduct = await Product.findByIdAndDelete(productId);

            if (!deletedProduct) {
                return resolve({
                    status: 404,
                    message: 'Product not found',
                });
            }

            return resolve({
                status: 'OK',
                message: 'Product deleted successfully',
            });
        } catch (error) {
            reject(error);
        }
    });
};

/**
 * Tạo mới bình luận.
 * @param {Object} review - { productId, rating, comment }
 * @param {*} userId - lấy từ authMiddleware
 * @returns
 */
const createProductReview = (review, userId) => {
    return new Promise(async (resolve, reject) => {
        const { productId, rating, comment } = review;
        try {
            const newReview = new Review({
                productId,
                userId,
                rating,
                comment,
            });
            await newReview.save();
            return resolve({
                status: 'OK',
                message: 'Review created successfully',
                data: newReview,
            });
        } catch (error) {
            reject(error);
        }
    });
};

/**
 * Lấy tất cả các bình luận.
 * @param {String} productId - lấy từ params
 * @returns
 */
const getProductReview = (productId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const reviews = await Review.find({ productId }).populate(
                'userId',
                'name',
            );
            if (!reviews || reviews.length === 0) {
                return resolve({
                    status: 'NOT_FOUND',
                    message: 'Chưa có đánh giá nào cho sản phẩm này',
                });
            }
            return resolve({
                data: reviews,
            });
        } catch (error) {
            reject(error);
        }
    });
};



/**
 * delete review by id.
 * @param {String} reviewId - ID bình luận 
 * @returns
 */
const deleteProductReview = (reviewId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const deletedReview = await Review.findByIdAndDelete(reviewId);
            if (!deletedReview) {
                return resolve({
                    status: 404,
                    message: 'Review not found',
                });
            }

            return resolve({
                status: 'OK',
                message: 'Review deleted successfully',
            });
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    getProductById,
    getAllProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    createProductReview,
    getProductReview,
    deleteProductReview,
};
