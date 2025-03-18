const Course = require('../models/Product');
const User = require('../models/User');
const Product = require('../models/Product');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv').config(); // Load biến môi trường từ .env

const {
    mongooseToObject,
    muiltipleMongooseToObject,
} = require('../../utils/mongoose');




class SiteController {
    index(req, res, next) {
        User.find({})
            .then((users) => {
                // res.send('ok');
                res.json(muiltipleMongooseToObject(users));
            })
            .catch(next);
    }

    async register(req, res, next) {
        try {
            const { name, email, password, isAdmin, confirmPassword, phone } =
                req.body;

            // check existing account
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res
                    .status(409)
                    .json({ message: 'Email already exists' });
            }

            if (
                !name ||
                !email ||
                !password ||
                !confirmPassword ||
                !phone ||
                isAdmin === undefined
            ) {
                return res
                    .status(400)
                    .json({ message: 'Missing required fields' });
            }

            // check password
            if (password !== confirmPassword) {
                return res
                    .status(400)
                    .json({ message: 'Passwords do not match' });
            }
            if (password.length < 6) {
                return res
                    .status(400)
                    .json({
                        message: 'Password must be at least 6 characters long',
                    });
            }

            // check email
            const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(email)) {
                return res
                    .status(400)
                    .json({ message: 'Invalid email format' });
            }

            const hashPassword = await bcrypt.hash(password, 10);

            // save user in db
            const createdUser = await User.create({
                name,
                email,
                password: hashPassword,
                isAdmin,
                phone,
                access_token: '',
                refresh_token: '',
            });

            // create token after have id
            const access_token = jwt.sign(
                { id: createdUser._id },
                process.env.JWT_SECRET,
                { expiresIn: '1h' },
            );
            const refresh_token = jwt.sign(
                { id: createdUser._id },
                process.env.JWT_SECRET,
                { expiresIn: '7d' },
            );

            // update user with token
            createdUser.access_token = access_token;
            createdUser.refresh_token = refresh_token;
            await createdUser.save();

            res.status(201).json({
                message: 'User registered successfully',
                user: createdUser,
            });
        } catch (error) {
            return res
                .status(500)
                .json({
                    message: 'Internal server error',
                    error: error.message,
                });
        }
    }
}

module.exports = new SiteController();
