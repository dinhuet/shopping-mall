const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Product = new Schema(
    {
        name: { type: String, required: true, unique: true },
        price: { type: Number, required: true },
        countInStock: { type: Number, required: true },
        type: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true },
        rating: { type: Number, required: true},
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Product', Product);
