const express = require('express');
const app = express();
const route = require('./routes');
const db = require('./config/db');

require('dotenv').config(); // Load biến môi trường từ .env

const port = process.env.PORT || 3000;

// connect to db
db.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database');
});

// Routes init

// app.use(express.static(path.join(__dirname, 'public'))); // Thư mục chứa file static

app.use(express.urlencoded({ extended: true })); // Để đưa dữ liệu POST lên req.body
app.use(express.json()); // Để đưa dữ liệu POST lên req.body

// routes init
route(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
