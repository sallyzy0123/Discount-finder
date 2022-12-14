"use strict";
const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const multer = require('multer');
const userController = require("../controllers/userController");

const upload = multer({ dest: 'uploads/'
// , fileFilter
});

router
   .get("/", userController.getUsers)
   .get("/token", userController.checkToken)
   .get("/:userId", userController.getUser)
   .post(
      "/",
      body('username').isLength({ min: 3 }).trim().escape(),
      body('email').isEmail().normalizeEmail(),
      body('password').isLength({ min: 8 }).trim(),
      userController.createUser
   )
    .put('/:userId', 
        upload.single('photo'),
        body('username').isLength({ min: 3 }).trim().escape(),
        body('email').isEmail().normalizeEmail(),
        body('password').isLength({ min: 8 }).trim(),
        userController.modifyUser)
    .delete('/:userId', userController.deleteUser);

module.exports = router;
