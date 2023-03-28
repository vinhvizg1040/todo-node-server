const express = require('express');
// const auth = require('../../middlewares/auth');

const router = express.Router();
const taskController = require('../controllers/taskController');

router.get('/getUserTasks', taskController.getUserTasks);
router.post('/createTask', taskController.createTask);
router.put('/updateTask', taskController.updateTask);
router.delete('/deleteTask', taskController.deleteTask);

module.exports = router;
