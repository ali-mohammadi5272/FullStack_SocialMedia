const express = require("express");
const authMiddleware = require("./../../../utils/middlewares/authMiddleware");
const accessLevelMiddleware = require("./../../../utils/middlewares/accessLevelMiddleware");
const { roles } = require("./../../../utils/constants");
const { createNamespace, getAll, removeNamespace } = require("./controller");

const router = express.Router();

router
  .route("/")
  .get(getAll)
  .post(authMiddleware, accessLevelMiddleware(roles.ADMIN), createNamespace);

router
  .route("/:id")
  .delete(authMiddleware, accessLevelMiddleware(roles.ADMIN), removeNamespace);

module.exports = router;
