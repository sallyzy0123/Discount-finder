'use strict';
const pool = require("../database/db");
const promisePool = pool.promise();

const getAllEvaluations = async (res) => {
  try {
    const [rows] = await promisePool.query("SELECT likes, dislikes FROM Evaluation");
    return rows;
  } catch (e) {
    res.status(500).send(e.message);
    console.error("error", e.message);
  }
};

const getEvaluationById = async (res, userId) => {
    try {
      const [rows] = await promisePool.query("SELECT userId, username, email, password, photo, role FROM User WHERE userId = ?", [userId]); //the query needs to be changed
      return rows[0];
    } catch (e) {
      console.error("error", e.message);
      res.status(500).send(e.message);
    }
  };

  const addEvaluation = async (evaluation, res) => {
    try {
      const sql = "INSERT INTO evaluation VALUES (?, ?, null, null)"; //needs to be checked if corect
      const values =[evaluation.likes, evaluation.dislikes];
      const [result] = await promisePool.query(sql, values);
      return result.insertId;
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
  
  const updateUserById = async (user, res) => {
    try {
      console.log('modifying user', user);
      const sql = 'UPDATE user SET username = ?, email = ?, password = ?, photo = ?, role = ? WHERE userId = ?';
      const values = [user.username, user.email, user.password, user.photo, user.role, user.userId];
      const [rows] = await promisePool.query(sql, values);
      return rows;
    } catch (e) {
      console.error("error", e.message);
      res.status(500).send(e.message);
    }
  };

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  deleteUserById,
  updateUserById,
};