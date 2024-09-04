const express = require("express");
const authMiddleware = require("./../../../utils/middlewares/authMiddleware");
const accessLevelMiddleware = require("./../../../utils/middlewares/accessLevelMiddleware");
const { roles } = require("./../../../utils/constants");
const { createNamespace } = require("./controller");

const router = express.Router();

router
  .route("/")
  .post(authMiddleware, accessLevelMiddleware(roles.ADMIN), createNamespace);

module.exports = router;
