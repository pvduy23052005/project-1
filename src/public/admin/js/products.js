const listBtn = document.querySelectorAll("[change-status]");

if (listBtn.length > 0) {
  const formChangeStatus = document.querySelector("#form-change-status"); 
  const path = formChangeStatus.getAttribute("data-path");

  listBtn.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const changeStatus = item.getAttribute("change-status");
      let [status , id] = changeStatus.split("-");

      let newStatus = status === "active" ? "inactive" : "active" ;

      let action = `${path}/${newStatus}/${id}?_method=PATCH`;

      formChangeStatus["action"] = action ;

      formChangeStatus.submit();
    });
  });
}
