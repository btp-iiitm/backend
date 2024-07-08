const express = require("express");
const env = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");

const authRouter = require("./src/routes/auth");
const studentRouter = require("./src/routes/student");
const courseRouter = require("./src/routes/course");
const subjectRouter = require("./src/routes/subject");
const examRouter = require("./src/routes/exam");
const quizRouter = require("./src/routes/quiz");
const assignmentRouter = require("./src/routes/assignment");

const AppError = require("./src/utils/appError");
const globalError = require("./src/controllers/globalError");

env.config({
  path: "./.env",
});

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/student", studentRouter);
app.use("/api/course", courseRouter);
app.use("/api/subject", subjectRouter);
app.use("/api/exam", examRouter);
app.use("/api/quiz", quizRouter);
app.use("/api/assignment", assignmentRouter);

app.all("*", (req, res, next) => {
  const error = new AppError(
    `Can't find ${req.originalUrl} on this server!`,
    404,
  );

  next(error);
});

app.use(globalError);

module.exports = app;
