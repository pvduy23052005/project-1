const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const clientRoute = require("./routes/client/index.route");
const adminRoute = require("./routes/admin/index.route");
require("dotenv").config(); // load biến từ .env
const database = require("./config/database");
const systemConfig = require("./config/system");
const methodOverride = require('method-override');

const port = process.env.PORT;
const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "./views"));
app.use("/", express.static(path.join(__dirname, "public")));
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));

app.locals.prefixAdmin = systemConfig.prefixAdmin;

database.connectDatabase(); // kết nối database

//client route
clientRoute(app);
adminRoute(app);

app.listen(port, () => {
  console.log(`Example listener on port ${port} `);
});
