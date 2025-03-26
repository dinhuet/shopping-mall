const jwt = require('jsonwebtoken');
const userService = require('../../services/UserService');
const User = require('../models/User');

class AuthMiddleWare {
    // check refreshToken
    async verifyToken(req, res, next) {
        try {
            const token =
                req.body.refresh_token ||
                req.headers.authorization?.aplit(' ')[1];
            if (!token) {
                return res.status(401).json({ message: 'Token not provided' });
            }

            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) {
                    return res.status(403).json({ message: 'Invalid token' });
                }
                req.user = decoded; //
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
}

module.exports = new AuthMiddleWare();
