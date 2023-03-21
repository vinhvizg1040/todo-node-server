const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
    const token = req.cookies.token || '';
    try {
        // giải mã token
        const decoded = jwt.verify(token, 'my_secret_key');
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).send("Token không hợp lệ");
    }
};