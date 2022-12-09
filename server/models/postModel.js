"use strict"
const pool = require("../database/db");
const promisePool = pool.promise();

const getAllPosts = async (res) => {
    try {
        const [rows] = await promisePool.
        query('select Name, CategoryId, Location, Picture, OriginalPrice, DiscountedPrice from post');
        return rows;
    } catch (e) {
        console.error("error", e.message);
        res.status(500).send(e.message);
    }
};

const getPostById = async (res, postId) => {
    try {
        const [rows] = await promisePool.
        query('select Name, Description, Location, Picture, OriginalPrice, DiscountedPrice, CategoryName ' +
            'from post join category on post.CategoryId = category.CategoryId ' +
            'where PostId like ?',
            [postId]);
        return rows[0];
    } catch (e) {
        console.error("error", e.message);
        res.status(500).send(e.message);
    }
};

const addPost = async (post, res) => {
    try {
        const sql = 'insert into post values (null, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const values = [];
        const [result] = await promisePool.query(sql, values);
        return result.insertId;
    } catch (e) {
        console.error("error", e.message);
        res.status(500).send(e.message);
    }
};

const deletePostById = async (postId, user, role, res) => {
    try {
        if (role === 0) {
            const [rows] = await promisePool.
            query('delete from post where PostId = ?', [postId]);
            return rows;
        } else {
            const [rows] = await promisePool.
            query("delete from Post where PostId = ? and user = ?", [postId, user]);
            return rows;
        }
    } catch (e) {
        console.error("error", e.message);
        res.status(500).send(e.message);
    }
};

const updatePostById = async (post, user, role, res) => {
    try {
        console.log('Modifying post:', post);
        if (role === 0) {
            const sql = 'update Post set ' +
                'CategoryId = ?, Name = ?, Description = ?, Location = ?, Picture = ?, OriginalPrice = ?, DiscountedPrice = ?' +
                'where PostId = ?';
            const values = [post.categoryId, post.name, post.description, post.location, post.picture, post.origPrice, post.discPrice, post.id];
            const [rows] = await promisePool.query(sql, values)
            return rows;
        } else {
            const sql = 'update Post set ' +
                'CategoryId = ?, Name = ?, Description = ?, Location = ?, Picture = ?, OriginalPrice = ?, DiscountedPrice = ?' +
                'where PostId = ? and userId = ?';
            const values = [post.categoryId, post.name, post.description, post.location, post.picture, post.origPrice, post.discPrice, post.id, user.userId];
            const [rows] = await promisePool.query(sql, values);
            return rows;
        }
    } catch (e) {
        console.error("error", e.message);
        res.status(500).send(e.message);
    }
};

module.exports = {
    getAllPosts,
    getPostById,
    addPost,
    deletePostById,
    updatePostById
};