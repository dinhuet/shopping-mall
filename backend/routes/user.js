const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/UserController');
const verifyToken = require('../app/middlewares/authMiddleware');

router.post('/refresh-token', userController.refreshToken);
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', verifyToken, userController.logout);

router.get('/', userController.getUserProfile);

module.exports = router;
