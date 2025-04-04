const Product = require('../app/models/Product');

require('dotenv').config();

// get product by id service
const getProductById = async (productId) => {
    return await Product.findById(productId);
};

// get all product service
const getAllProduct = async () => {
    return await Product.find({});
};

// create product service
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
// update product service
const updateProduct = (productId, detail) => {
    return new Promise(async (resolve, reject) => {
        try {
            const updatedProduct = await Product.findByIdAndUpdate(
                productId,
                detail,
                { new: true }
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
    })
}

/**
 * delete product.
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
}

module.exports = {
    getProductById,
    getAllProduct,
    createProduct,
    updateProduct,
    deleteProduct,
};
