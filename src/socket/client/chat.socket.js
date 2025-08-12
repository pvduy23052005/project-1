const Chat = require("../../models/chat.model");
const uploadCloud = require("../../helpers/client/uploadCloud");

module.exports = (res) => {
  _io.once("connection", (socket) => {
    const userId = res.locals.user.id;
    const fullName = res.locals.user.fullName;

    // server listening
    socket.on("CLIENT_SEND", async (data) => {
      const images = data.images;
      const message = data.message;
      let imageUrls = await uploadCloud.uploadCloud(images);
      // luu vao database .
      const record = new Chat({
        user_id: userId,
        content: message,
        images: imageUrls,
      });
      await record.save();

      // server send message all user .
      _io.emit("SERVER_SEND", {
        user_id: userId,
        fullName: fullName,
        content: message,
        images: imageUrls,
      });
    });

    // server listening .
    socket.on("CLIENT_TYPING", (type) => {
      socket.broadcast.emit("SERVER_SEND_TYPING", {
        user_id: userId,
        fullName: fullName,
        type: type,
      });
    });
  });
};
