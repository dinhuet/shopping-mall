const User = require('../app/models/User');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getUserById = async (userId) => {
    return await User.findById(userId);
};

const getUserByEmail = async (email) => {
    return await User.findOne({ email });
};

const getAllUser = async () => {
    return await User.find({});
};

const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, isAdmin, confirmPassword, phone } =
            newUser;
        try {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return resolve({
                    status: 'OK',
                    message: 'The email is already.',
                });
            }

            if (
                !name ||
                !email ||
                !password ||
                !confirmPassword ||
                !phone ||
                isAdmin === undefined
            ) {
                return resolve({
                    status: '400',
                    message: 'Missing required fields',
                });
            }

            // check password
            if (password !== confirmPassword) {
                reject(new Error('Passwords do not match'));
            }
            if (password.length < 6) {
                return reject(
                    new Error('Password must be at least 6 characters long'),
                );
            }

            // check email
            const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.(com|net|org|edu|vn)$/;
            if (!emailRegex.test(email)) {
                return reject(new Error('Invalid email format'));
            }

            const hashPassword = await bcrypt.hash(password, 10);

            // save user in db
            const createdUser = await User.create({
                name,
                email,
                password: hashPassword,
                isAdmin,
                phone,
                refresh_token: '',
            });

            // create token after have id
            const access_token = jwt.sign(
                { id: createdUser._id },
                process.env.JWT_SECRET,
                { expiresIn: '1h' },
            );
            const refresh_token = jwt.sign(
                { id: createdUser._id },
                process.env.JWT_SECRET,
                { expiresIn: '7d' },
            );

            // update user with token
            createdUser.refresh_token = refresh_token;
            await createdUser.save();

            if (createdUser) {
                return resolve({
                    status: 'OK',
                    message: 'User created successfully.',
                    user: createdUser,
                    access_token,
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

const loginUser = (userLogin) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { email, password } = userLogin;
            if (!email || !password) {
                return resolve({
                    status: '400',
                    message: 'Missing required fields',
                });
            }

            const user = await User.findOne({ email });

            if (!user) {
                return resolve({
                    status: '404',
                    message: 'User not found',
                });
            }
            // check password
            if (!bcrypt.compareSync(password, user.password)) {
                return resolve({
                    status: '401',
                    message: 'Invalid password',
                });
            } else {
                const access_token = jwt.sign(
                    { id: user._id },
                    process.env.JWT_SECRET,
                    { expiresIn: '1h' },
                );
                const refresh_token = jwt.sign(
                    { id: user._id },
                    process.env.JWT_SECRET,
                    { expiresIn: '7d' },
                );

                await User.findByIdAndUpdate(user._id, { refresh_token });

                return resolve({
                    status: 'OK',
                    message: 'Login successful',
                    user: user,
                    access_token,
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

const logoutUser = (userLogout) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({ _id: userLogout.id });

            if (!user) {
                return resolve({
                    status: '404',
                    message: 'User not found',
                });
            }

            await User.findByIdAndUpdate(user._id, { refresh_token: '' });

            return resolve({
                status: 'OK',
                message: 'Logout successful',
            });
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    getUserById,
    getAllUser,
    getUserByEmail,
    createUser,
    loginUser,
    logoutUser,
};
