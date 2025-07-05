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

const search = document.querySelector("#form-search");
if (search) {
  let url = new URL(window.location.href);
  search.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchValue = e.target[0].value;

    if (searchValue) {
      url.searchParams.set("keyword", searchValue);
    } else {
      url.searchParams.delete("keyword");
    }

    e.target[0].value = e.target[0].value.trim();

    windw.location.href = url.href;
  });
}

// pagination
const btn = document.querySelectorAll("[button-page]");
if (btn) {
  btn.forEach((item) => {
    const url = new URL(window.location.href);
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const pageClick = item.getAttribute("button-page");
      console.log(pageClick);
      if (pageClick) {
        url.searchParams.set("page", pageClick);
      } else {
        url.searchParams.delete("page");
      }
      window.location.href = url.href ;
    });
  });
}
// end pagination
