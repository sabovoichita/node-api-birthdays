var express = require("express");
var router = express.Router();
var fs = require("fs");

<<<<<<<< HEAD:routes/recipes-json.js
const DATA_PATH = "data/recipes.json";
========
const DATA_PATH = "data/birthdays.json";
>>>>>>>> 6debc845ab2ade0ee4d639887c926c44b47c1e1c:routes/birthdays-json.js

/**
 *
 */
router.get("/", function (req, res, next) {
  console.log("reading file %o", DATA_PATH);
<<<<<<<< HEAD:routes/recipes-json.js
  const recipes = getRecipes();
  res.json(recipes);
========
  const birthdays = getBirthdays();
  res.json(birthdays);
>>>>>>>> 6debc845ab2ade0ee4d639887c926c44b47c1e1c:routes/birthdays-json.js
});

/**
 *
 */
router.post("/create", function (req, res, next) {
  const name = req.body.name;
  const contact = req.body.contact;
  const age = req.body.age;
  const url = req.body.url;
  const dob = req.body.dob;

<<<<<<<< HEAD:routes/recipes-json.js
  const recipes = getRecipes();
  const id = Math.random().toString(36).substring(7) + new Date().getTime();

  recipes.push({
========
  const birthdays = getBirthdays();
  const id = Math.random().toString(36).substring(7) + new Date().getTime();

  birthdays.push({
>>>>>>>> 6debc845ab2ade0ee4d639887c926c44b47c1e1c:routes/birthdays-json.js
    id,
    name,
    contact,
    age,
    url,
    dob
  });

<<<<<<<< HEAD:routes/recipes-json.js
  setRecipes(recipes);
========
  setBirthdays(birthdays);
>>>>>>>> 6debc845ab2ade0ee4d639887c926c44b47c1e1c:routes/birthdays-json.js

  res.json({ success: true, id });
  res.status(201);
});

/**
 *
 */
router.delete("/delete", function (req, res, next) {
  const id = req.body.id;

<<<<<<<< HEAD:routes/recipes-json.js
  const recipes = getRecipes().filter(recipe => recipe.id != id);

  setRecipes(recipes);
========
  const birthdays = getBirthdays().filter(birthday => birthday.id != id);

  setBirthdays(birthdays);
>>>>>>>> 6debc845ab2ade0ee4d639887c926c44b47c1e1c:routes/birthdays-json.js

  res.json({ success: true });
});

/**
 *
 */
router.put("/update", function (req, res, next) {
  const id = req.body.id;
  const name = req.body.name;
  const contact = req.body.contact;
  const age = req.body.age;
  const url = req.body.url;
  const dob = req.body.dob;

<<<<<<<< HEAD:routes/recipes-json.js
  const recipes = getRecipes();

  const recipe = recipes.find(recipe => recipe.id == id);
  if (recipe) {
    recipe.promotion = promotion;
    recipe.members = members;
    recipe.name = name;
    recipe.url = url;
  }

  setRecipes(recipes);
========
  const birthdays = getBirthdays();

  const birthday = birthdays.find(birthday => birthday.id == id);
  if (birthday) {
    birthday.name = name;
    birthday.contact = contact;
    birthday.age = age;
    birthday.url = url;
    birthday.dob = dob;
  }

  setBirthdays(birthdays);
>>>>>>>> 6debc845ab2ade0ee4d639887c926c44b47c1e1c:routes/birthdays-json.js

  res.json({ success: true });
});

<<<<<<<< HEAD:routes/recipes-json.js
function getRecipes() {
========
function getBirthdays() {
>>>>>>>> 6debc845ab2ade0ee4d639887c926c44b47c1e1c:routes/birthdays-json.js
  const content = fs.readFileSync(DATA_PATH);
  return JSON.parse(content);
}

<<<<<<<< HEAD:routes/recipes-json.js
function setRecipes(recipes) {
  const content = JSON.stringify(recipes, null, 2);
========
function setBirthdays(birthdays) {
  const content = JSON.stringify(birthdays, null, 2);
>>>>>>>> 6debc845ab2ade0ee4d639887c926c44b47c1e1c:routes/birthdays-json.js
  fs.writeFileSync(DATA_PATH, content);
}

module.exports = router;
