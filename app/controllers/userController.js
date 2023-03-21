const {
    body,
    validationResult
} = require('express-validator');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require("dotenv").config();


exports.register = async (req, res) => {

    try {
        // Xác thực các trường thông tin người dùng.
        await body('username').notEmpty().trim().isLength({
            max: 40
        }).escape().withMessage('Username must not be empty and must not exceed 40 characters.').run(req);
        await body('password').notEmpty().isLength({
            max: 15
        }).withMessage('Password must not be empty and must not exceed 15 characters.').run(req);

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({
                errors: errors.array()
            });
        }

        const {
            username,
            password
        } = req.body;

        // Check if user already exists
        let user = await User.findOne({
            where: {
                username
            }
        });
        if (user) {
            return res.status(400).json({
                error: 'User already exists'
            });
        }

        // Create new user
        user = new User({
            username,
            password
        });

        // Encrypt password with bcrypt
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Save new user to database
        await user.save();

        // Create and send JWT token
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1h'
        }, (err, token) => {
            if (err) throw err;
            res.json({
                token
            });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.login = async (req, res) => {
    try {
        // Lấy user từ database
        const user = await User.findOne({
            where: {
                username: req.body.username
            }
        });
        if (!user) {
            return res.status(400).json({
                message: 'Tên đăng nhập hoặc mật khẩu không đúng'
            });
        }

        // Xác thực mật khẩu
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: 'Tên đăng nhập hoặc mật khẩu không đúng'
            });
        }

        // Trả về token để giữ phiên đăng nhập
        const token = jwt.sign({
            userId: user._id
        }, process.env.JWT_SECRET);
        res.json({
            token
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.logout = (req, res) => {
    // xóa token khỏi cookie hoặc local storage
    res.clearCookie('token');
    // hoặc: delete req.user
    res.status(200).send("Đã đăng xuất");
};