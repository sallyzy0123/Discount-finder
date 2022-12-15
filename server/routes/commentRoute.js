'use strict';
const express = require("express");
const router = express.Router();
// const {body} = require('express-validator');

const commentController = require('../controllers/commentController');
const passport = require("../utils/passport");

router.get('/:postId', commentController.getComments)
    .post('/:postId',
        passport.authenticate('jwt', {session: false}),
        commentController.createComment)
    // .post('/',
    // body('name').isLength({min: 3}).trim().escape(),
    // body('description').isDate(),
    // body('category').isFloat({min: 0.1, max: 30}),
    // catController.createCat)
    .delete('/:postId/:commentId',
        passport.authenticate('jwt', {session: false}),
        commentController.deleteComment);

module.exports = router;