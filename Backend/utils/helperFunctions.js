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

const refreshTokenPayload = (token) => {
  const { REFRESH_TOKEN_SECRET_KEY } = process.env;

  try {
    const payload = jwt.verify(token, REFRESH_TOKEN_SECRET_KEY);
    return payload;
  } catch (err) {
    return false;
  }
};

const decodedToken = (token) => {
  const payload = jwt.decode(token);
  return payload;
};

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
};

const isValidHashedPassword = async (password, hashedPassword) => {
  const isValidPassword = await bcrypt.compare(password, hashedPassword);

  return isValidPassword;
};

const checkDBCollectionIndexes = async (model) => {
  try {
    await model.listIndexes();
  } catch (err) {
    await model.createIndexes();
  }
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  accessTokenPayload,
  refreshTokenPayload,
  decodedToken,
  hashPassword,
  isValidHashedPassword,
  checkDBCollectionIndexes,
};
