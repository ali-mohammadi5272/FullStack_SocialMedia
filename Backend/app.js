const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");

dotenv.config();
const { VERSION } = process.env;

const authRouter = require(`./modules/${VERSION}/auth/routes`);
const namespacesRouter = require(`./modules/${VERSION}/namespaces/routes`);
const roomsRouter = require(`./modules/${VERSION}/rooms/routes`);

const app = express();

app.use(
  cors(),
  helmet(),
  express.json(),
  express.urlencoded({ extended: false }),
  express.static(path.join(process.cwd(), "public")),
  cookieParser(process.env.COOKIE_SECRET_KEY)
);

app.use(`/api/${VERSION}/auth`, authRouter);
app.use(`/api/${VERSION}/namespaces`, namespacesRouter);
app.use(`/api/${VERSION}/rooms`, roomsRouter);

app.use((err, req, res, next) => {
  return res.status(500).json({ message: err.message });
});

app.use((req, res) => {
  return res.status(400).json({ message: "Bad Request. Wrong Api !!" });
});

module.exports = app;
