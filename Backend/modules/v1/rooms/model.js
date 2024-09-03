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
    image: {
      type: String,
      trim: true,
      required: true,
    },
    namespaceId: {
      type: mongoose.Types.ObjectId,
      ref: "Namespace",
      required: true,
    },
  },
  { timestamps: true }
);

schema.virtual("messages", {
  ref: "Message",
  localField: "_id",
  foreignField: "roomId",
});

const model = mongoose.models.Room || mongoose.model("Room", schema);

module.exports = model;
