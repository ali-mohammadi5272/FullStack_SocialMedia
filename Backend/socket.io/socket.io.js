const { sendUsers, joinRoom } = require("./socket.controller");

const socketIoInit = (io) => {
  io.on("connection", async (socket) => {
    sendUsers(socket);
  });
  io.of("/chats").on("connection", (socket) => {
    joinRoom(socket);
  });
};

module.exports = socketIoInit;
