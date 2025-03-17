const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect(
            'mongodb+srv://23020043:5zz2n8ce@cluster0.pmizs.mongodb.net/shopping_mall',
        );
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log('Connect failed');
    }
}

module.exports = { connect };
