const Chat = require("../../models/chat.model");
const User = require("../../models/user.model");

// [get] /chat
module.exports.index = async (req, res) => {
  const userId = res.locals.user.id;
  const fullName = res.locals.user.fullName;


  _io.once("connection", (socket) => {

    socket.on("CLIENT_SEND", async (message) => {
      // luu vao database .
      const record = new Chat({
        user_id: userId,
        content: message,
      });
      await record.save();
      _io.emit("SERVER_SEND", {
        user_id: userId,
        fullName: fullName,
        content: message,
      });
    });
  });

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
