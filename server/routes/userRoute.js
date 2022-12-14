'use strict';
const express = require('express');
const router = express.Router()
const multer = require('multer');
const userController = require('../controllers/userController');

const upload = multer({ dest: 'uploads/'
    // , fileFilter
});

router.get('/', userController.getUsers)
    .get('/:userId', userController.getUser)
    .post('/', userController.createUser)
    .put('/:userId', 
        upload.single('photo'),
        userController.modifyUser)
    .delete('/:userId', userController.deleteUser);

module.exports = router