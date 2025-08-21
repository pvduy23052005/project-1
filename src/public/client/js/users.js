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
