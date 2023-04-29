const express = require('express');
const auth = require('../../middlewares/auth');

const router = express.Router();
const listController = require('../controllers/listController');

router.get('/getAllLists', auth.authenticateToken, auth.authorizeAdmin, listController.getAllLists);
router.post('/createList', auth.authenticateToken, auth.authorizeUser, listController.createList);
// router.get('/getUserList', auth.authenticateToken, auth.authorizeUser, listController.getUserList);
// router.delete('/deleteListbyId', auth.authenticateToken, auth.authorizeUser, listController.deleteListbyId);
// router.put('/updateListbyId', auth.authenticateToken, auth.authorizeUser, listController.updateListbyId);

module.exports = router;