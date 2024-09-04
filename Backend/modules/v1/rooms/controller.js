const roomModel = require("./model");
const namespaceModel = require("./../namespaces/model");
const createRoomValidate = require("./../../../utils/validators/rooms/createRoom");
const roomImageValidate = require("./../../../utils/validators/rooms/roomImage");
const fs = require("node:fs");
const path = require("node:path");
const { isValidObjectId } = require("mongoose");
const { defaultUserPhoto } = require("../../../utils/constants");

require("dotenv").config();

const createRoom = async (req, res, next) => {
  if ("file" in req) {
    const isValidImage = roomImageValidate(req);
    if (!isValidImage) {
      return res.status(422).json(roomImageValidate.errors);
    }
  }

  const isValidRequestBody = createRoomValidate(req.body);
  if (!isValidRequestBody) {
    if ("file" in req) {
      fs.unlinkSync(
        path.join(process.cwd(), "/public/rooms/images", req.file.filename)
      );
    }
    return res.status(422).json(createRoomValidate.errors);
  }

  const { title, href, namespaceId } = req.body;

  const isValidId = isValidObjectId(namespaceId);
  if (!isValidId) {
    return res.status(422).json({ message: "NamespaceId is not valid !!" });
  }

  try {
    await checkDBCollectionIndexes(roomModel);
  } catch (err) {
    const isRoomExistBefore = await roomModel
      .findOne({ title, href, namespaceId })
      .lean();
    if (isRoomExistBefore) {
      if ("file" in req) {
        fs.unlinkSync(
          path.join(process.cwd(), "public/rooms/images", req.file.filename)
        );
      }
      return res.status(422).json({ message: "Room is already exist !!" });
    }
  }

  try {
    const namespace = await namespaceModel.findOne({ _id: namespaceId });
    if (!namespace) {
      if ("file" in req) {
        fs.unlinkSync(
          path.join(process.cwd(), "public/rooms/images", req.file.filename)
        );
      }
      return res.status(422).json({ message: "Namespace not found !!" });
    }

    const image =
      "file" in req
        ? `${process.env.BASE_URL}/rooms/images/${req?.file?.filename}`
        : defaultUserPhoto;

    const newRoom = await roomModel.create({
      ...req.body,
      image,
    });
    if (!newRoom) {
      return res.status(500).json({ message: "Create Room failed !!" });
    }

    const room = await roomModel
      .findOne({ _id: newRoom._id })
      .populate("namespaceId", "title href")
      .select("-__v")
      .lean();

    room.namespace = room.namespaceId;
    delete room.namespaceId;

    return res.status(201).json({
      message: "Room added successfully :))",
      room,
    });
  } catch (err) {
    if ("file" in req) {
      fs.unlinkSync(
        path.join(process.cwd(), "public/rooms/images", req.file.filename)
      );
    }
    next(err);
  }
};

const getAll = async (req, res, next) => {
  try {
    const rooms = await roomModel
      .find({})
      .populate("namespaceId", "title href")
      .select("-__v")
      .lean();

    rooms.forEach((room) => {
      room.namespace = room.namespaceId;
      delete room.namespaceId;
    });

    return res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};

const getRoomsByNamespace = async (req, res, next) => {
  const { id } = req.params;
  const isValidId = isValidObjectId(id);
  if (!isValidId) {
    return res.status(422).json({ message: "NamespaceId is not valid !!" });
  }

  try {
    const rooms = await roomModel
      .find({ namespaceId: id })
      .populate("namespaceId", "title href")
      .select("-__v")
      .lean();

    rooms.forEach((room) => {
      room.namespace = room.namespaceId;
      delete room.namespaceId;
    });

    return res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};

module.exports = { createRoom, getAll, getRoomsByNamespace };
