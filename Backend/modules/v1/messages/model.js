const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    body: {
      type: String,
      trim: true,
      required: true,
    },
    edited: {
      type: Number,
      enum: [0, 1],
      default: 0,
    },
    deleted: {
      type: Number,
      enum: [0, 1],
      default: 0,
    },
  },
  { timestamps: true }
);

const model = mongoose.models.Message || mongoose.model("Message", schema);

module.exports = model;
