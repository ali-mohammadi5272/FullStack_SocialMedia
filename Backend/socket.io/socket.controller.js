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

const getRoomsMessagesFromDatabase = async (rooms) => {
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
    return messages;
  } catch (err) {
    console.log(err);
  }
};

const sendMessagesToRooms = async (io, rooms, data) => {
  const convertedRoom = [
    `${rooms[0]}___${rooms[1]}`,
    `${rooms[1]}___${rooms[0]}`,
  ];

  io.of("/chats")
    .in(convertedRoom[0])
    .in(convertedRoom[1])
    .emit("chatMessages", data);
};

const insertMessageToDatabase = async (data) => {
  try {
    await messageModel.create({
      creatorId: data.creatorId,
      body: data.message,
      receiverId: data.receiverId,
      edited: 0,
      deleted: 0,
    });
  } catch (err) {
    console.log(err);
  }
};

const getMessageFromClientHandler = async (io, socket, rooms) => {
  socket.on("submitChatMessage", async (data) => {
    await insertMessageToDatabase(data);
    const messages = await getRoomsMessagesFromDatabase(rooms);
    await sendMessagesToRooms(io, rooms, messages);
  });
};

const joinRoomHandler = async (io, socket) => {
  socket.on("joinRoom", (rooms) => {
    joinRoom(socket, rooms);
    sendMessagesToRooms(io, rooms);
  });
};

module.exports = { sendUsers, joinRoomHandler };
