const Product = require('../app/models/Product');

require('dotenv').config();

const getProductById = async (productId) => {
    return await Product.findById(productId);
};

const getAllProduct = async () => {
    return await Product.find({});
};

module.exports = {
    getProductById,
    getAllProduct,
 };

