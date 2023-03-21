const {
    body,
    validationResult
} = require('express-validator');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require("dotenv").config();

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