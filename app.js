const express = require("express");
const env = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");

const authRouter = require("./routes/auth");

const AppError = require("./utils/appError");
const globalError = require("./controllers/globalError");

env.config({
  path: "./.env",
});

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/auth", authRouter);

app.all("*", (req, res, next) => {
  const error = new AppError(
    `Can't find ${req.originalUrl} on this server!`,
    404,
  );

  next(error);
});

app.use(globalError);

module.exports = app;
