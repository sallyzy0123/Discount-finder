'use strict';
const pool = require("../database/db");
const promisePool = pool.promise();

const getAllCategories = async (res) => {
  try {
    const [rows] = await promisePool.query("SELECT categoryId, categoryName FROM Category");
    return rows;
  } catch (e) {
    res.status(500).send(e.message);
    console.error("error", e.message);
  }
};

const getCategoryById = async (res, categoryId) => {
    try {
      const [rows] = await promisePool.query("SELECT categoryId, categoryName FROM Category WHERE categoryId = ?", [categoryId]);
      return rows[0];
    } catch (e) {
      console.error("error", e.message);
      res.status(500).send(e.message);
    }
  };

  module.exports = {
    getAllCategories,
    getCategoryById,
  };
