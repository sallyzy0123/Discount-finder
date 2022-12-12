"use strict";
const pool = require("../database/db");
const promisePool = pool.promise();

const getAllBookmarks = async (res) => {
    try {
      const sql = 'SELECT Name, CategoryId, Location, Picture, OriginalPrice, DiscountedPrice from Post join bookmarks on Post.PostId = bookmarks.PostId join User on bookmarks.UserId = User.UserId;';
      const [rows] = await promisePool.query(sql);
      return rows;
    } catch (e) {
      console.error("error", e.message);
      res.status(500).send(e.message);
    }
};

const getBookmarksByUserId = async (res, userId) => {
    try {
        const sql = 'SELECT bookmarks.PostId, bookmarks.UserId, Post.Name, Post.Location, Post.Picture, Post.OriginalPrice, Post.DiscountedPrice FROM Post,bookmarks WHERE Post.PostId = bookmarks.PostId AND bookmarks.UserId = ?';
        const [rows] = await promisePool.query(sql, [userId]);
        console.log('getting bookmark', rows);
        return rows;
      } catch (e) {
        console.error("error", e.message);
        res.status(500).send(e.message);
      }
};

const addBookmarkByUserId = async (PostId, UserId, res) => {
  try {
    const sql = 'insert into bookmarks values (?, ?);';
    const values = [UserId, PostId];
    const [result] = await promisePool.query(sql, values);
    return result.insertId;
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
}
const deleteBookmarkByUserId = async (PostId, UserId, res) => {
  try {
    const [rows] =
      await promisePool.query("DELETE FROM bookmarks WHERE PostId = ? AND UserId = ?", 
          [UserId, PostId]);
    return rows;
  } catch (e) {
    console.error('error', e.message);
    res.status(500).send(e.message);
  }
};
  
module.exports = {
    getAllBookmarks,
    getBookmarksByUserId,
    addBookmarkByUserId,
    deleteBookmarkByUserId
};