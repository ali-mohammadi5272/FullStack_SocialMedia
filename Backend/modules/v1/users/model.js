const mongoose = require("mongoose");
const roles = require("./../../../utils/constants");
const {
  emailPattern,
  phoneNumberPattern,
  namePattern,
  usernamePattern,
} = require("./../../../utils/patterns");

const schema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      trim: true,
      minLength: 3,
      match: namePattern,
      required: true,
    },
    lastname: {
      type: String,
      trim: true,
      minLength: 3,
      match: namePattern,
      required: true,
    },
    username: {
      type: String,
      trim: true,
      unique: true,
      minLength: 3,
      match: usernamePattern,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      match: emailPattern,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      match: phoneNumberPattern,
      unique: true,
    },
    age: {
      type: Number,
      min: 0,
      required: true,
    },
    role: {
      type: String,
      trim: true,
      enum: [roles.MANAGER, roles.ADMIN, roles.USER],
      default: roles.USER,
    },
    password: {
      type: String,
      minLength: 8,
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
);

const model = mongoose.models.User || mongoose.model("User", schema);

module.exports = model;
