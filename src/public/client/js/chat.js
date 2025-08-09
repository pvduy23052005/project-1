import * as Popper from "https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js";
const socket = io();

// CLIENT_SEND
const formChat = document.querySelector(".chat .inner-form");
if (formChat) {
  formChat.addEventListener("submit", (e) => {
    e.preventDefault();
    if (e.target[0].value) {
      socket.emit("CLIENT_SEND", e.target[0].value);
      e.target[0].value = "";
    }
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
          <div class="inner-content">${data.content}</div>
    `;
    } else {
      div.classList.add("inner-incoming");
      div.innerHTML = `
          <div class="inner-name">${data.fullName}</div>
          <div class="inner-content">${data.content}</div>
    `;
    }
    bodyChat.appendChild(div);
    bodyChat.scrollTop = bodyChat.scrollHeight; // Scroll to the bottom
  } else {
    console.error("Chat body not found");
  }
});

//
const bodyChat = document.querySelector(".chat .inner-body");
if (bodyChat) {
  bodyChat.scrollTop = bodyChat.scrollHeight;
}

// Handle emoji picker
const buttonIcon = document.querySelector(".button-icon");
const tooltip = document.querySelector(".tooltip");
if (buttonIcon) {
  Popper.createPopper(buttonIcon, tooltip);
  buttonIcon.addEventListener("click", () => {
    tooltip.classList.toggle("shown");
  });
}

// Emoji Picker
const emojiPicKer = document.querySelector("emoji-picker");
if (emojiPicKer) {
  emojiPicKer.addEventListener("emoji-click", (e) => {
    const input = document.querySelector(
      ".chat .inner-form input[name='content']"
    );
    const icon = e.detail.unicode;
    input.value += icon;
  });
}
