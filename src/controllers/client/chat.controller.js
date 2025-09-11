const Chat = require("../../models/chat.model");
const User = require("../../models/user.model");
const chatSocket = require("../../socket/client/chat.socket");

// [get] /chat/:roomChatId .
module.exports.index = async (req, res) => {
  const roomChatId = req.params.roomChatId;
  chatSocket(roomChatId, res);
  const listChat = await Chat.find({
    deleted: false,
    room_id: roomChatId,
  });
  for (let chat of listChat) {
    const user = await User.findOne({
      _id: chat.user_id,
    }).select("fullName");
    chat.infoUser = user;
  }

  res.render("client/pages/chat/index", {
    title: "Chat",
    chats: listChat,
  });
};
