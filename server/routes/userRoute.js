'use strict';
const express = require('express');
const router = express.Router()
const multer = require('multer');
// const {body} = require('express-validator');
const userController = require('../controllers/userController');

// const fileFilter = (req, file, cb) => {
//     // The function should call `cb` with a boolean
//     // to indicate if the file should be accepted
//     const acceptedTypes = ['image/jpeg', 'image/png', 'image/gif'];
//     if (acceptedTypes.includes(file.mimetype)) {
//       // To accept the file pass `true`, like so:
//       cb(null, true);
//     } else {
//       // To reject this file pass `false`, like so:
//       cb(null, false);
//     }
//   };

const upload = multer({ dest: 'uploads/'
// , fileFilter
});

router.get('/', userController.getUsers)
    .get('/:userId', userController.getUser)
    .post('/', userController.createUser)
    .put('/:userId', 
        upload.single('photo'),
        // body('username').isLength({min: 3}), 
        // body('email').isEmail(), 
        // body('password').isLength({min: 8}), 
        userController.modifyUser)
    .delete('/:userId', userController.deleteUser);

module.exports = router