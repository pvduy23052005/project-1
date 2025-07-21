const Account = require("../../models/account.model");

// [get] /admin/account
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };

  const accounts = await Account.find(find).select("-passowrd-token");

  console.log(accounts);

  res.render("admin/pages/account/index", {
    title: "account list",
    accounts : accounts 
  });
};
