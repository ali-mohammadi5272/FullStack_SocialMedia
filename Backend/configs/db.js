const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_CONNECTION_STRING);
    console.log("Connected to MongoDB successfully :))");
  } catch (err) {
    console.log("Error connecting to MongoDB !!", err);
  }
};

module.exports = connectToDB;
