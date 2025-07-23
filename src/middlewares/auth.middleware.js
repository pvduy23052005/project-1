const Account = require("../models/account.model");
const Role = require("../models/roles.model");

module.exports.authPrivate = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    res.redirect("/admin/auth/login");
  } else {
    const user = await Account.findOne({
      token: token,
      deleted: false,
      status: "active",
    }).select("-password");
    if (!user) {
      res.redirect("/admin/auth/login");
    } else {
      res.locals.user = user;
      const role = await Role.findOne({
        _id: user.role_id,
      });
      res.locals.role = role;
      next();
    }
  }
};
