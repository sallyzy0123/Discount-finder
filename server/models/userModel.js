'use strict';
const pool = require("../database/db");
const promisePool = pool.promise();

const getAllUsers = async (res) => {
  try {
    const [rows] = await promisePool.query("SELECT userId, username, email, password, photo, role FROM User");
    return rows;
  } catch (e) {
    res.status(500).send(e.message);
    console.error("error", e.message);
  }
};

const getUserById = async (res, userId) => {
    try {
      const [rows] = await promisePool.query("SELECT userId, username, email, password, photo, role FROM User WHERE userId = ?", [userId]);
      return rows[0];
    } catch (e) {
      console.error("error", e.message);
      res.status(500).send(e.message);
    }
  };

  // const getUserLogin = async (user) => {
  //   try {
  //     console.log('getUserLogin', user);
  //     const [rows] = await promisePool.execute(
  //         'SELECT * FROM user WHERE email = ?;',
  //         user);
  //     return rows;
  //   } catch (e) {
  //     console.error("error", e.message);
  //     res.status(500).send(e.message);
  //   }
  // };

//     const getUserLogin = async (user) => {
//     const sql = 'SELECT * FROM user WHERE email = ?';
//     const [rows] = await promisePool.query(sql, [user]);
//     return rows.length > 0 ? rows[0] : null;
// };

  const getUserByEmail = async (email) => {
    const sql = 'SELECT * FROM user WHERE email = ?';
    const [rows] = await promisePool.query(sql, [email]);
    return rows.length > 0 ? rows[0] : null;
};

  const addUser = async (user, res) => {
    try {
      const sql = "INSERT INTO user VALUES (null, ?, ?, ?, ?, ?)";
      const values =[user.username, user.email, user.password, user.photo ,user.role];
      const [result] = await promisePool.query(sql, values);
      return result.insertId;
    } catch (e) {
      console.error("error", e.message);
      res.status(500).send(e.message);
    }
  };
  
  const deleteUserById = async (userId, res) => {
    try {
      const [rows] = await promisePool.query("DELETE FROM user WHERE userId = ?", [userId]);
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
  // getUserLogin,
  getUserByEmail,
  addUser,
  deleteUserById,
  updateUserById,
};