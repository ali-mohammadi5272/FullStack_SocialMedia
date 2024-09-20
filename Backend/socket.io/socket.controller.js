const userModel = require("./../modules/v1/users/model");
const messageModel = require("./../modules/v1/messages/model");

const sendUsers = async (socket) => {
  const users = await userModel.find({}).select("-__v -password").lean();
  socket.emit("users", users);
};

const joinRoom = (socket, rooms) => {
  const roomsArray = Array.from(socket.rooms);
  const convertedRoom = [
    `${rooms[0]}___${rooms[1]}`,
    `${rooms[1]}___${rooms[0]}`,
  ];

  if (roomsArray.length > 1) {
    socket.leave(roomsArray[1]);
    socket.leave(roomsArray[2]);
  }

  convertedRoom.forEach((room) => {
    socket.join(room);
  });
};

const sendMessagesToRooms = async (io, rooms) => {
  const convertedRoom = [
    `${rooms[0]}___${rooms[1]}`,
    `${rooms[1]}___${rooms[0]}`,
  ];

  try {
    const messages = await messageModel
      .find({
        $or: [
          { creatorId: rooms[0], receiverId: rooms[1] },
          { creatorId: rooms[1], receiverId: rooms[0] },
        ],
      })
      .select("-__v -password")
      .lean();

    io.of("/chats")
      .in(convertedRoom[0])
      .in(convertedRoom[1])
      .emit("chatMessages", messages);
  } catch (err) {
    console.log(err);
  }
};

const joinRoomHandler = async (io, socket) => {
  socket.on("joinRoom", (rooms) => {
    joinRoom(socket, rooms);
    sendMessagesToRooms(io, rooms);
  });
};

module.exports = { sendUsers, joinRoomHandler };
