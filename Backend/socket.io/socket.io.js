const { sendUsers, joinRoomHandler } = require("./socket.controller");

const socketIoInit = (io) => {
  io.on("connection", async (socket) => {
    sendUsers(socket);
  });
  io.of("/chats").on("connection", (socket) => {
    joinRoomHandler(io, socket);
  });
};

module.exports = socketIoInit;
