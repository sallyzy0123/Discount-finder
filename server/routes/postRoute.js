'use strict';
const express = require("express");
const router = express.Router();
const multer = require('multer');
// const {body} = require('express-validator');

const postController = require('../controllers/postController');
const passport = require("../utils/passport");

// const fileFilter = (req, file, cb) => {
//     // The function should call `cb` with a boolean
//     // to indicate if the file should be accepted
//     const acceptedTypes = ['image/jpeg', 'image/png', 'image/gif'];
//     if (acceptedTypes.includes(file.mimetype)) {
//         // To accept the file pass `true`, like so:
//         cb(null, true);
//     } else {
//         // To reject this file pass `false`, like so:
//         cb(null, false);
//     }
// };

const upload = multer({ dest: 'uploads/'
// , fileFilter
});

router.get('/', postController.getPosts)
    .get('/:postId', postController.getPost)
    .get('/user/:userId', postController.getPostsByUserId)
    .post('/', passport.authenticate('jwt', {session: false}),
        upload.single('Picture'),
        postController.createPost)
    .put('/:postId', passport.authenticate('jwt', {session: false}),
        upload.single('Picture'),
        postController.modifyPost)
    .delete('/:postId', postController.deletePost);

module.exports = router;