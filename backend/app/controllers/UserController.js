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

    // /refresh-token
    async refreshToken(req, res, next) {
        const { refresh_token } = req.body;
        if (!refresh_token) {
            return res
                .status(403)
                .json({ message: 'Refresh Token is required' });
        }

        // 🔄 Kiểm tra Refresh Token trong DB
        const user = await User.findOne({ refresh_token });
        if (!user) {
            return res.status(403).json({ message: 'Invalid Refresh Token' });
        }

        jwt.verify(refresh_token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) return res.status(403).json({ message: "Invalid Refresh Token" });
    
            // Tạo Access Token mới
            const newAccessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
            res.json({ accessToken: newAccessToken });
        });
    }

    // /register
    register(req, res, next) {
            userService.createUser(req.body)
            .then((result) => {
                if (result.status === 'OK'){
                    return res.status(201).json(result);
                }
                return res.status(404).json({ message: 'Cannot create user account' });
            })
            .catch(error => {
                return res.status(400).json({ message: error.message });
            }) 
    }

    // /login
    login(req, res, next) {
        userService.loginUser(req.body)
           .then((result) => {
                if (result.status === 'OK'){
                    return res.status(200).json(result);
                }
                return res.status(401).json({ message: 'Invalid email or password' });
            })
           .catch(error => {
                return res.status(400).json({ message: error.message });
            })
    }

    logout(req, res, next) {
        userService.logoutUser(req.body)
           .then((result) => {
                if (result.status === 'OK'){
                    return res.status(200).json(result);
                }
                return res.status(401).json({ message: 'Invalid user or refresh token' });
            })
           .catch(error => {
                return res.status(400).json({ message: error.message });
            })
    }
}

module.exports = new UserController();
