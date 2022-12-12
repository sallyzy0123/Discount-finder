// Controller
"use strict";
const bookmarkModel = require("../models/bookmarkModel");
// const bookmarks = bookmarkModel.bookmarks;

const getBookmarks = async (req, res) => {
  const bookmarks = await bookmarkModel.getAllBookmarks(res);
  res.json(bookmarks);
};

const getBookmarksByUserId = async (req, res) => {
  const bookmark = await bookmarkModel.getBookmarksByUserId(res, req.params.userId);
  if (bookmark) {
    res.json(bookmark);
  } else {
    res.sendStatus(404);
  }
};

const addBookmark = async (req, res) => {
  // don't know where to get the userId and postId
  // also need the error handle
  try {
    const bookmark = req.body;
    console.log(req.body);
    bookmark.UserId = req.body.UserId;
    bookmark.PostId = req.body.PostId;
    console.log('creating a new bookmark:', bookmark);
    const bookmarkInfo = await bookmarkModel.addBookmarkByUserId(bookmark.PostId, bookmark.UserId);
    res.status(201).json({message:'bookmark added', bookmark})
  } catch {
    console.log('validation errors', errors);
    res.status(400).json({message: 'bookmark add failed',
                          errors: errors.array()});
  }
  // as long as the data in JSON likes "{
    // "UserId": 2,
    // "PostId": 2
    // }" this addBookmark works
  
};

// need to check
const deleteBookmark = async(req, res) => {
  // don't know what is this postid
  const PostId = req.body.PostId;
  const result = await bookmarkModel.deleteBookmarkByUserId(req.params.userId, PostId, res);
  console.log('bookmark removed by user', result);
  if (result.affectedRows > 0) {
    res.json({message:'bookmark removed'})
  } else {
    res.status(401).json({message: 'bookmark remove failed'});
  }
  // now put /bookmark/2 and JSON {"PostId": 2}
  // makes deleteBookmark works
  // but the postId should be from other place.
}

module.exports = {
    getBookmarks,
    getBookmarksByUserId,
    addBookmark,
    deleteBookmark
};