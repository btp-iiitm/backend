const app = require("./app");
const mongoose = require("mongoose");

process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception!");
  console.error(err);
});

mongoose
  .connect(
    process.env.NODE_ENV === "production"
      ? process.env.DATABASE_HOSTED
      : process.env.DATABASE_LOCAL,
  )
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.error(err);
  });

const PORT = process.env.PORT || 9090;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection!");
  console.error(err);
});
