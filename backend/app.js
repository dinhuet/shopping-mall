const express = require('express');
const cors = require('cors');
const app = express();
const route = require('./routes'); // <-- Không cần require riêng adminRoutes
const db = require('./config/db');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const port = process.env.PORT || 3000;

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));

// Middleware cho parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Kết nối DB
db.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database');
});

// Chỉ dùng 1 lần
route(app); // <-- quản lý tất cả routes ở đây

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});