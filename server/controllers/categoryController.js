"use strict";
const categoryModel = require("../models/categoryModel");

const getCategories = async (req, res) => {
    const categories = await categoryModel.getAllCategories(res);
    res.json(categories);
};

const getCategory = async (req, res) => {
    const category = await categoryModel.getCategoryById(res, req.params.categoryId);
    if (category) {

        res.json(category);
    } else {
        res.sendStatus(404);
    }
};

const getPostsByCategory = async (req, res) => {
    const category = await categoryModel.getPostsByCategory(res, req.params.categoryId);
    if (category) {

        res.json(category);
    } else {
        res.sendStatus(404);
    }
};

module.exports = {
    getCategories,
    getCategory,
    getPostsByCategory
 };