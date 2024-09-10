const socketIo = require("socket.io");
const httpServer = require("./../app");

const io = new socketIo.Server(httpServer, {
  cors: {
    origin: "*",
  },
});

module.exports = io;
