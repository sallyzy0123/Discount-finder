'use strict';
const express = require('express');
const router = express.Router()
const evaluationController = require('../controllers/evaluationController');

router.get('/:postId', evaluationController.getEvaluation)
    .post('/:postId/:userId', evaluationController.createEvaluation)
    .delete('/:postId/:userId', evaluationController.deleteEvaluation);

module.exports = router