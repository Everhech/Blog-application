const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
//This is the connection that will be used
const dbConnect = require("./config/dbConnect");
const { userRegisterCtrl } = require("./controllers/users/usersCtrl");
const app = express();

/** @brief DB */
dbConnect();

/** @brief Middleware */
app.use(express.json());

/** @brief Custom Middleware */
const logger = (req, res, next) => {
  //req -> request, res -> response, next -> function
  console.log("Am a logger");
  next();
};

//2. usage the custom middleware
app.use(logger);

/**
 * @brief Post request: Register
 */
app.post("/api/users/register", userRegisterCtrl);

/**
 * @brief Post request: Login
 */
app.post("/api/users/login", (req, res) => {
  //business logic            req -> request   res -> response
  res.json({ user: "User Login" });
});

/**
 * @brief Post request: Fetch all users
 */
app.post("/api/users", (req, res) => {
  //business logic            req -> request   res -> response
  res.json({ user: "fetch all user" });
});

//server
const PORT = process.env.PORT || 5000; // port number
app.listen(PORT, console.log("Server is running " + PORT));

//MongoDB compast: username: bloguser   password: Xd9Fj3InOzsvENjs
