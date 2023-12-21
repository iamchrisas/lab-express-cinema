// ℹ️ Gets access to environment variables/settings
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
const express = require("express");
const app = express();

// Handles the handlebars
const hbs = require("hbs");
app.set("view engine", "hbs");
app.set("views", __dirname + "/views");

// ℹ️ This function is getting exported from the config folder. It runs most middlewares
require("./config")(app);

// default value for title local
const projectName = "lab-express-cinema";
const capitalized = (string) =>
  string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)} - Generated with Ironlauncher`;

const indexRouter = require("./routes/index");
app.use("/", indexRouter);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
