const User = require("../../models/user.model");
const userSocket = require("../../socket/client/users.socket");

module.exports.notFriend = async (req, res) => {
  const userLogined = res.locals.user.id;

  const user = await User.findOne({ 
    _id: userLogined,
  });

  const friendRequests = user.friendRequests;
  const friendAccepts = user.friendAccepts;

  const listUser = await User.find({
    $and: [
      { _id: { $ne: userLogined } },
      { _id: { $nin: friendRequests } },
      { _id: { $nin: friendAccepts } },
    ],
    deleted: false,
    status: "active",
  }).select("id avatar fullName ");

  userSocket(res);

  res.render("client/pages/users/not-friend", {
    title: "Danh sách người dùng",
    users: listUser,
  });
};
