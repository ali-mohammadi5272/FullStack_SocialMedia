const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    href: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
  },
  { timestamps: true }
);

schema.virtual("rooms", {
  ref: "Room",
  localField: "_id",
  foreignField: "namespaceId",
});

const model = mongoose.models.Namespace || mongoose.model("Namespace", schema);

module.exports = model;
