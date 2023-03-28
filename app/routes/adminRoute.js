const express = require('express');
const auth = require('../../middlewares/auth');

const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/getUser', auth.authenticateToken, auth.authorizeAdmin, adminController.getAllUsers);
// router.post('/login', adminController.login);
// router.get('/logout', adminController.logout); // thêm đường dẫn /logout

module.exports = router;