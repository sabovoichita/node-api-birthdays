var express = require("express");
var router = express.Router();
var fs = require("fs");

const DATA_PATH = "data/recipes.json";

/**
 * GET all recipes
 */
router.get("/", function (req, res, next) {
  console.log("Reading file %o", DATA_PATH);
  const recipes = getRecipes();
  res.json(recipes);
});

/**
 * POST to create a new recipe
 */
router.post("/create", function (req, res, next) {
  const { title, image, alt, ingredients, link } = req.body; // Extract recipe data from request

  const recipes = getRecipes();
  const id = Math.random().toString(36).substring(7) + new Date().getTime(); // Generate unique ID for the recipe

  // Add new recipe with correct properties
  recipes.push({
    id,
    title,
    image,
    alt,
    ingredients,
    link
  });

  setRecipes(recipes); // Save updated recipes

  res.status(201).json({ success: true, id }); // Respond with success and the new recipe's ID
});

/**
 * DELETE a recipe by ID
 */
router.delete("/delete", function (req, res, next) {
  const { id } = req.body; // Extract recipe ID from the request body

  // Filter out the recipe that matches the provided ID
  const recipes = getRecipes().filter(recipe => recipe.id !== id);

  setRecipes(recipes); // Save the updated recipes list

  res.json({ success: true }); // Respond with success
});

/**
 * PUT to update a recipe by ID
 */
router.put("/update", function (req, res, next) {
  const { id, title, image, alt, ingredients, link } = req.body; // Extract data for update

  const recipes = getRecipes();

  // Find the recipe to update
  const recipe = recipes.find(recipe => recipe.id === id);
  if (recipe) {
    recipe.title = title;
    recipe.image = image;
    recipe.alt = alt;
    recipe.ingredients = ingredients;
    recipe.link = link;
  }

  setRecipes(recipes); // Save the updated recipe

  res.json({ success: true }); // Respond with success
});

/**
 * Helper function to get all recipes
 */
function getRecipes() {
  const content = fs.readFileSync(DATA_PATH);
  return JSON.parse(content);
}

/**
 * Helper function to save recipes
 */
function setRecipes(recipes) {
  const content = JSON.stringify(recipes, null, 2); // Pretty print with 2 spaces for formatting
  fs.writeFileSync(DATA_PATH, content);
}

module.exports = router;
