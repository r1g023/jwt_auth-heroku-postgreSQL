const express = require("express");
const server = express();
const cors = require("cors");
const helmet = require("helmet");
// const {
//   restrictedUser,
//   checkRole,
// } = require("../middleware/global-middleware");
//

//globacl middleware
server.use(express.json(), cors(), helmet());

//import routers
const welcomeRouter = require("../welcome/welcome-router");
const userRouter = require("../users/users-router");
const authRouter = require("../auth/auth-router");
const seiyaRouter = require("../seiya/seiya-router");

//server endpoints
server.use("/", welcomeRouter);
server.use("/api/users", userRouter);
server.use("/api/auth", authRouter);
server.use("/api/seiya", seiyaRouter);

//middleware for CATCH ERROR on all endpoints of /api/messages
server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: "500 error: Something went wrong",
  });
});

module.exports = server;
