const Account = require("../models/account.model");

module.exports.authPrivate = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    res.redirect("/admin/auth/login");
  } else {
    const user = Account.findOne({
      token: token,
      deleted: false,
      status: "active",
    });
    if (!user) {
      res.redirect("/admin/auth/login");
    } else {
      next();
    }
  }
};
