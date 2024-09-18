const userModel = require("./../modules/v1/users/model");

const sendUsers = async (socket) => {
  const users = await userModel.find({}).select("-__v -password").lean();
  socket.emit("users", users);
};

const joinRoom = async (socket) => {
  socket.on("joinRoom", (rooms) => {
    const roomsArray = Array.from(socket.rooms);

    if (roomsArray.length > 1) {
      socket.leave(roomsArray[1]);
      socket.leave(roomsArray[2]);
    }
    rooms.forEach((room) => {
      socket.join(room);
    });
  });
};

module.exports = { sendUsers, joinRoom };
