const express = require('express');
const router = express.Router();

// controllers

const TaskCtrl = require('../Controllers/task.controller')


// middleware d'authentification 

const auth = require('../middleware/user.middleware')


// create task
router.post('/', TaskCtrl.createTask);

// get one task by id
router.get('/:id', TaskCtrl.getById);

// get task by user
router.get("/user/:id", TaskCtrl.getByUserId);

// delete comment
router.delete('/:id',TaskCtrl.deleteTask);

// update task
router.put('/:id', TaskCtrl.updateTask);

// get all task
router.get('/',TaskCtrl.getAllTask);

module.exports = router;
