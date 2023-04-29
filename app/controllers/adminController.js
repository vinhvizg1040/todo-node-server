const {
    body,
    validationResult
} = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require("dotenv").config();

const User = require('../models/user');

exports.getAllUsers = async (req, res) => {
    await User.find({})
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