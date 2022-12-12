'use strict';
const express = require('express');
const router = express.Router()
const evaluationController = require('../controllers/evaluationController');

router.get('/:postId', evaluationController.getEvaluation) //not completed
.post('/:postId', evaluationController.createEvaluation)
.delete('/:postId', evaluationController.deleteEvaluation)
module.exports = router