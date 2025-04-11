const jwt = require('jsonwebtoken');
const userService = require('../../services/UserService');
const User = require('../models/User');
const bcrypt = require('bcryptjs');


const {
    mongooseToObject,
    muiltipleMongooseToObject,
} = require('../../utils/mongoose');

/**
 * Kiểm tra thông tin nhập vào.
 */
class validateUserInput {
    async validateUserInput(req, res, next) {
        try {
            const {name, password, confirmPassword, phone} = req.body;

            if (
                !name ||
                !password ||
                !confirmPassword ||
                !phone
            ) {
                return res.status(400).json({ message: 'Missing required fields' });
            }

            // check password
            if (password !== confirmPassword) {
                return res.status(400).json({ message: 'Password do not match' });
            }
            if (password.length < 6) {
                return res.status(400).json({ message: 'Password must be at least 6 characters long' });
            }


            const hashPassword = await bcrypt.hash(password, 10);

            req.body = { name, password: hashPassword, phone };
            next();
        } catch (error) {
            return res.status(500).json({ message: 'Something went wrong', error: error.message });
        }
    };
}

module.exports = new validateUserInput();