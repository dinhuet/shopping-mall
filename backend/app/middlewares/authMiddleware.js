const jwt = require('jsonwebtoken');
const userService = require('../../services/UserService');
const User = require('../models/User');

const {
    mongooseToObject,
    muiltipleMongooseToObject,
} = require('../../utils/mongoose');

class AuthMiddleWare {
    // check accesstoken
    async verifyToken(req, res, next) {
        try {
            const token =
                req.body.refresh_token ||
                req.headers.authorization?.split(' ')[1];
            if (!token) {
                return res.status(401).json({ message: 'Token not provided' });
            }

            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) {
                    return res.status(403).json({ message: 'Invalid token' });
                }
                req.user = decoded;
                console.log(req.user);
                next();
            });
        } catch (error) {
            console.error('Error verifying token:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    // Tạo accessToken mới
    async createNewAccessToken(req, res, next) {
        const token =
            req.body.refresh_token || req.cookies.authorization?.aplit(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Token not provided' });
        }

        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid token' });
            }

            const user = await User.findOne({ refresh_token: token });

            if (!user) {
                return res
                    .status(401)
                    .json({ message: 'Invalid user or refresh token' });
            }

            const newAccessToken = jwt.sign(
                { id: decoded.id },
                process.env.JWT_SECRET,
                { expiresIn: '1h' },
            );

            res.json({ accessToken: newAccessToken });
        });
    }

    // check admin
    async verifyAdmin(req, res, next) {
        const user = await User.findOne({ _id: req.user.id });
        if (!user || !user.isAdmin) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        next();
    }
}

module.exports = new AuthMiddleWare();