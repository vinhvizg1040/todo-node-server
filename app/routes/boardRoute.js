const express = require('express');
const auth = require('../../middlewares/auth');

const router = express.Router();
const boardController = require('../controllers/boardController');

router.get('/getAllBoards', auth.authenticateToken, auth.authorizeAdmin, boardController.getAllBoards);

router.post('/createBoards',auth.authenticateToken, auth.authorizeUser, boardController.createBoards);
router.get('/getUserBoards', auth.authenticateToken, auth.authorizeUser, boardController.getUserBoards);
router.put('/updateBoardbyId', auth.authenticateToken, auth.authorizeUser, boardController.updateBoardbyId);
router.delete('/deleteBoardbyId', auth.authenticateToken, auth.authorizeUser, boardController.deleteBoardbyId);

router.post('/getBoardbyId', auth.authenticateToken, auth.authorizeUser, boardController.getBoardbyId);
router.get('/getFirstBoard', auth.authenticateToken, auth.authorizeUser, boardController.getFirstBoard);


router.post('/updateListOfBoardPosition', auth.authenticateToken, auth.authorizeUser, boardController.updateListOfBoardPosition);
module.exports = router;