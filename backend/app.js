const express = require('express');
const cors = require('cors'); // Import cors module
const app = express();
const route = require('./routes');
const db = require('./config/db');
const cookieParser = require('cookie-parser');



require('dotenv').config(); // Load biến môi trường từ .env

const port = process.env.PORT || 3000;

// Cấu hình CORS
app.use(
    cors({
        origin: 'http://localhost:3000', // Cho phép frontend từ http://localhost:3000 truy cập
        methods: ['GET', 'POST', 'PUT', 'DELETE'], // Các phương thức HTTP được phép
        allowedHeaders: ['Content-Type', 'Authorization'], // Các headers được phép
        credentials: true, // Cho phép gửi cookie/token trong yêu cầu CORS
    }),
);
app.use(cookieParser()); // ✅ Đọc cookie từ request
// Connect to db
db.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database');
});

// Routes init
app.use(express.urlencoded({ extended: true })); // Để đưa dữ liệu POST lên req.body
app.use(express.json()); // Để đưa dữ liệu POST lên req.body

// routes init
route(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
