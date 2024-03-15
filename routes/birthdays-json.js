var express = require("express");
var router = express.Router();
var fs = require("fs");

const DATA_PATH = "data/birthdays.json";

/**
 *
 */
router.get("/", function (req, res, next) {
  console.log("reading file %o", DATA_PATH);
  const birthdays = getBirthdays();
  res.json(birthdays);
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

  const birthdays = getBirthdays();
  const id = Math.random().toString(36).substring(7) + new Date().getTime();

  birthdays.push({
    id,
    name,
    contact,
    age,
    url,
    dob
  });

  setBirthdays(birthdays);

  res.json({ success: true, id });
  res.status(201);
});

/**
 *
 */
router.delete("/delete", function (req, res, next) {
  const id = req.body.id;

  const birthdays = getBirthdays().filter(birthday => birthday.id != id);

  setBirthdays(birthdays);

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

  res.json({ success: true });
});

function getBirthdays() {
  const content = fs.readFileSync(DATA_PATH);
  return JSON.parse(content);
}

function setBirthdays(birthdays) {
  const content = JSON.stringify(birthdays, null, 2);
  fs.writeFileSync(DATA_PATH, content);
}

module.exports = router;
