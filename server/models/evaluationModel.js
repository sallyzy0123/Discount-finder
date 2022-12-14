'use strict';
const pool = require("../database/db");
const promisePool = pool.promise();

const getEvaluationById = async (res, postId) => {
  try {
    const [rows] = await promisePool.query("SELECT likes, dislikes FROM evaluation WHERE postId = ?",
        [postId]);
    return rows;
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};

const addEvaluation = async (userId, postId, evaluation, res) => {
  try {
    const sql = "INSERT INTO evaluation VALUES (?, ?, ?, ?)";
    const values =[evaluation.likes, evaluation.dislikes, userId, postId];
    const [result] = await promisePool.query(sql, values);
    return result;
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};

const deleteEvaluationById = async (userId, postId, res) => {
  try {
    const [rows] = await promisePool.query("DELETE FROM evaluation WHERE userId = ? and postId = ?",
        [userId, postId]);
    return rows;
  } catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};

module.exports = {
  getEvaluationById,
  addEvaluation,
  deleteEvaluationById,
};