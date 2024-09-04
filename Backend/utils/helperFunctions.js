const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const userModel = require("./../modules/v1/users/model");

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

const userRegisterInApplication = async (req) => {
  try {
    const { accessToken, refreshToken } = req.signedCookies;
    const accessTokenPayloadData = accessTokenPayload(accessToken);
    const refreshTokenPayloadData = refreshTokenPayload(refreshToken);
    const { _id } = accessTokenPayloadData;

    const user = await userModel.findOne({ _id }).select("-__v -password");
    if (!user) {
      return false;
    }
    return user;
  } catch (error) {
    return false;
  }
};

const forbiddenResponse = (res) => {
  return res.status(403).json({
    message:
      "You are not allowed to access this page because you are not authenticated or have no permissions to access this page.",
  });
};

const isAllowedUser = (validRoles, userRole) => {
  return validRoles.some((role) => role === userRole);
};

const setAccessTokenCookie = (res, token) => {
  res.cookie("accessToken", token, {
    maxAge: 1000 * 60 * 30,
    httpOnly: true,
    path: "/",
    secure: true,
    signed: true,
  });
};

const setRefreshTokenCookie = (res, token) => {
  res.cookie("refreshToken", token, {
    maxAge: 1000 * 60 * 60 * 30,
    httpOnly: true,
    path: "/",
    secure: true,
    signed: true,
  });
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
  userRegisterInApplication,
  forbiddenResponse,
  isAllowedUser,
  setAccessTokenCookie,
  setRefreshTokenCookie,
};
