"use strict"
const pool = require("../database/db");
const promisePool = pool.promise();

const getCommentsByPostId = async (res, postId) => {
    try {
        const sql = 'select comment.Date, comment.Text, user.Username, user.Photo ' +
            'from comment join user on comment.UserId = user.UserId where PostId = ? order by Date desc';
        const values = [postId];
        const [rows] = await promisePool.query(sql, values);
        console.log("model: " + postId);
        return rows;
    } catch (e) {
        console.error("error", e.message);
        res.status(500).send(e.message);
    }
};

// const addComment = async (comment, user, postId, res) => {
//     try {
//         const date = new Date().toJSON().slice(0, 10);
//         const sql = 'insert into comment values (null, ?, ?, ?, ?)';
//         const values = [user.UserId, post.PostId, date, comment.Text];
//         const [result] = await promisePool.query(sql, values);
//         return result.insertId;
//     } catch (e) {
//         console.error("error", e.message);
//         res.status(500).send(e.message);
//     }
// };

const addComment = async (postId, comment, res) => {
    try {
        const date = new Date().toJSON().slice(0, 10);
        const sql = 'insert into comment values (null, ?, ?, ?, ?)';
        const values = [comment.UserId, postId, date, comment.Text];
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
            query('delete from comment where CommentId = ?',
                [commentId]);
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
    addComment,
    deleteCommentById
};