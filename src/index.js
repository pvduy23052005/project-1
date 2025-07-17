const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const clientRoute = require("./routes/client/index.route");
const adminRoute = require("./routes/admin/index.route");
require("dotenv").config(); // load biến từ .env
const database = require("./config/database");
const systemConfig = require("./config/system");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("express-flash");
const serverless = require("serverless-http");

const port = process.env.PORT;
const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "./views"));
app.use("/", express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/tinymce', express.static(path.join(__dirname,"..", 'node_modules', 'tinymce')));


app.use(
  session({
    secret: "your-secret-key", // Replace with a strong, unique secret key
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }, // Example: session lasts for 1 minute
  })
);
app.use(flash());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.locals.prefixAdmin = systemConfig.prefixAdmin;

database.connectDatabase(); // kết nối database

//client route
clientRoute(app);
adminRoute(app);

app.listen(port, () => {
  console.log(`Local server is running on http://localhost:${port}`);
});
