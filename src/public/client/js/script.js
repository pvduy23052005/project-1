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