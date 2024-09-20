const userModel = require("./../modules/v1/users/model");

const sendUsers = async (socket) => {
  const users = await userModel.find({}).select("-__v -password").lean();
  socket.emit("users", users);
};

const joinRoomHandler = async (io, socket) => {
  socket.on("joinRoom", (rooms) => {
    joinRoom(socket, rooms);
  });
};

module.exports = { sendUsers, joinRoomHandler };
