'use strict';
const express = require('express');
const router = express.Router()
const categoryController = require('../controllers/categoryController');

router.get('/', categoryController.getCategories)
    .get('/:categoryId', categoryController.getPostsByCategory)

module.exports = router