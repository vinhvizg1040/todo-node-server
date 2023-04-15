const jwt = require('jsonwebtoken');
require("dotenv").config();

const secretKey = process.env.JWT_SECRET; // Khóa bí mật, nên được lưu trữ ở biến môi trường hoặc một file riêng.

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

function authorizeUser (req, res, next){
    if (req.user.role !== 'user') return res.sendStatus(403); // Người dùng không có quyền truy cập
    next();
}

function authorizeAdmin(req, res, next) {
    if (req.user.role !== 'admin') return res.status(403);// Quản trị viên không có quyền truy cập
    next();
  }

module.exports = {authenticateToken, authorizeUser, authorizeAdmin};