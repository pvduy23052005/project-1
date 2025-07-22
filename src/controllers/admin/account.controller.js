const Account = require("../../models/account.model");
const Role = require("../../models/roles.model");
const md5 = require("md5");

// [get] /admin/account
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };
  const accounts = await Account.find(find).select("-passowrd-token");
  for (const account of accounts) {
    const role = await Role.findOne({
      _id: account.role_id,
      deleted: false,
    });
    account.role = role.title;
  }
  res.render("admin/pages/account/index", {
    title: "account list",
    accounts: accounts,
  });
};

// [get] /admin/account/create
module.exports.createGet = async (req, res) => {
  let find = {
    deleted: false,
  };
  const roles = await Role.find(find);
  res.render("admin/pages/account/create", {
    title: "create account",
    roles: roles,
  });
};

// [post] /admin/account/create
module.exports.createPost = async (req, res) => {
  try {
    const checkEmail = await Account.findOne({
      email: req.body.email,
      deleted: false,
    });

    if (checkEmail) {
      req.flash("error", "Email đã tồn tại");
      res.redirect("/admin/account/create");
      return;
    }

    const avatar = req.file ? req.file.path : "";
    if (avatar) {
      req.body.avatar = avatar;
    }

    req.body.password = md5(req.body.password);

    // Tạo tài khoản mới
    const newAccount = new Account(req.body);
    await newAccount.save();

    req.flash("success", "Thêm tài khoản thành công!");
    res.redirect("/admin/account");
  } catch (error) {
    console.log(error);
    req.flash("error", "Thêm tài khoản thất bại!");
    res.redirect("/admin/account/create");
  }
};
