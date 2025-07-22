const md5 = require("md5");
const Account = require("../../models/account.model");

// [get] /admin/auth/login
module.exports.index = async (req, res) => {
  res.render("admin/pages/auth/index", {
    title: "Đăng nhập ",
  });
};

// [post] /admin/auth/login
module.exports.loginPost = async (req, res) => {
  const { email, password } = req.body;

  const checkEmail = await Account.findOne({
    email: email,
    deleted: false,
  });

  if (!checkEmail) {
    req.flash("error", "not found email!");
    res.redirect("/admin/auth/login");
    // res.render("admin/pages/auth/index", {
    //   email: email,
    // });
    return;
  }

  if (checkEmail.password != md5(password)) {
    req.flash("error", "password not correct");
    res.redirect("/admin/auth/login");
    // res.render("admin/pages/auth/index", {
    //   email: email,
    // });
    return;
  }

  if (checkEmail.status === "inactive") {
    req.flash("error", " your account is locked");
    res.redirect("/admin/auth/login");
    return;
  }
  res.cookie("token", checkEmail.token);
  res.redirect("/admin/dashboard");
};
