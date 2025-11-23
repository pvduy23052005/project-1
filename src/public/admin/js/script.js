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
    console.log(searchValue);

    if (searchValue) {
      url.searchParams.set("keyword", searchValue);
    } else {
      url.searchParams.delete("keyword");
    }

    e.target[0].value = e.target[0].value.trim();

    window.location.href = url.href;
  });
}

// pagination
const btn = document.querySelectorAll("[button-page]");
if (btn) {
  const url = new URL(window.location.href);
  // Get the current page from the URL or default to 1
  const currentPage = parseInt(url.searchParams.get("page")) || 1;


  btn.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const pageClick = item.getAttribute("button-page");

      if (pageClick) {
        url.searchParams.set("page", pageClick);
      } else {
        url.searchParams.set("page", currentPage);
      }
      window.location.href = url.href;
    });
  });
}
// end pagination
