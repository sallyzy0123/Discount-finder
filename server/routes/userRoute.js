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
      body("name").isLength({ min: 3 }).trim().escape(),
      body("email").isEmail().normalizeEmail(),
      body("passwd").isLength({ min: 8 }).trim(),
      userController.createUser
   )
    .put('/:userId', 
        upload.single('photo'),
        // body('username').isLength({min: 3}), 
        // body('email').isEmail(), 
        // body('password').isLength({min: 8}), 
        userController.modifyUser)
    .delete('/:userId', userController.deleteUser);

module.exports = router;
