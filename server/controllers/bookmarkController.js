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
  // const bookmark = ?;
  // bookmark.UserId = ?;
  // bookmark.PostId = ?;
  // console.log('creating a new bookmark:', bookmark);
  // const bookmarkInfo = await bookmarkModel.addBookmarkByUserId(bookmark.PostId, bookmark.UserId);
  // res.status(201).json({message:'bookmark added', bookmark})
  // console.log('validation errors', errors);
  // res.status(400).json({message: 'bookmark add failed',
  //                       errors: errors.array()});
};

// TODO
const deleteBookmark = async(req, res) => {
  // don't know what is this postid
  const result = await bookmarkModel.deleteBookmarkByUserId(PostId, req.params.userId, res);
  console.log('bookmark removed by user', result);
  if (result.affectedRows > 0) {
    res.json({message:'bookmark removed'})
  } else {
    res.status(401).json({message: 'bookmark remove failed'});
  }
}

module.exports = {
    getBookmarks,
    getBookmarksByUserId,
    addBookmark,
    deleteBookmark
};