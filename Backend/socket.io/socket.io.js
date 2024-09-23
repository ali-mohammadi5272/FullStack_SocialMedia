const { sendUsersToClientHandler, joinRoomHandler } = require("./socket.controller");

const socketIoInit = (io) => {
  io.on("connection", async (socket) => {
    await sendUsersToClientHandler(socket);
  });
  io.of("/chats").on("connection", (socket) => {
    joinRoomHandler(io, socket);
  });
};

module.exports = socketIoInit;
