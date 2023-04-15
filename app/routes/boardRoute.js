const express = require('express');
const auth = require('../../middlewares/auth');

const router = express.Router();
const boardController = require('../controllers/boardController');

router.get('/getAllBoards', auth.authenticateToken, auth.authorizeAdmin, boardController.getAllBoards);

router.post('/createBoards',auth.authenticateToken, auth.authorizeUser, boardController.createBoards);
router.get('/getUserBoards', auth.authenticateToken, auth.authorizeUser, boardController.getUserBoards);
router.put('/updateBoardbyId', auth.authenticateToken, auth.authorizeUser, boardController.updateBoardbyId);
router.delete('/deleteBoardbyId', auth.authenticateToken, auth.authorizeUser, boardController.deleteBoardbyId);

module.exports = router;