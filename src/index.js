const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const clientRoute = require("./routes/client/index.route");
require("dotenv").config(); // load biến từ .env
const database = require("./config/database");

const port = process.env.PORT;
const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "./views"));
app.use("/", express.static(path.join(__dirname, "public")));

database.connectDatabase(); // kết nối database

//client route 
clientRoute(app);

app.listen(port, () => {
  console.log(`Example listener on port ${port} `);
});