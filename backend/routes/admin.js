const express = require('express');
const router = express.Router();
const adminController = require('../app/controllers/AdminController');

router.post('/login', adminController.login);

module.exports = router;