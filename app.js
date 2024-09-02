const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const helmet = require("helmet");

dotenv.config();

const app = express();

app.use(
  helmet(),
  express.json(),
  express.urlencoded({ extended: false }),
  express.static(path.join(process.cwd(), "public"))
);

module.exports = app;
