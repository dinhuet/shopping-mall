const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cartItemSchema = new Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        quantity: { type: Number, default: 1 },
    },
    {
        timestamps: true,
    },
);

const Cart = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        items: [cartItemSchema],
        totalPrice: { type: Number, default: 0 },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Cart', Cart);