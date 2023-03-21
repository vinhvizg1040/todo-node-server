const { body, validationResult } = require('express-validator');
const User = require('../models/user');

exports.getAllUsers = (req, res) => {
    User.findAll()
        .then(users => {
            res.status(200).json({
                message: 'Get all users successfully',
                users: users
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'Internal server error',
                error: error
            });
        });
};

exports.createUser = async (req, res) => {
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
        console.log(req.body)
        // Kiểm tra email đã có trong cơ sở dữ liệu chưa.
        const existingUser = User.findOne({
            where: {
                username
            }
        });

        if (existingUser) {
            return res.status(409).json({
                message: 'username is already taken.'
            });
        }

        // Tạo user mới.
        const user = User.create({
            username,
            password
        });

        // Phản hồi với thông tin về user mới.
        return res.status(201).json(user);

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            message: 'Internal server error.' + error
        });
    }

};