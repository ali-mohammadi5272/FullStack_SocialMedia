const express = require("express");
const authMiddleware = require("./../../../utils/middlewares/authMiddleware");
const accessLevelMiddleware = require("./../../../utils/middlewares/accessLevelMiddleware");
const { roles } = require("./../../../utils/constants");
const { uploader } = require("../../../utils/uploader");
const {
  createRoom,
  getAll,
  getRoomsByNamespace,
  getRoom,
} = require("./controller");

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
router.route("/:id").get(getRoom);

module.exports = router;
