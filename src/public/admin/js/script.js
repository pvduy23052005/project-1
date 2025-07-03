// button status
const btnStatus = document.querySelectorAll("[button-status]");
if (btnStatus.length > 0) {
  btnStatus.forEach((button) => {
    const url = new URL(window.location.href);
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const status = button.getAttribute("button-status");

      if (status) {
        url.searchParams.set("status", status);
      } else {
        url.searchParams.delete("status");
      }

      button.classList.add("active");

      window.location.href = url.href;
    });
  });
}
// end  button status

