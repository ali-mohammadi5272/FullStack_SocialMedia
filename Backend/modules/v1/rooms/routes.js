const express = require("express");
const authMiddleware = require("./../../../utils/middlewares/authMiddleware");
const accessLevelMiddleware = require("./../../../utils/middlewares/accessLevelMiddleware");
const { roles } = require("./../../../utils/constants");
const { uploader } = require("../../../utils/uploader");
const { createRoom, getAll, getRoomsByNamespace } = require("./controller");

const router = express.Router();

router
  .route("/")
  .get(getAll)
  .post(
    authMiddleware,
    accessLevelMiddleware(roles.ADMIN),
    uploader("public/rooms/images").single("image"),
    createRoom
  );

router.route("/namespace/:id").get(getRoomsByNamespace);

module.exports = router;
