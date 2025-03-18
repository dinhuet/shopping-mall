const User = require('../app/models/User');

const getUserById = async (userId) => {
    return await User.findById(userId);
};

const getAllUser = async () => {
    return await User.find({});
};

module.exports = { getUserById, getAllUser };
