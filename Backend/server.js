const httpServer = require("./app");
const dotenv = require("dotenv");
const connectToDB = require("./configs/db");
const socketIo = require("socket.io");
const socketIoInit = require("./socket.io/socket.io");

dotenv.config();
connectToDB();

const io = new socketIo.Server(httpServer, {
  cors: {
    origin: "*",
  },
});

socketIoInit(io);

httpServer.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
