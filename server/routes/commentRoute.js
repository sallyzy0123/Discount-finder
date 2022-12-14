'use strict';
const express = require("express");
const router = express.Router();
// const {body} = require('express-validator');

const commentController = require('../controllers/commentController');

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

// const upload = multer({ dest: 'uploads/', fileFilter});

router.get('/:postId', commentController.getComments)
    .post('/:postId', commentController.createComment)
    // .post('/',
    // body('name').isLength({min: 3}).trim().escape(),
    // body('description').isDate(),
    // body('category').isFloat({min: 0.1, max: 30}),
    // catController.createCat)
    .delete('/:postId/:commentId', commentController.deleteComment);

module.exports = router;