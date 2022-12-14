'use strict';
const postModel = require('../models/postModel');
// const {validationResult} = require('express-validator');
// const {ignore} = require("nodemon/lib/rules");
// const { makeThumbnail, getCoordinates } = require("../utils/image");

const getPosts = async (req, res) => {
    const posts = await postModel.getAllPosts();
    res.json(posts);
};

const getPost = async (req, res) => {
    // chooses one object of an array with matching Id
    const post = await postModel.getPostById(res, req.params.postId);
    if (post) {
        res.json(post);
    } else {
        res.sendStatus(404);
    }
};

const createPost = async (req, res) => {
    console.log('Creating a new post:', req.body);
    const newPost = req.body;
    newPost.Picture = req.file.filename;
    console.log('Creating a new post:', newPost);
    const result = await postModel.addPost(newPost, res);
    res.status(201).json({postId: result});
};

// TODO: delete post by checking the role of logged in user

// const deletePost = async (req, res) => {
//     const result = await postModel.deletePostById(req.params.postId, req.user.userId, req.user.role, res);
//     console.log('post deleted', result)
//     if (result.affectedRows > 0) {
//         res.json({message: 'post deleted'});
//     } else {
//         res.status(404).json({message: 'post delete failed'});
//     }
// };

const deletePost = async (req, res) => {
    const result = await postModel.deletePostById(req.params.postId, res);
    console.log('post deleted', result)
    if (result.affectedRows > 0) {
        res.json({message: 'post deleted'});
    } else {
        res.status(404).json({message: 'post delete failed'});
    }
};

// TODO: delete post by checking the role of logged in user
// const modifyPost = async (req, res) => {
//     const post = req.body;
//     if (req.params.postId) {
//         post.id = req.params.postId;
//     }
//     const result = await postModel.updatePostById(post, req.user.userId, req.user.role, res);
//     if (result.affectedRows > 0) {
//         res.json({message: 'post modified', postId: post.id});
//     } else {
//         res.status(404).json({message: 'post was not changed'});
//     }
// };

const modifyPost = async (req, res) => {
    const post = req.body;
    if (req.params.postId) {
        post.PostId = req.params.postId;
    }
    const result = await postModel.updatePostById(post, res);
    if (result.affectedRows > 0) {
        res.json({message: 'post modified', postId: post.PostId});
    } else {
        res.status(404).json({message: 'post was not changed'});
    }
};

module.exports = {
    getPosts,
    getPost,
    createPost,
    deletePost,
    modifyPost
};