"use strict";
const userModel = require("../models/userModel");

const getUsers = async (req, res) => {
    const users = await userModel.getAllUsers(res);
    res.json(users);
};

const getUser = async (req, res) => {
    const user = await userModel.getUserById(res, req.params.userId);
    if (user) {

        res.json(user);
    } else {
        res.sendStatus(404);
    }
};

const createUser = async (req, res) => {
    console.log('creating new user:', req.body);
    const newUser = req.body;
    const result = await userModel.addUser(newUser, res);
    res.status(201).json({userId: result});
};

const modifyUser = async (req, res) => {
    const user = req.body;
    user.photo = req.file.filename;
    if(req.params.userId) {
        user.userId = req.params.userId;
    }
    const result = await userModel.updateUserById(user, res);
    console.log("controller here", user);
    if (result.affectedRows > 0) {
        res.json({message: 'user updated ' + user.userId});
    } else  {
        res.status(404).json({message: 'no changes made'});
    }
};
const deleteUser = async (req, res) => {
    const result =  await userModel.deleteUserById(req.params.userId, res);
    console.log ('user deleted', result);
    if (result.affectedRows > 0) {
        res.json({message: 'user deleted'});
    } else  {
        res.status(404).json({message: 'user was already deleted'});
    }
};

module.exports = {
   getUser,
   getUsers,
   modifyUser,
   createUser,
   deleteUser,
};
