const {
    body,
    validationResult
} = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require("dotenv").config();

const User = require('../models/user');

exports.register = async (req, res) => {

    try {
        // Xác thực các trường thông tin người dùng.
        await body('username').notEmpty().trim().isLength({
            max: 40
        }).escape().withMessage('Username must not be empty and must not exceed 40 characters.').run(req);
        await body('password').notEmpty().isLength({
            max: 15
        }).withMessage('Password must not be empty and must not exceed 15 characters.').run(req);
        // await body('mail').notEmpty().withMessage('must not be empty and look like xxx@xxx.xxx').matches(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).run(req);

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({
                errors: errors.array()
            });
        }

        const {
            username,
            password,
            // mail
        } = req.body;

        // Check if user already exists
        let isUserExist = await User.exists({
            username: username
        });
        if (isUserExist) {
            return res.status(400).json({
                error: 'User already exists'
            });
        }

        // Check if mail already exists
        // let isMailExist = await User.exists({
        //     mail: mail
        // });
        // if (isMailExist) {
        //     return res.status(400).json({
        //         error: 'Mail already exists'
        //     });
        // }

        // Create new user
        let user = new User({
            username,
            password,
            // mail,
        });

        // Encrypt password with bcrypt
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Save new user to database
        await user.save();

        // Create and send JWT token
        const payload = {
            role: user.role,
            user_id: user.user_id
        };

        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '3h'
        }, (err, token) => {
            if (err) throw err;
            res.json({
                token,
                userId: user.id,
                username: user.username,
                role: user.role
            });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send({message: err.message});
    }
};

exports.login = async (req, res) => {
    try {
        // Lấy user từ database
        const user = await User.findOne({
            username: req.body.username
        });
        if (!user) {
            return res.status(400).json({
                message: 'Tên đăng nhập không đúng'
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

        const payload = {
            role: user.role,
            user_id: user.id
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '3h'
        });

        res.json({
            token,
            userId: user.id,
            username: user.username,
            role: user.role
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