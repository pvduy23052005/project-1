const User = require("../../models/user.model");
const md5 = require("md5");

// [post] /user/register
module.exports.register = (req, res) => {
  res.render("client/pages/user/register", {
    title: "Sign up",
  });
};

// [get] /user/register
module.exports.registerPost = async (req, res) => {
  try {
    const userInfo = req.body;
    const user = await User.findOne({
      email: req.body.email,
    });
    if (user) {
      req.flash("error", "This email is already registered.");
      res.redirect("/user/register");
    } else {
      userInfo.password = md5(userInfo.password);
      const newUser = new User(userInfo);
      await newUser.save();
      res.cookie("tokenUser", user.tokenUser);
      res.redirect("/");
    }
  } catch (error) {
    req.flash("error", "Register not successful !");
    res.redirect("/uder/login");
  }
};

// [get] /user/login
module.exports.login = async (req, res) => {
  res.render("client/pages/login", {
    title: "Login",
  });
};

// [post] /user/login
module.exports.loginPost = async (req, res) => {
  const userInfo = req.body;

  const user = await User.findOne({
    email: userInfo.email,
    deleted: false,
  });
  if (user) {
    if (user.password !== md5(userInfo.password)) {
      req.flash("error", "Incorrect password!");
      return;
    }
    res.cookie("tokenUser", user.tokenUser);
    req.flash("success", "Thanh cong!");
    res.redirect("/");
  } else {
    req.flash("error", "Email does not exist.");
    res.redirect("/user/login");
  }
};

// [post] /user/logout
module.exports.logout = async (req, res) => {
  res.clearCookie("tokenUser");
  res.redirect("/");
};
