const listBtn = document.querySelectorAll("[change-status]");

if (listBtn.length > 0) {
  const formChangeStatus = document.querySelector("#form-change-status");
  const path = formChangeStatus.getAttribute("data-path");

  listBtn.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const changeStatus = item.getAttribute("change-status");
      let [status, id] = changeStatus.split("-");

      let newStatus = status === "active" ? "inactive" : "active";

      let action = `${path}/${newStatus}/${id}?_method=PATCH`;

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
