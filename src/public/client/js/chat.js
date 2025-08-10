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
  const listBoxTyping = document.querySelector(".chat .inner-list-typing");

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
    bodyChat.insertBefore(div, listBoxTyping);
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

// typing .
const input = document.querySelector(".chat .inner-form input[name='content']");
if (input) {
  input.addEventListener("keyup", (e) => {
    socket.emit("CLIENT_TYPING", "show");
  });
}

// SERVER_SEND_TYPING
const listBoxTyping = document.querySelector(".chat .inner-list-typing");
if (listBoxTyping) {
  socket.on("SERVER_SEND_TYPING", (data) => {
    const existing = listBoxTyping.querySelector(`[user-id="${data.user_id}"]`);
    console.log(existing);
    if (!existing) {
      const div = document.createElement("div");
      div.classList.add("box-typing");
      div.setAttribute("user-id", data.user_id);
      div.innerHTML = `
        <div class="inner-name">${data.fullName}</div>
        <div class="inner-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      `;
      listBoxTyping.appendChild(div);
      setTimeout(() => {
        listBoxTyping.removeChild(div);
      }, 3000);
      bodyChat.scrollTop = bodyChat.scrollHeight;
    }
  });
}
