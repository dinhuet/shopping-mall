const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const User = require('../models/User');
const {
    mongooseToObject,
    muiltipleMongooseToObject,
} = require('../../utils/mongoose');

// Load admin danh sách từ file JSON
const adminDataPath = path.join(__dirname, '../../config/db/admin.json');
const admins = JSON.parse(fs.readFileSync(adminDataPath, 'utf-8'));

class AuthMiddleWare {
    async verifyToken(req, res, next) {
        let authHeader = req.headers['authorization'];
        let token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Access token not provided' });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // Check admin
            const admin = admins.find(a => a.id === decoded.id);
            if (admin) {
                req.user = {
                    id: null,
                    adminId: admin.id,
                    role: 'admin'
                };
                return next();
            }
        
            // Check user
            const user = await User.findById(decoded.sub || decoded.id);
            if (!user) return res.status(401).json({ message: 'User not found' });
        
            req.user = {
                id: user._id.toString(), // Đảm bảo luôn là string hợp lệ
                email: user.email,
                role: 'user' // Thêm trường role
            };
            next();
        } catch (err) {
            console.error('[VERIFY TOKEN ERROR]', err);

            if (err.name === 'TokenExpiredError') {
                const refreshToken =
                    req.headers['x-refresh-token'] ||
                    req.body.refresh_token ||
                    req.cookies.authorization?.split(' ')[1];

                if (!refreshToken) {
                    return res.status(401).json({ message: 'Access token expired' });
                }

                // Gọi createNewAccessToken để cấp token mới
                return this.createNewAccessTokenFromRefreshToken(refreshToken, res)
                    .then((newAccessToken) => {
                        // Trả về token mới cho FE xử lý lưu trữ lại
                        return res.status(200).json({ newAccessToken });
                    })
                    .catch((error) => {
                        console.error('[REISSUE TOKEN ERROR]', error);
                        return res.status(403).json({ message: 'Refresh token invalid hoặc expired' });
                    });
            }

            return res.status(403).json({ message: 'Invalid access token' });
        }
    }            
    async createNewAccessToken(req, res, next) {
        const token = req.body.refresh_token || req.cookies.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Refresh token not provided' });
        }

        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                console.error('[REFRESH TOKEN ERROR]', err);
                return res.status(403).json({ message: 'Invalid refresh token' });
            }

            try {
                const admin = admins.find(a => a.email === decoded.email);
                if (admin) {
                    const newAccessToken = jwt.sign(
                        { id: admin.id, email: admin.email },
                        process.env.JWT_SECRET,
                        { expiresIn: '1h' }
                    );
                    res.locals.newAccessToken = newAccessToken;
                    return next();
                }

                const user = await User.findById(decoded.id || decoded.sub);

                if (!user) {
                    return res.status(401).json({ message: 'Invalid user or refresh token' });
                }

                const newAccessToken = jwt.sign(
                    { id: user._id, email: user.email },
                    process.env.JWT_SECRET,
                    { expiresIn: '1h' }
                );

                res.locals.newAccessToken = newAccessToken;
                next(); // chuyển tiếp sang verifyToken
            } catch (e) {
                console.error('[CREATE ACCESS TOKEN ERROR]', e);
                res.status(500).json({ message: 'Server error' });
            }
        });
    }    
    async verifyAdmin(req, res, next) {
        try {
            const { id, adminId, role } = req.user || {};

            if (!id && !adminId) {
                return res.status(401).json({ message: 'User info missing' });
            }

            if (role === 'admin') {
                console.log(`[ADMIN] Truy cập bởi adminId: ${adminId}`);
                return next();
            }            

            // Nếu là user => kiểm tra thêm trong DB
            const user = await User.findById(id);
            if (!user || !user.isAdmin) {
                return res.status(403).json({ message: 'Yêu cầu quyền quản trị viên' });
            }

            console.log(`[ADMIN] Truy cập bởi: ${user.email}`);
            next();
        } catch (err) {
            console.error('[ADMIN ERROR]', err);
            res.status(500).json({ message: 'Lỗi server' });
        }
    }
    async createNewAccessTokenFromRefreshToken(refreshToken, res) {
        return new Promise((resolve, reject) => {
            jwt.verify(refreshToken, process.env.JWT_SECRET, async (err, decoded) => {
                if (err) {
                    return reject(err);
                }

                try {
                    const admin = admins.find(a => a.email === decoded.email);
                    if (admin) {
                        const newAccessToken = jwt.sign(
                            { id: admin.id, email: admin.email },
                            process.env.JWT_SECRET,
                            { expiresIn: '1h' }
                        );
                        return resolve(newAccessToken);
                    }

                    const user = await User.findById(decoded.id || decoded.sub);

                    if (!user) {
                        return reject(new Error('Invalid user'));
                    }

                    const newAccessToken = jwt.sign(
                        { id: user._id, email: user.email },
                        process.env.JWT_SECRET,
                        { expiresIn: '1h' }
                    );

                    resolve(newAccessToken);
                } catch (e) {
                    reject(e);
                }
            });
        });
    }
}

module.exports = new AuthMiddleWare();
