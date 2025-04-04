const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/UserController');
const authMiddleware = require('../app/middlewares/authMiddleware');

router.post('/refresh', authMiddleware.createNewAccessToken);
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', authMiddleware.verifyToken, userController.logout);
router.post('/forgot_password', userController.forgotPassword);
router.post('/reset_password', userController.resetPassword);
// router.put(
//     '/update_profile',
//     authMiddleware.verifyToken,
//     userController.updateProfile,
// );

router.get('/', userController.getUserProfile);

module.exports = router;
