const Course = require('../models/Product');
const {
    mongooseToObject,
    muiltipleMongooseToObject,
} = require('../../utils/mongoose');

const Product = require('../models/Product');

class SiteController {
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
