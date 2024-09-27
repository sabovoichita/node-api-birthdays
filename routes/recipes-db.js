var express = require("express");
var router = express.Router();
var fs = require("fs");
var mysql = require("mysql");

const DATA_PATH = "data/structure.sql"; // Path to your SQL schema

/**
 * IMPORTANT: Add content type headers to be able to use req.body.*
 * headers: {"Content-Type": "application/json"}
 */

// Create MySQL connection pool
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "recipes" // Updated to use the 'recipes' database
});

// Helper function to get MySQL connection from the pool
function getConnection(res) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        console.error("Connection failed", err);
        res.status(500).json({ message: "Connection failed", error: err });
        reject("MySQL connection failed", err);
        return;
      }
      resolve(connection);
    });
  });
}

/**
 * Run this before first USAGE to create the 'recipes' TABLE
 */
router.get("/install", async function (req, res, next) {
  try {
    const connection = await getConnection(res);
    const sql = fs.readFileSync(DATA_PATH, "utf8"); // Reading SQL schema from file
    connection.query(sql, function (err, results) {
      if (err) {
        console.error("Install failed", err);
        res.status(500).json({ error: err });
        connection.release();
        return;
      }
      connection.release();
      res.status(200).json({ message: "Database installed successfully!" });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
});

/**
 * GET all recipes
 */
router.get("/", async function (req, res, next) {
  try {
    const connection = await getConnection(res);
    const sql = `SELECT id, title, image, ingredients, link FROM recipes`; // Select recipes data
    connection.query(sql, function (err, results) {
      if (err) {
        console.error(err);
        connection.release();
        res.status(500).json({ error: err });
        return;
      }
      connection.release();
      res.status(200).json(results);
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
});

/**
 * POST to create a new recipe
 */
router.post("/create", async function (req, res, next) {
  const { title, image, ingredients, link } = req.body; // Extracting recipe data from request body

  try {
    const connection = await getConnection(res);
    const sql = `INSERT INTO recipes (id, title, image, ingredients, link) VALUES (NULL, ?, ?, ?, ?);`;
    connection.query(sql, [title, image, ingredients, link], function (err, results) {
      if (err) {
        console.error(err);
        connection.release();
        res.status(500).json({ error: err });
        return;
      }
      const id = results.insertId; // Get the newly inserted recipe ID
      connection.release();
      res.status(201).json({ success: true, id });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
});

/**
 * DELETE a recipe by ID
 */
router.delete("/delete", async function (req, res, next) {
  const { id } = req.body; // Get the recipe ID to delete

  try {
    const connection = await getConnection(res);
    const sql = `DELETE FROM recipes WHERE id = ?`;
    connection.query(sql, [id], function (err, results) {
      if (err) {
        console.error(err);
        connection.release();
        res.status(500).json({ error: err });
        return;
      }
      connection.release();
      res.status(200).json({ success: true });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
});

/**
 * PUT to update a recipe by ID
 */
router.put("/update", async function (req, res, next) {
  const { id, title, image, ingredients, link } = req.body; // Get the recipe data to update

  try {
    const connection = await getConnection(res);
    const sql = `UPDATE recipes SET title = ?, image = ?, ingredients = ?, link = ? WHERE id = ?`;
    connection.query(sql, [title, image, ingredients, link, id], function (err, results) {
      if (err) {
        console.error(err);
        connection.release();
        res.status(500).json({ error: err });
        return;
      }
      connection.release();
      res.status(200).json({ success: true });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
});

module.exports = router;
