const express = require('express');

var router = express.Router();
const UserCtrl = require('../Controllers/user.controller')
const auth = require("../middleware/user.middleware");
// create user route

router.post('/signup',UserCtrl.signup)
router.post('/login',UserCtrl.login)

// get one user by id
router.get('/:id',auth, UserCtrl.getById);

// delete user
router.delete('/:id',UserCtrl.deleteUser);

// update user
router.put('/:id', auth, UserCtrl.updateUser);

// get all user
router.get('/',auth, UserCtrl.getAllUsers);


module.exports = router;