const express = require("express");
const path = require("path");

const port = 3000;
const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use("/static", express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {

  const listUser = [
    "a" , 
    "b" , 
    "c"
  ]

  res.render("index.pug", {
    title: "trang chu",
    message: "Chào bạn đến với Pug ",
    listUser  :  listUser
  });
});

app.listen(port, () => {
  console.log(`Example listener on port ${port} `);
});
