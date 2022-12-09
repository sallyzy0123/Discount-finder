"use strict"
const pool = require("../database/db");
const promisePool = pool.promise();

const getCommentsByPostId = async (res, postId) => {
    try {
        const [rows] = await promisePool.
        query('select Comment.Date, Comment.Text, Username from Comment ' +
            'join Post ' +
            'on Post.PostId = Comment.PostId ' +
            'join User ' +
            'on User.UserId = Comment.UserId ' +
            'where Post.PostId like ? ' +
            'order by Date desc;',
            [postId]);
        return rows[0];
    } catch (e) {
        console.error("error", e.message);
        res.status(500).send(e.message);
    }
};

const addComment = async (comment, res) => {
    try {
        const sql = 'insert into ' +
            'comment(UserId, PostId, Text)' +
            'values (?, ?, ?, ?, ?, ?, ?, ?);';
        const values = [];
        const [result] = await promisePool.query(sql, values);
        return result.insertId;
    } catch (e) {
        console.error("error", e.message);
        res.status(500).send(e.message);
    }
};

const deleteCommentById = async (commentId, user, role, res) => {
    try {
        if (role === 0) {
            const [rows] = await promisePool.
            query('delete from comment where CommentId = ?', [commentId]);
            return rows;
        } else {
            const [rows] = await promisePool.
            query("delete from comment where CommentId = ? and user = ?", [commentId, user]);
            return rows;
        }
    } catch (e) {
        console.error("error", e.message);
        res.status(500).send(e.message);
    }
};

module.exports = {
    getCommentsByPostId,
    deleteCommentById
};