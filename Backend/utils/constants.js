const dotenv = require("dotenv");

dotenv.config();

const roles = {
  MANAGER: "MANAGER",
  ADMIN: "ADMIN",
  USER: "USER",
};

const defaultUserPhoto = `${process.env.BASE_URL}/avatardefault.webp`;

module.exports = { roles, defaultUserPhoto };
