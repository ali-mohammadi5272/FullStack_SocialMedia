const userModel = require("./../modules/v1/users/model");
const messageModel = require("./../modules/v1/messages/model");

const getAllUsersFromDatabase = async () => {
  const users = await userModel.find({}).select("-__v -password").lean();
  return users;
};

const sendUsers = (socket, users) => {
  socket.emit("users", users);
};

const sendUsersToClientHandler = async (socket) => {
  const users = await getAllUsersFromDatabase();
  sendUsers(socket, users);
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

const sendMessagesToRooms = async (io, rooms, messages) => {
  const convertedRoom = [
    `${rooms[0]}___${rooms[1]}`,
    `${rooms[1]}___${rooms[0]}`,
  ];

  io.of("/chats")
    .in(convertedRoom[0])
    .in(convertedRoom[1])
    .emit("chatMessages", messages);
};

const insertMessageToDatabase = async (message) => {
  try {
    await messageModel.create({
      creatorId: message.creatorId,
      body: message.message,
      receiverId: message.receiverId,
      edited: 0,
      deleted: 0,
    });
  } catch (err) {
    console.log(err);
  }
};

const getMessageFromClientHandler = async (io, socket, rooms) => {
  socket.on("submitChatMessage", async (message) => {
    await insertMessageToDatabase(message);
    const messages = await getRoomsMessagesFromDatabase(rooms);
    await sendMessagesToRooms(io, rooms, messages);
  });
};

const userTypingStart = (io, socket, rooms) => {
  socket.on("userTypingStart", async (info) => {
    const convertedRoom = [
      `${rooms[0]}___${rooms[1]}`,
      `${rooms[1]}___${rooms[0]}`,
    ];

    io.of("/chats")
      .in(convertedRoom[0])
      .in(convertedRoom[1])
      .emit("userTypingStart", {
        user: info.user._id,
        isTyping: info.isTyping,
      });
  });
};

const userTypingEnd = (io, socket, rooms) => {
  socket.on("userTypingEnd", async (info) => {
    const convertedRoom = [
      `${rooms[0]}___${rooms[1]}`,
      `${rooms[1]}___${rooms[0]}`,
    ];

    io.of("/chats")
      .in(convertedRoom[0])
      .in(convertedRoom[1])
      .emit("userTypingEnd", {
        user: info.user._id,
        isTyping: info.isTyping,
      });
  });
};

const detectTypingStatusHandler = async (io, socket, rooms) => {
  userTypingStart(io, socket, rooms);
  userTypingEnd(io, socket, rooms);
};

const joinRoomHandler = (io, socket) => {
  socket.on("joinRoom", async (rooms) => {
    socket.removeAllListeners("submitChatMessage");
    joinRoom(socket, rooms);
    const messages = await getRoomsMessagesFromDatabase(rooms);
    await sendMessagesToRooms(io, rooms, messages);
    await getMessageFromClientHandler(io, socket, rooms);
    await detectTypingStatusHandler(io, socket, rooms);
  });
};

module.exports = { sendUsersToClientHandler, joinRoomHandler };
