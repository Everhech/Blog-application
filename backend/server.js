const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const dbConnect = require("./config/dbConnect");
const app = express();

//DB
dbConnect();
console.log(process.env);
//server
const PORT = process.env.PORT || 5000; // port number
app.listen(PORT, console.log("Server is running " + PORT));

//username: bloguser   password: Xd9Fj3InOzsvENjs
