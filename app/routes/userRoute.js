const express = require('express');
// const checkAuth = require('../../middlewares/checkAuth');

const router = express.Router();
const userController = require('../controllers/userController');

router.get('/getUser', userController.getAllUsers);
router.post('/createUser', userController.createUser);

module.exports = router;
