'use strict';
const express = require('express');
const router = express.Router()
const evaluationController = require('../controllers/evaluationController');
const passport = require("../utils/passport");

router.get('/:postId', evaluationController.getEvaluation)
    .post('/:postId/:userId',
        passport.authenticate('jwt', {session: false}),
        evaluationController.createEvaluation)
    .delete('/:postId/:userId',
        passport.authenticate('jwt', {session: false}),
        evaluationController.deleteEvaluation);

module.exports = router