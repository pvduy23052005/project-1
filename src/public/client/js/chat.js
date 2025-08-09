const socket = io();

// CLIENT_SEND
const formChat = document.querySelector(".chat .inner-form");
if (formChat) {
  formChat.addEventListener("submit", (e) => {
    e.preventDefault();
    socket.emit("CLIENT_SEND", e.target[0].value);
    e.target[0].value = "";
  });
}

// SERVER_SEND
socket.on("SERVER_SEND", (data) => {
  const bodyChat = document.querySelector(".chat .inner-body");
  const myId = document.querySelector("[my-id]").getAttribute("my-id");
  if (bodyChat) {
    const div = document.createElement("div");
    if (myId === data.user_id) {
      div.classList.add("inner-outgoing");
      div.innerHTML = `
          <div class="inner-content">${data.content}</>
    `;
    } else {
      div.classList.add("inner-incoming");
      div.innerHTML = `
          <div class="inner-name">${data.fullName}</>
          <div class="inner-content">${data.content}</>
    `;
    }
    bodyChat.appendChild(div);
    bodyChat.scrollTop = bodyChat.scrollHeight; // Scroll to the bottom
  } else {
    console.error("Chat body not found");
  }
});
