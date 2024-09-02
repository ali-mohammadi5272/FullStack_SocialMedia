const express = require("express");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();

app.use(
  express.json(),
  express.urlencoded({ extended: false }),
  express.static(path.join(process.cwd(), "public"))
);

module.exports = app;
