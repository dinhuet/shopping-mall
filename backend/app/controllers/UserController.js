const User = require('../models/User');
const userService = require('../../services/UserService');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {
    mongooseToObject,
    muiltipleMongooseToObject,
} = require('../../utils/mongoose');

class UserController {
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

    // /register
    register(req, res, next) {
        userService
            .createUser(req.body)
            .then((result) => {
                if (result.status === 'OK') {
                    return res.status(201).json(result);
                }
                return res
                    .status(404)
                    .json({ message: 'Cannot create user account' });
            })
            .catch((error) => {
                return res.status(400).json({ message: error.message });
            });
    }

    // /login
    login(req, res, next) {
        userService
            .loginUser(req.body)
            .then((result) => {
                if (result.status === 'OK') {
                    return res.status(200).json(result);
                }
                return res
                    .status(401)
                    .json({ message: 'Invalid email or password' });
            })
            .catch((error) => {
                return res.status(400).json({ message: error.message });
            });
    }

    logout(req, res, next) {
        userService
            .logoutUser(req.user)
            .then((result) => {
                if (result.status === 'OK') {
                    return res.status(200).json(result);
                }
                return res
                    .status(401)
                    .json({ message: 'Invalid user or refresh token' });
            })
            .catch((error) => {
                return res.status(400).json({ message: error.message });
            });
    }

    forgotPassword(req, res, next) {
        userService
           .forgotPassword(req.body.email)
            .then((result) => {
                if (result.status === 'OK') {
                    return res.status(200).json(result);
                }
                return res.status(404).json({ message: 'User not found' });
            })
           .catch((error) => {
                return res.status(400).json({ message: error.message });
            });
    }

    resetPassword(req, res, next) {
        userService
           .resetPassword(req.body)
            .then((result) => {
                if (result.status === 'OK') {
                    return res.status(200).json(result);
                }
                return res.status(404).json({ message: 'User not found' });
            })
           .catch((error) => {
                return res.status(400).json({ message: error.message });
            });
    }
}

module.exports = new UserController();
