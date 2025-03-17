const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Product = new Schema(
    {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        category: { type: String, required: true },
        description: { type: String, required: false },
        image: { type: String, required: false },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Product', Product);
