const httpServer = require("./app");
const dotenv = require("dotenv");
const connectToDB = require("./configs/db");

dotenv.config();
connectToDB();

httpServer.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
