const jwt = require('jsonwebtoken');
const userService = require('../../services/UserService');

 const verifyToken = (req, res, next) => {
    const user = userService.getUserByEmail(req.body);
    const token = user.refresh-token;  // Đọc từ cookie
    if (!token) {
        return res.status(401).json({ message: 'Token not provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = user;
        next();
    });
}

module.exports = verifyToken;