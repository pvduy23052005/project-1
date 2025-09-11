const Room = require("../../models/room.model");

module.exports.chatMiddleware = async (req, res, next) => {
  const roomChatId = req.params.roomChatId;
  const myId = res.locals.user.id;

  const existRoom = await Room.findOne({
    _id: roomChatId,
    status: "active",
    deleted: false,
  });
  if (!existRoom) {
    return res.redirect("/users/not-friend");
  }
  const existMember = existRoom.members.find(
    (member) => member.user_id.toString() === myId
  );
  if (!existMember) {
    return res.redirect("/users/not-friend");
  }
  next();
};
