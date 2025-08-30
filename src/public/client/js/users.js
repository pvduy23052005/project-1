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

// SERVER_RETURN_LENGTH_FRIENDACCEPTS
const badge = document.querySelector("[badge-user-accept]");
if (badge) {
  socket.on("SERVER_RETURN_LENGTH_FRIENDACCEPTS", (data) => {
    const countFriendAccept = data.countFriendAccept;
    const id = badge.getAttribute("badge-user-accept");
    if (data.userId == id) {
      badge.textContent = countFriendAccept;
    }
  });
}

// SERVER_RETURN_INFOUSER
const listUserAccept = document.querySelector("[data-user-accept]");
socket.on("SERVER_RETURN_INFOUSER", (data) => {
  const userId = listUserAccept.getAttribute("data-user-accept");
  if (data.userId == userId) {
    const divInfo = document.createElement("div");
    divInfo.classList.add("col-6");
    divInfo.innerHTML = `
      <div class="box-user">
        <div class="inner-avatar">
          <img src= ${
            data.infoMyId.avatar
              ? data.infoMyId.avatar
              : "/client/image/user-avatar.png"
          } alt="${data.fullName}">
        </div>
        <div class="inner-info">
          <div class="inner-name">${data.infoMyId.fullName}</div>
          <div class="inner-buttons">
            <button class="btn btn-sm btn-primary m-1" btn-accept-friend=${
              data.infoMyId._id
            }>
              Chấp nhận
            </button>
            <button class="btn btn-sm btn-primary m-1" btn-accepted-friend=${
              data.infoMyId._id
            } disabled>
              Đã Chấp nhận
            </button>
            <button class="btn btn-sm btn-secondary m-1" btn-refuse-friend=${
              data.infoMyId._id
            }>
              Hủy
            </button>
            <button class="btn btn-sm btn-secondary m-1" btn-deleted-friend=${
              data.infoMyId._id
            } disabled>
              Đã xóa
            </button>
          </div>
        </div>
      </div>
    `;
    listUserAccept.appendChild(divInfo);
    // accept friend .
    const btnAccept = divInfo.querySelector("[btn-accept-friend]");
    btnAccept.addEventListener("click", (e) => {
      const userId = btnAccept.getAttribute("btn-accept-friend");
      btnAccept.closest(".box-user").classList.add("accepted");
      socket.emit("ACCEPT_FRIEND", userId);
    });
    // refuse firend .
    const btnRefuse = divInfo.querySelector("[btn-refuse-friend]");
    btnRefuse.addEventListener("click", (e) => {
      const userId = btnRefuse.getAttribute("btn-refuse-friend");
      btnRefuse.closest(".box-user").classList.add("refuse");
      socket.emit("REFUSE_FRIEND", userId);
    });
  }
});

// cancel friend
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
      socket.emit("REFUSE_FRIEND", userId);
    });
  });
}

// accept friend .
const btnAcceptFriend = document.querySelectorAll("[btn-accept-friend]");
if (btnAcceptFriend) {
  btnAcceptFriend.forEach((button) => {
    button.addEventListener("click", (e) => {
      const userId = button.getAttribute("btn-accept-friend");
      button.closest(".box-user").classList.add("accepted");
      socket.emit("ACCEPT_FRIEND", userId);
    });
  });
}
