const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const clientRoute = require("./routes/client/index.route");
require("dotenv").config(); // load biến từ .env

const uri =
  "mongodb+srv://phungvanduy23052005:trpt1D9TU6BllRh6@product-managerment.webbk.mongodb.net/?retryWrites=true&w=majority&appName=product-managerment";
const port = process.env.PORT;
const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "./views"));
app.use("/static", express.static(path.join(__dirname, "public")));


clientRoute(app);

app.listen(port, () => {
  console.log(`Example listener on port ${port} `);
});