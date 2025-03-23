const jwt = require('jsonwebtoken');
const userService = require('../../services/UserService');

const verifyToken = async (req, res, next) => {
    try {
        // gui qua header khi co front
        // const token = req.headers.authorization?.aplit(" ")[1];

        const token = req.body.refresh_token;
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
};

module.exports = verifyToken;
