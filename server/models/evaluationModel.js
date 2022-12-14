'use strict';
const pool = require("../database/db");
const promisePool = pool.promise();

// const getAllEvaluations = async (res) => {
//   try {
//     const [rows] = await promisePool.query("SELECT likes, dislikes FROM evaluation");
//     return rows;
//   } catch (e) {
//     res.status(500).send(e.message);
//     console.error("error", e.message);
//   }
// };

const getEvaluationById = async (res, postId) => {
    try {
      const [rows] = await promisePool.query("SELECT likes, dislikes FROM evaluation WHERE postId = ?", [postId]); //needs to be checked if corect
      return rows[0];
    } catch (e) {
      console.error("error", e.message);
      res.status(500).send(e.message);
    }
  };

  const addEvaluation = async (userId, postId, evaluation, res) => {
    try {
      const sql = "INSERT INTO evaluation VALUES (?, ?, ?, ?)"; //needs to be checked if corect
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
      const [rows] = await promisePool.query("DELETE FROM evaluation WHERE userId = ? and postId = ?", [userId, postId]);
      return rows;
    } catch (e) {
      console.error("error", e.message);
      res.status(500).send(e.message);
    }
  };
  
//   const updateEvaluationById = async (evaluation, res) => {
//     try {
//       console.log('modifying evaluation', evaluation);
//       const sql = 'UPDATE evaluation SET likes = ?, dislikes = ? WHERE userId = ? and postId = ?';
//       const values = [evaluation.likes, evaluation.dislikes, evaluation.userId, evaluation.postId];
//       const [rows] = await promisePool.query(sql, values);
//       return rows;
//     } catch (e) {
//       console.error("error", e.message);
//       res.status(500).send(e.message);
//     }
//   };

module.exports = {
//   getAllEvaluations,
  getEvaluationById,
  addEvaluation,
  deleteEvaluationById,
//   updateEvaluationById,
};