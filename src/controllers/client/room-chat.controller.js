const Room = require("../../models/room.model");
const User = require("../../models/user.model");

// [get] /room-chat
module.exports.index = async (req, res) => {
  const myId = res.locals.user.id;

  // select list room chat .
  const listRoom = await Room.find({
    typeRoom: "group",
    deleted: false,
    "members.user_id": myId, // kiem tra user hien tai co trong members khong .
  });

  res.render("client/pages/room-chat/index", {
    title: "Room Chat",
    listRoom: listRoom,
  });
};

// [get] /room-chat/create .
module.exports.create = async (req, res) => {
  const friends = res.locals.user.friendList;

  for (const friend of friends) {
    const infoUser = await User.findOne({
      _id: friend.user_id,
    }).select("fullName");

    friend.infoFriend = infoUser;
  }

  res.render("client/pages/room-chat/create", {
    title: "Create Room Chat",
    friends: friends,
  });
};

// [get] /room-chat/create .
module.exports.createPost = async (req, res) => {
  const { roomName, memberId } = req.body;

  if (memberId.length > 0) {
    const dataRoom = {
      title: roomName,
      avartar: "",
      user_id: res.locals.user.id,
      typeRoom: "group",
      members: [],
    };

    const listMember = memberId.map((id) => {
      return {
        user_id: id,
        role: "member",
      };
    });

    dataRoom.members = [
      ...listMember,
      { user_id: res.locals.user.id, role: "admin" },
    ];

    const newRoom = new Room(dataRoom);
    await newRoom.save();
    res.redirect(`/chat/${newRoom.id}`);
  }
};
