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

const accessTokenPayload = (token) => {
  const { ACCESS_TOKEN_SECRET_KEY } = process.env;

  try {
    const payload = jwt.verify(token, ACCESS_TOKEN_SECRET_KEY);
    return payload;
  } catch (err) {
    return false;
  }
};

const generateRefreshToken = (payload) => {
  const { REFRESH_TOKEN_SECRET_KEY, REFRESH_TOKEN_EXPIRES_TIME } = process.env;

  const token = jwt.sign(payload, REFRESH_TOKEN_SECRET_KEY, {
    expiresIn: REFRESH_TOKEN_EXPIRES_TIME,
  });
  return token;
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  accessTokenPayload,
};
