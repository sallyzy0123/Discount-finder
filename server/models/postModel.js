"use strict"
const pool = require("../database/db");
const promisePool = pool.promise();

const getAllPosts = async (res) => {
    try {
        const [rows] = await promisePool.
        query('select * from post');
        return rows;
    } catch (e) {
        console.error("error", e.message);
        res.status(500).send(e.message);
    }
};

const getPostById = async (res, postId) => {
    try {
        const [rows] = await promisePool.
        query('select PostId, post.UserId, Name, Description, Location, Picture, OriginalPrice, DiscountedPrice, CategoryName, ' +
            'post.CategoryId, Date, Username, Photo ' +
            'from post join category on post.CategoryId = category.CategoryId ' +
            'join user on post.UserId = user.UserId ' +
            'where PostId like ?',
            [postId]);
        return rows[0];
    } catch (e) {
        console.error("error", e.message);
        res.status(500).send(e.message);
    }
};

// const getPostsByUserId =async (res, userId) => {
//     try {
//         const sql = 'select Name, Description, Location, Picture, OriginalPrice, DiscountedPrice, CategoryName, ' +
//             'post.CategoryId, Date, Username, Photo ' +
//             'from post join category on post.CategoryId = category.CategoryId ' +
//             'join user on post.UserId = user.UserId ' +
//             'where post.UserId like ?';
//         const [rows] = await promisePool.query(sql, [userId]);
//         console.log('getting posts by user', rows);
//         return rows;
//       } catch (e) {
//         console.error("error", e.message);
//         res.status(500).send(e.message);
//       }
// }
// new
const getPostsByUserId =async (res, userId) => {
    try {
        const sql = 'select user.Username, user.Photo, user.Email, Name, Description, Location, Picture, OriginalPrice, ' +
            'DiscountedPrice, CategoryName, ' +
            'post.CategoryId, Date, Username, Photo ' +
            'from post join category on post.CategoryId = category.CategoryId ' +
            'join user on post.UserId = user.UserId ' +
            'where post.UserId = ?';
        const [rows] = await promisePool.query(sql, [userId]);
        console.log('getting posts by user', rows);
        return rows;
      } catch (e) {
        console.error("error", e.message);
        res.status(500).send(e.message);
      }
}

const addPost = async (post, userId, res) => {
    try {
        const date = new Date().toJSON().slice(0, 10);
        const sql = 'insert into post values (null, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const values =
            [userId, post.CategoryId, post.Name, post.Description, post.Location, post.Picture, post.OriginalPrice,
                post.DiscountedPrice, date];
        console.log(date);
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
            const values = [post.CategoryId, post.Name, post.Description, post.Location, post.Picture,
                post.OriginalPrice, post.DiscountedPrice, post.PostId];
            const [rows] = await promisePool.query(sql, values)
            return rows;
        } else {
            const sql = 'update Post set ' +
                'CategoryId = ?, Name = ?, Description = ?, Location = ?, Picture = ?, OriginalPrice = ?, DiscountedPrice = ?' +
                'where PostId = ? and userId = ?';
            const values = [post.CategoryId, post.name, post.description, post.location, post.Picture,
                post.OriginalPrice, post.DiscountedPrice, post.PostId, user.UserId];
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
    getPostsByUserId,   
    addPost,
    deletePostById,
    updatePostById
};