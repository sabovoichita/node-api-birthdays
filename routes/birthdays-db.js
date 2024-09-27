var express = require("express");
var router = express.Router();
var fs = require("fs");
var mysql = require("mysql");

const DATA_PATH = "data/structure.sql";

/**
 * IMPORTANT: add content type headers to be able to use req.body.*
  headers: {"Content-Type": "application/json"},
 */

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
<<<<<<<< HEAD:routes/recipes-db.js
  database: "recipes"
========
  database: "birthdays"
>>>>>>>> 6debc845ab2ade0ee4d639887c926c44b47c1e1c:routes/birthdays-db.js
});

function getConnection(res) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        console.error("connection failed", err);
        res.render("error", {
          status: err.status || 500,
          message: "Connection failed",
          error: {
            status: "Check API logs"
          }
          //error: err
        });
        reject("mysql connection failed", err);
        return;
      }
      resolve(connection);
    });
  });
}

/**
<<<<<<<< HEAD:routes/recipes-db.js
 * run this before first USAGE to create recipes TABLE
========
 * run this before first USAGE to create birthdays TABLE
>>>>>>>> 6debc845ab2ade0ee4d639887c926c44b47c1e1c:routes/birthdays-db.js
 */
router.get("/install", async function (req, res, next) {
  try {
    const connection = await getConnection(res);
    const sql = fs.readFileSync(DATA_PATH, "utf8");
    connection.query(sql, function (err, results) {
      if (err) {
        console.error("Install failed", err);
      }
      connection.release();
      res.redirect("/");
    });
  } catch (err) {}
});

/**
 *
 */
router.get("/", async function (req, res, next) {
  try {
    const connection = await getConnection(res);
<<<<<<<< HEAD:routes/recipes-db.js
    const sql = `SELECT id, title, image, ingredients, link FROM recipes`;
========
    const sql = `SELECT id, name, contact, age, url, dob FROM birthdays`;
>>>>>>>> 6debc845ab2ade0ee4d639887c926c44b47c1e1c:routes/birthdays-db.js
    connection.query(sql, function (err, results) {
      if (err) {
        console.error(err);
        connection.release();
        res.send(err);
        return;
      }
      connection.release();
      res.json(results);
    });
  } catch (err) {}
});

/**
 *
 */
router.post("/create", async function (req, res, next) {
<<<<<<<< HEAD:routes/recipes-db.js
  const title = req.body.title;
  const image = req.body.image;
  const ingredients = req.body.ingredients;
  const link = req.body.link;

  try {
    const connection = await getConnection(res);
    const sql = `INSERT INTO recipes (id, title, image, ingredients, link) VALUES (NULL, ?, ?, ?, ?);`;
    connection.query(sql, [title, image, ingredients, link], function (err, results) {
========
  const name = req.body.name;
  const contact = req.body.contact;
  const age = req.body.age;
  const url = req.body.url;
  const dob = req.body.dob;

  try {
    const connection = await getConnection(res);
    const sql = `INSERT INTO birthdays (id, name, contact, age, url, dob) VALUES (NULL, ?, ?, ?, ?);`;
    connection.query(sql, [name, contact, age, url, dob], function (err, results) {
>>>>>>>> 6debc845ab2ade0ee4d639887c926c44b47c1e1c:routes/birthdays-db.js
      if (err) throw err;
      const id = results.insertId;
      connection.release();
      res.json({
        success: true,
        id
      });
    });
  } catch (err) {}
});

/**
 *
 */
router.delete("/delete", async function (req, res, next) {
  const id = req.body.id;

  try {
    const connection = await getConnection(res);
<<<<<<<< HEAD:routes/recipes-db.js
    const sql = `DELETE FROM recipes WHERE id=?`;
========
    const sql = `DELETE FROM birthdays WHERE id=?`;
>>>>>>>> 6debc845ab2ade0ee4d639887c926c44b47c1e1c:routes/birthdays-db.js
    connection.query(sql, [id], function (err, results) {
      if (err) throw err;
      connection.release();
      res.json({ success: true });
    });
  } catch (err) {}
});

/**
 *
 */
router.put("/update", async function (req, res, next) {
  const id = req.body.id;
<<<<<<<< HEAD:routes/recipes-db.js
  const image = req.body.image;
  const ingredients = req.body.ingredients;
  const link = req.body.link;
  const title = req.body.title;

  try {
    const connection = await getConnection(res);
    const sql = `UPDATE recipes SET title=?, image=?, ingredients=?, link=? WHERE id=?`;
    connection.query(sql, [title, image, ingredients, link, id], function (err, results) {
========
  const name = req.body.name;
  const contact = req.body.contact;
  const age = req.body.age;
  const url = req.body.url;
  const dob = req.body.dob;

  try {
    const connection = await getConnection(res);
    const sql = `UPDATE birthdays SET name=?, contact=?, age=?, url=?,dob=? WHERE id=?`;
    connection.query(sql, [name, contact, age, url, dob, id], function (err, results) {
>>>>>>>> 6debc845ab2ade0ee4d639887c926c44b47c1e1c:routes/birthdays-db.js
      if (err) throw err;
      connection.release();
      res.json({ success: true });
    });
  } catch (err) {}
});

module.exports = router;
