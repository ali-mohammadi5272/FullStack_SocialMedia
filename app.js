const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();

app.use(
  cors(),
  helmet(),
  express.json(),
  express.urlencoded({ extended: false }),
  express.static(path.join(process.cwd(), "public")),
  cookieParser(process.env.COOKIE_SECRET_KEY)
);

module.exports = app;
