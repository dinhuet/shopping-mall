const Course = require('../models/Product');
const User = require('../models/User');
const Product = require('../models/Product');

require('dotenv').config(); // Load biến môi trường từ .env

const {
    mongooseToObject,
    muiltipleMongooseToObject,
} = require('../../utils/mongoose');

class SiteController {
    // /:slug
    index(req, res, next) {
        Product.find({})
            .then((products) => {
                // res.send('ok');
                res.json(muiltipleMongooseToObject(products));
            })
            .catch(next);
    }
}

module.exports = new SiteController();
