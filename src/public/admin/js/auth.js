const listInput = document.querySelectorAll(".input-control");

if (listInput.length > 0) {
  listInput.forEach((input, index) => {
    input.addEventListener("blur", () => {
      const textLabel = document.querySelectorAll(".text-label")[index];
      if (input.value.length > 0) {
        textLabel.classList.add("test");
      } else {
        textLabel.classList.remove("test");
      }
    });
  });

  listInput.forEach((input, index) => {
    const textLabel = document.querySelectorAll(".text-label")[index];
    if (input.value.length > 0) {
      textLabel.classList.add("test");
    }
  });
}

//show alert
const showAlert = document.querySelector("[show-alert]");
if (showAlert) {
  const time = parseInt(showAlert.getAttribute("data-time"));
  setTimeout(() => {
    showAlert.classList.add("alert-hidden");
  }, time);
  const closeAlert = showAlert.querySelector("[close-alert]");
  closeAlert.addEventListener("click", (e) => {
    showAlert.classList.add("alert-hidden");
  });
}
// end show alert
