const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(express.json(), express.urlencoded({ extended: false }));

module.exports = app;
