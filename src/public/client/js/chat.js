import * as Popper from "https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js";
import { FileUploadWithPreview } from "https://unpkg.com/file-upload-with-preview/dist/index.js";
// import { Viewer } from "viewerjs";

// Initialize file upload preview
const upload = new FileUploadWithPreview("upload-images", {
  multiple: true,
  maxFileCount: 10,
  text: {
    chooseFile: "Chọn ảnh...",
    browse: "Chọn ảnh",
    selectedCount: "ảnh đã chọn",
  },
});

// Convert file to base64
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// CLIENT_SEND
const formChat = document.querySelector(".chat .inner-form");
if (formChat) {
  formChat.addEventListener("submit", async (e) => {
    e.preventDefault();
    const files = upload.cachedFileArray;
    const message = e.target[0].value;
    const images = await Promise.all(files.map((file) => fileToBase64(file)));
    if (message || images) {
      socket.emit("CLIENT_SEND", {
        message: message,
        images: images,
      });
      e.target[0].value = "";
      upload.resetPreviewPanel(); // clear image
    }
  });
}

// SERVER_SENDz-
socket.on("SERVER_SEND", (data) => {
  const bodyChat = document.querySelector(".chat .inner-body");
  const myId = document.querySelector("[my-id]").getAttribute("my-id");
  const listBoxTyping = document.querySelector(".chat .inner-list-typing");
  let htmlFullName = "";
  let htmlImages = [];
  let htmlContent = [];
  if (bodyChat) {
    const div = document.createElement("div");

    if (myId === data.user_id) {
      div.classList.add("inner-outgoing");
    } else {
      div.classList.add("inner-incoming");
      htmlFullName += `
          <div class="inner-name">${data.fullName}</div>
      `;
    }

    if (data.content) {
      htmlContent += `
      <div class="inner-content">${data.content}</div>`;
    }

    if (data.images.length > 0) {
      htmlImages += `<div class = "inner-images">`;
      data.images.forEach((image) => {
        htmlImages += `<img src=${image} alt="">`;
      });
      htmlImages += `</div>`;
    }

    div.innerHTML = `
      ${htmlFullName}
      ${htmlContent}
      ${htmlImages}
    `;

    bodyChat.insertBefore(div, listBoxTyping);
    const gallery = new Viewer(div);
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
    // tin nhan dai qua tu focus o duoi
    const end = input.value.length;
    input.setSelectionRange(end, end);
    input.focus();
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

//  config viewer for image full screen .
const bodyViewer = document.querySelector(".chat .inner-body");
console.log(bodyViewer);
if (bodyViewer) {
  const gallery = new Viewer(bodyViewer);
}
