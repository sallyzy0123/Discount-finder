'use strict';
const commentModel = require('../models/commentModel');
// const {validationResult} = require('express-validator');
// const {ignore} = require("nodemon/lib/rules");
// const { makeThumbnail, getCoordinates } = require("../utils/image");

const getComments = async (req, res) => {
    const comments = await commentModel.getCommentsByPostId(res, req.params.postId);
    if (comments) {
        res.json(comments);
    } else {
        res.sendStatus(404);
    }
};

const createComment = async (req, res) => {
    console.log('Creating a new comment:', req.body);
    const newComment = req.body;
    const result = await commentModel.addComment(newComment, req.params.postId, req.user.UserId, res);
    res.status(201).json({commentId: result});
};

// TODO: delete post by checking the role of logged in user

// const deleteComment = async (req, res) => {
//     const result = await postModel.deletePostById(req.params.postId, req.user.userId, req.user.role, res);
//     console.log('post deleted', result)
//     if (result.affectedRows > 0) {
//         res.json({message: 'post deleted'});
//     } else {
//         res.status(404).json({message: 'post delete failed'});
//     }
// };

const deleteComment = async (req, res) => {
    const result = await commentModel.deleteCommentById(req.params.postId, res);
    console.log('comment deleted', result)
    if (result.affectedRows > 0) {
        res.json({message: 'post deleted'});
    } else {
        res.status(404).json({message: 'post delete failed'});
    }
};

module.exports = {
    getComments,
    createComment,
    deleteComment
};