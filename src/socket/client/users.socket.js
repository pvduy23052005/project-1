const User = require("../../models/user.model");

module.exports = (res) => {
  const myId = res.locals.user.id;

  _io.once("connection", (socket) => {
    // add friend .
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

    // cancel friend .
    socket.on("CANCEL_FRIEND", async (userId) => {
      try {
        await User.updateOne(
          {
            _id: myId,
          },
          {
            $pull: { friendRequests: userId },
          }
        );
        await User.updateOne(
          {
            _id: userId,
          },
          {
            $pull: { friendAccepts: myId },
          }
        );
      } catch (error) {}
    });

    // refuse friend .
    socket.on("REFUSE_FRIEND", async (userId) => {
      try {
        await User.updateOne(
          {
            _id: userId,
          },
          {
            $pull: { friendRequests: myId },
          }
        );

        await User.updateOne(
          {
            _id: myId,
          },
          {
            $pull: { friendAccepts: userId },
          }
        );
      } catch (error) {}
    });

    // accept friend .
    socket.on("ACCEPT_FRIEND", async (userId) => {
      try {
        // add B friendLists of A
        await User.updateOne(
          {
            _id: myId,
          },
          {
            $addToSet: {
              friendList: {
                user_id: userId,
                room_chat_id: "",
              },
            },
            $pull: { friendAccepts: userId },
          }
        );
        await User.updateOne(
          {
            _id: userId,
          },
          {
            $addToSet: {
              friendList: {
                user_id: myId,
                room_chat_id: "",
              },
            },
            $pull: { friendRequests: myId },
          }
        );
        console.log("successful");
      } catch (error) {
        console.log(error);
      }
    });
  });
};
