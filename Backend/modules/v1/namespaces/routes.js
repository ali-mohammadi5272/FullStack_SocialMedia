const express = require("express");
const authMiddleware = require("./../../../utils/middlewares/authMiddleware");
const accessLevelMiddleware = require("./../../../utils/middlewares/accessLevelMiddleware");
const { roles } = require("./../../../utils/constants");
const { createNamespace, getAll } = require("./controller");

const router = express.Router();

router
  .route("/")
  .get(getAll)
  .post(authMiddleware, accessLevelMiddleware(roles.ADMIN), createNamespace);

module.exports = router;
