const listButtonChangeStatus = document.querySelectorAll("[change-status]");
if (listButtonChangeStatus.length > 0) {
  const formChangeStatus = document.querySelector("#form-change-status");
  const path = formChangeStatus.getAttribute("data-path");
  const CurrentPage = formChangeStatus.getAttribute("currentPage");

  listButtonChangeStatus.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const changeStatus = item.getAttribute("change-status");
      let [status, id] = changeStatus.split("-");

      let newStatus = status === "active" ? "inactive" : "active";

      let action = `${path}/${newStatus}/${id}?_method=PATCH&page=${CurrentPage}`;

      formChangeStatus["action"] = action;

      formChangeStatus.submit();
    });
  });
}

// change-multi
const table = document.querySelector("[checkbox-all]");
if (table) {
  const inputCheckAll = table.querySelector('input[name="checkAll"]');
  const listInput = table.querySelectorAll("input[name='id']");
  inputCheckAll.addEventListener("change", (e) => {
    if (inputCheckAll.checked == true) {
      listInput.forEach((item) => {
        item.checked = true;
      });
    } else {
      listInput.forEach((item) => {
        item.checked = false;
      });
    }
  });

  listInput.forEach((input) => {
    input.addEventListener("click", (e) => {
      //lay ra o input da tich .
      const count = table.querySelectorAll("input[name='id']:checked").length;
      if (count === 4) {
        inputCheckAll.checked = true;
      } else {
        inputCheckAll.checked = false;
      }
    });
  });
}

const formChangeMulti = document.querySelector("#form-change-multi");
if (formChangeMulti) {
  formChangeMulti.addEventListener("submit", (e) => {
    e.preventDefault();
    // lay ra cac input da checked .
    const table = document.querySelector("[checkbox-all]");
    const inputChecked = table.querySelectorAll("input[name='id']:checked");
    const inputSubmit = formChangeMulti.querySelector("input[name='listId']");

    const typeChange = e.target[0].value;
    if (typeChange === "delete") {
      const isConfirm = confirm(
        "Bạn có chắc chắn muốn xóa các sản phẩm này không?"
      );
      if (isConfirm === false) return;
    }

    if (inputChecked.length > 0) {
      let listId = [];
      inputChecked.forEach((item) => {
        const id = item.getAttribute("value");
        listId.push(id);
      });

      inputSubmit.value = listId.join("-");

      formChangeMulti.submit();
    }
  });
}
// end change-multi

// delete product
const listBtn = document.querySelectorAll("[button-delete]");
if (listBtn.length > 0) {
  listBtn.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const isConfirm = confirm(
        "Bạn có chắc chắn muốn xóa sản phẩm này không?"
      );

      if (isConfirm) {
        const id = item.getAttribute("data-id");
        const formChangeStatus = document.querySelector("#form-delete");
        const path = formChangeStatus.getAttribute("data-path");
        let action = `${path}/${id}?_method=DELETE`;
        formChangeStatus["action"] = action;
        formChangeStatus.submit();
      }
    });
  });
}
// end delete product

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

// preview image
const thumbnailInput = document.querySelector("#thumbnail");
if (thumbnailInput) {
  thumbnailInput.addEventListener("change", (e) => {
    const preview = document.querySelector("#preview");
    const file = e.target.files[0];
    if (file) {
      if (file) {
        const img = document.querySelector("#preview");
        img.src = URL.createObjectURL(file);
      }
    } else {
      img.src = "";
    }
  });
}
// end preview image

//sort select
const sort = document.querySelector("[sort-select]");
if (sort) {
  const url = new URL(window.location.href);
  const sortClear = document.querySelector("[sort-clear]");

  sort.addEventListener("change", (e) => {
    e.preventDefault();
    const [sortKey, sortValue] = e.target.value.split("-");
    url.searchParams.set("sortKey", sortKey);
    url.searchParams.set("sortValue", sortValue);
    window.location.href = url.href;
  });

  sortClear.addEventListener("click", (e) => {
    e.preventDefault();
    url.searchParams.delete("sortKey");
    url.searchParams.delete("sortValue");
    window.location.href = url.href;
  });

  const sortKey = url.searchParams.get("sortKey");
  const sortValue = url.searchParams.get("sortValue");
  if (sortKey && sortValue) {
    const selectOption = sort.querySelector(
      `option[value="${sortKey}-${sortValue}"]`
    );
    if (selectOption) {
      selectOption.selected = true;
    }
  }
}
// end sort select
