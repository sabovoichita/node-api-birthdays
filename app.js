var createError = require("http-errors");
var express = require("express");
var cors = require("cors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

// Route imports
var indexRouter = require("./routes/index");
var recipesDBRouter = require("./routes/recipes-db");
var recipesJSONRouter = require("./routes/recipes-json");

var app = express();

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

// Enable CORS for all origins
app.use(cors({ origin: "*" }));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Main routes setup
app.use("/", indexRouter); // Handles root path
app.use("/recipes", recipesDBRouter); // Handles database-related operations (MySQL)
app.use("/recipes-json", recipesJSONRouter); // Handles JSON file-based recipes

// Simulate some processing delay
function processingSimulate(req, res, next) {
  const wait = 500 + Math.floor(Math.random() * 11) * 100;
  setTimeout(() => {
    console.log("processing << exit");
    next();
  }, wait);
}
app.use("/recipes-json", processingSimulate, recipesJSONRouter);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  // Provide error details in development environment
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
