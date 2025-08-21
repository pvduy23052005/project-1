const User = require("../../models/user.model");

module.exports = (res) => {
  const myId = res.locals.user.id;

  _io.on("connection", (socket) => {
    socket.on("ADD_FRIEND", async (userId) => {
      try {
        // them id cua A vao acceptFriends cuar B
        await User.updateOne(
          {
            _id: userId,
          },
          {
            $addToSet: { friendAccepts: myId },
          }
        );
        // them id B vao friendRequests cuar A .
        await User.updateOne(
          {
            _id: myId,
          },
          {
            $addToSet: { friendRequests: userId },
          }
        );
      } catch (error) {}
    });
  });
};
