const express = require('express');
const app = express();
const route = require('./routes');
const db = require('./config/db');
require('dotenv').config(); // Load biến môi trường từ .env

const port = process.env.PORT || 3000;

// Connect to DB
db.connect(); // Gọi hàm kết nối MongoDB

// Middleware
app.use(express.urlencoded({ extended: true })); // Đọc dữ liệu form
app.use(express.json()); // Đọc dữ liệu JSON

// Routes init
route(app);

// Khởi động server
app.listen(port, () => {
    console.log(`🚀 App listening at http://localhost:${port}`);
});
