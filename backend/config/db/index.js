require('dotenv').config(); 

const mongoose = require('mongoose');     
const MONGO_DB = process.env.MONGO_DB;      

async function connect() {
    try {
        await mongoose.connect(
            `mongodb+srv://23020043:${MONGO_DB}@cluster0.pmizs.mongodb.net/shopping_mall`,
        );
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log('Connect failed');
    }
}

module.exports = { connect };
