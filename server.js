const app = require("./app");
require("dotenv").config();
const connectDb = require("./config/db");
const express = require("express");
app.use(express.urlencoded({ extended: true }));

process.on("uncaughtException", (err) => {
  console.log("uncaughtException", err);
  console.log(`Shutting down server ${err.message}`);
});

connectDb();

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});

// Error From mongodb auth failed
process.on("unhandledRejection", (err) => {
  // console.log("unhandledRejection", err);
  console.log(`Shutting down server due to mongodb error ${err.message}`);
});
// update
