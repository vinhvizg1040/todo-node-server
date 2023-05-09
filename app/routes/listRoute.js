const express = require('express');
const auth = require('../../middlewares/auth');

const router = express.Router();
const listController = require('../controllers/listController');

router.get('/getAllLists', auth.authenticateToken, auth.authorizeAdmin, listController.getAllLists);
router.post('/createList', auth.authenticateToken, auth.authorizeUser, listController.createList);
router.delete('/deleteListById', auth.authenticateToken, auth.authorizeUser, listController.deleteListById);
router.put('/updateListById', auth.authenticateToken, auth.authorizeUser, listController.updateListById);

module.exports = router;