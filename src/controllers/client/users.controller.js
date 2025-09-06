const User = require("../../models/user.model");
const userSocket = require("../../socket/client/users.socket");

// [get] users/not-friend .
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

// [get] users/request.
module.exports.request = async (req, res) => {
  const userId = res.locals.user.id;

  const user = await User.findOne({
    _id: userId,
  });
  userSocket(res);
  const friendRequests = user.friendRequests;
  const users = await User.find({
    $and: [{ _id: { $ne: userId } }, { _id: { $in: friendRequests } }],
    status: "active",
    deleted: false,
  }).select(" fullName avatar ");

  res.render("client/pages/users/request", {
    title: "Request add friend ",
    users: users,
  });
};

// [get] users/accept .
module.exports.accept = async (req, res) => {
  const userId = res.locals.user.id;

  const user = await User.findOne({
    _id: userId,
  });
  userSocket(res);
  const friendAccepts = user.friendAccepts;

  const users = await User.find({
    $and: [{ _id: { $ne: userId } }, { _id: { $in: friendAccepts } }],
    status: "active",
    deleted: false,
  }).select("fullName avatar ");

  res.render("client/pages/users/accept", {
    title: "Accept",
    users: users,
  });
};

// [get] users/friend .
module.exports.friend = async (req, res) => {
  const myId = res.locals.user.id;

  const user = await User.findOne({
    _id: myId,
  });

  const friendList = user.friendList.map((item) => item.user_id);

  const listFriend = await User.find({
    $and: [{ _id: { $ne: myId } }, { _id: { $in: friendList } }],
    status: "active",
    deleted: false,
  }).select("id fullName avatar statusOnline");

  console.log(listFriend);

  res.render("client/pages/users/friend", {
    title: "friend",
    listFriend: listFriend,
  });
  
};
