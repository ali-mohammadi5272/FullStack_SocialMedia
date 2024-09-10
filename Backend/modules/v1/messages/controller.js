const messageModel = require("./model");
const userModel = require("./../users/model");
const { isValidObjectId } = require("mongoose");

const sendMessage = async (req, res, next) => {
  const { body, receiverId } = req.body;

  const isValidId = isValidObjectId(receiverId);
  if (!isValidId) {
    return res.status(422).json({ message: "ReceiverId is not valid !!" });
  }

  try {
    const receiverUser = await userModel.findOne({ _id: receiverId });
    if (!receiverUser) {
      return res.status(404).json({ message: "User not found !!" });
    }

    const newMessage = await messageModel.create({
      creatorId: req.user._id,
      body,
      receiverId,
      edited: 0,
      deleted: 0,
    });
    if (!newMessage) {
      return res.status(500).json({ message: "Create Message failed !!" });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { sendMessage };
