// Router
"use strict";
const express = require('express');
const router = express.Router();
const bookmarkController = require("../controllers/bookmarkController");

router.get('/', bookmarkController.getBookmarks)
    .get('/:userId', bookmarkController.getBookmarksByUserId)
    .post('/', bookmarkController.addBookmark)
    .delete('/:userId', bookmarkController.deleteBookmark);

module.exports = router;