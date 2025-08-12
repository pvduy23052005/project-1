const Chat = require("../../models/chat.model");
const User = require("../../models/user.model");
const chatSocket = require("../../socket/client/chat.socket");

// [get] /chat
module.exports.index = async (req, res) => {
  chatSocket(res);
  const listChat = await Chat.find({
    deleted: false,
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
