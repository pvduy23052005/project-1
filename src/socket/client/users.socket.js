const User = require("../../models/user.model");
const Room = require("../../models/room.model");

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
        // hien thi real time loi moi ket ban .
        const inforUser = await User.findOne({
          _id: userId,
        });
        const countFriendAccept = inforUser.friendAccepts.length;
        socket.broadcast.emit("SERVER_RETURN_LENGTH_FRIENDACCEPTS", {
          userId: userId,
          countFriendAccept,
        });

        // tra ve view real time .
        const infoMyId = await User.findOne({
          _id: myId,
        }).select("avatar fullName ");

        socket.broadcast.emit("SERVER_RETURN_INFOUSER", {
          userId: userId,
          infoMyId: infoMyId,
        });
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
        // Da huy thi giam loi moi ket ban di .
        const inforUser = await User.findOne({
          _id: userId,
        });
        const countFriendAccept = inforUser.friendAccepts.length;
        socket.broadcast.emit("SERVER_RETURN_LENGTH_FRIENDACCEPTS", {
          userId: userId,
          countFriendAccept,
        });

        socket.broadcast.emit("SERVER_RETURN_USERID_CANCEL", userId);
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
      const dataChat = {
        typeRoom: "single",
        status: "active",
        members: [
          {
            user_id: myId,
            role: "admin",
          },
          {
            user_id: userId,
            role: "admin",
          },
        ],
      };
      const roomChat = new Room(dataChat);
      await roomChat.save();
      console.log(roomChat.id);

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
                room_chat_id: roomChat.id,
              },
            },
            $pull: { friendAccepts: userId },
          }
        );
        // add A friendList of B .
        await User.updateOne(
          {
            _id: userId,
          },
          {
            $addToSet: {
              friendList: {
                user_id: myId,
                room_chat_id: roomChat.id,
              },
            },
            $pull: { friendRequests: myId },
          }
        );
        console.log("successful");
      } catch (error) {}
    });
  });
};
