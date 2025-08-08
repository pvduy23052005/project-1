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
const cookieParser = require("cookie-parser");
const moment = require("moment");
require("moment/locale/vi"); // nạp ngôn ngữ tiếng Việt
const http = require("http");
const { Server } = require("socket.io");

const port = process.env.PORT;
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "./views"));
app.use("/", express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(
  "/tinymce",
  express.static(path.join(__dirname, "..", "node_modules", "tinymce"))
);

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

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);
});

app.locals.prefixAdmin = systemConfig.prefixAdmin;
app.locals.moment = moment;

database.connectDatabase(); // kết nối database

//client route
clientRoute(app);
adminRoute(app);

server.listen(port, () => {
  console.log(`Local server is running on http://localhost:${port}`);
});
