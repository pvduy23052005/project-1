// add friend
const listBtnAddFriend = document.querySelectorAll("[btn-add-friend]");
if (listBtnAddFriend) {
  listBtnAddFriend.forEach((button) => {
    button.addEventListener("click", (e) => {
      const userId = button.getAttribute("btn-add-friend");
      button.closest(".box-user").classList.add("add");
      if (userId) {
        socket.emit("ADD_FRIEND", userId);
      }
    });
  });
}

// cancel friend .
const listBtnCancelFriend = document.querySelectorAll("[btn-cancel-friend]");
if (listBtnCancelFriend) {
  listBtnCancelFriend.forEach((button) => {
    button.addEventListener("click", (e) => {
      const userId = button.getAttribute("btn-cancel-friend");
      button.closest(".box-user").classList.remove("add");
      socket.emit("CANCEL_FRIEND", userId);
    });
  });
}

// refuse friend  :
const listBtnRefuseFriend = document.querySelectorAll("[btn-refuse-friend]");
if (listBtnRefuseFriend) {
  listBtnRefuseFriend.forEach((button) => {
    button.addEventListener("click", (e) => {
      const userId = button.getAttribute("btn-refuse-friend");
      button.closest(".box-user").classList.add("refuse");
      console.log(userId);
      socket.emit("REFUSE_FRIEND", userId);
    });
  });
}
