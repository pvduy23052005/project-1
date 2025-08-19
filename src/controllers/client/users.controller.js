const User = require("../../models/user.model");

module.exports.notFriend = async (req, res) => {
  const userLogined = res.locals.user.id;
  const listUser = await User.find({
    _id: { $ne: userLogined },
    deleted: false,
    status: "active",
  }).select("id avatar fullName ");

  console.log(listUser);

  res.render("client/pages/users/not-friend", {
    title: "Danh sách người dùng",
    users :listUser
  });
};
