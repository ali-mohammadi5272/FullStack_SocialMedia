const express = require("express");
const authMiddleware = require("./../../../utils/middlewares/authMiddleware");
const accessLevelMiddleware = require("./../../../utils/middlewares/accessLevelMiddleware");
const { roles } = require("./../../../utils/constants");
const { createRoom } = require("./controller");
const { uploader } = require("../../../utils/uploader");

const router = express.Router();

router
  .route("/")
  .post(
    authMiddleware,
    accessLevelMiddleware(roles.ADMIN),
    uploader("public/rooms/images").single("image"),
    createRoom
  );

module.exports = router;
