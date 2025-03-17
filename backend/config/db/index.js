require('dotenv').config(); 

const mongoose = require('mongoose');     
const MONGO_DB = process.env.MONGO_DB;      

async function connect() {
    try {
        await mongoose.connect(
            `${MONGO_DB}`,
        );
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log('Connect failed');
    }
}

module.exports = { connect };
