const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

dotenv.config();

const generateAccessToken = (payload) => {
  const { ACCESS_TOKEN_SECRET_KEY, ACCESS_TOKEN_EXPIRES_TIME } = process.env;

  const token = jwt.sign(payload, ACCESS_TOKEN_SECRET_KEY, {
    expiresIn: ACCESS_TOKEN_EXPIRES_TIME,
  });
  return token;
};

module.exports = {
  generateAccessToken,
};
