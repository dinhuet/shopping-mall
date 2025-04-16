require('dotenv').config();

const mongoose = require('mongoose');
const DB_URI =
    process.env.NODE_ENV === 'test'
        ? process.env.MONGO_URI_TEST
        : process.env.MONGO_URI_DEV;

async function connect() {
    try {
        await mongoose.connect(`${DB_URI}`);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log('Connect failed');
    }
}

module.exports = { connect };

