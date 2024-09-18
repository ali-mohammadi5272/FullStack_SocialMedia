const { sendUsers } = require("./socket.controller");

const socketIoInit = (io) => {
  io.on("connection", async (socket) => {
    sendUsers(socket);
  });
};

module.exports = socketIoInit;
