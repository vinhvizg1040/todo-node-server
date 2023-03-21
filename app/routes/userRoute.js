const express = require('express');
const auth = require('../../middlewares/auth');

const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/logout', userController.logout); // thêm đường dẫn /logout

module.exports = router;
