const User = require('../models/User');
const userService = require('../../services/UserService');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {
    mongooseToObject,
    muiltipleMongooseToObject,
} = require('../../utils/mongoose');

class UserController {
    /**
     * Get user profile.
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    getUserProfile(req, res, next) {
        userService
            .getAllUser()
            .then((user) => {
                if (!user)
                    return res.status(404).json({ message: 'User not found' });
                res.json(muiltipleMongooseToObject(user));
            })
            .catch(next);
    }

    /**
     * Register.
     * @param {Object} req - Truyền vào req.body thông tin đăng ký { name, email, password, isAdmin, confirmPassword, phone }
     * @param {*} res
     * @param {*} next
     */
    register(req, res, next) {
        userService
            .createUser(req.body)
            .then((result) => {
                if (result.status === 'OK') {
                    return res.status(201).json(result);
                }
                return res
                    .status(result.status)
                    .json({ message: result.message });
            })
            .catch((error) => {
                return res.status(400).json({ message: error.message });
            });
    }

    /**
     * Login.
     * @param {Object} req - Truyền vào req.body { email, password }
     * @param {*} res
     * @param {*} next
     */
    login(req, res, next) {
        userService
            .loginUser(req.body)
            .then((result) => {
                if (result.status === 'OK') {
                    return res.status(200).json(result);
                }
                return res
                    .status(result.status)
                    .json({ message: result.message });
            })
            .catch((error) => {
                return res.status(400).json({ message: error.message });
            });
    }

    /**
     * Logout.
     * @param {Object} req - req.user lấy dữ liệu user từ middleware.
     * @param {*} res
     * @param {*} next
     */
    logout(req, res, next) {
        userService
            .logoutUser(req.user)
            .then((result) => {
                if (result.status === 'OK') {
                    return res.status(200).json(result);
                }
                return res
                    .status(result.status)
                    .json({ message: result.message });
            })
            .catch((error) => {
                return res.status(400).json({ message: error.message });
            });
    }

    /**
     * Forgot password.
     * @param {String} req - Truyền vào req.body email
     * @param {*} res
     * @param {*} next
     */
    forgotPassword(req, res, next) {
        userService
            .forgotPassword(req.body.email)
            .then((result) => {
                if (result.status === 'OK') {
                    return res.status(200).json(result);
                }
                return res
                    .status(result.status)
                    .json({ message: result.message });
            })
            .catch((error) => {
                return res.status(400).json({ message: error.message });
            });
    }

    /**
     * Create new password.
     * @param {Object} req - Truyền vào req.body { resetToken, newPassword, confirmPassword }
     * @param {*} res
     * @param {*} next
     */
    resetPassword(req, res, next) {
        userService
            .resetPassword(req.body)
            .then((result) => {
                if (result.status === 'OK') {
                    return res.status(200).json(result);
                }
                return res
                    .status(result.status)
                    .json({ message: result.message });
            })
            .catch((error) => {
                return res.status(400).json({ message: error.message });
            });
    }

    /**
     * Update profile.
     * @param {*} req - Truyền vào req.body {name, password, confirmPassword, phone}
     * - req.user: lấy từ middleWare verifyToken
     * @param {*} res 
     * @param {*} next 
     */
    updateProfile(req, res, next) {
        userService
            .updateProfile(req.user, req.body)
            .then((result) => {
                if (result.status === 'OK') {
                    return res.status(200).json(result);
                }
                return res
                   .status(result.status)
                   .json({ message: result.message });
            })
           .catch((error) => {
                return res.status(400).json({ message: error.message });
            });
    }
}

module.exports = new UserController();
