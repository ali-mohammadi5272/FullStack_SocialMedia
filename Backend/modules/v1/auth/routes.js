const express = require("express");
const authMiddleware = require("./../../../utils/middlewares/authMiddleware");
const { register, login, logout, getMe } = require("./controller");

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/me").get(authMiddleware, getMe);

module.exports = router;
