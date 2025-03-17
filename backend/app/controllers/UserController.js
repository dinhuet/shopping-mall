const user = require('../models/User');
const userService = require("../../services/UserService");

const {
    mongooseToObject,
    muiltipleMongooseToObject,
} = require('../../utils/mongoose');

class UserController {
    getUserProfile(req, res, next) {
        userService.getAllUser()
           .then(user => {
            if (!user) return res.status(404).json({ message: "User not found" });
            res.json(muiltipleMongooseToObject(user));
           })
           .catch(next);
    }
}

module.exports = new UserController();
