const express = require('express');
const auth = require('../../middlewares/auth');

const router = express.Router();
const cardController = require('../controllers/cardController');

router.get('/getAllCards', auth.authenticateToken, auth.authorizeAdmin, cardController.getAllCards);
router.post('/createCard', auth.authenticateToken, auth.authorizeUser, cardController.createCard);

module.exports = router;