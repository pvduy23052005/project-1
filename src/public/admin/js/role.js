//permissions
const rolePermission = document.querySelectorAll("[role-permission]");

if (rolePermission) {
  const buttonSubmit = document.querySelector("[button-submit]");
  const listRoleId = document.querySelectorAll("[name-id]");
  const formPermission = document.querySelector("#form-change-permissions");

  buttonSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    let listPermission = [];

    const permission = document.querySelectorAll("[data-name]");

    listRoleId.forEach((roleId) => {
      const id = roleId.getAttribute("name-id");
      listPermission.push({
        id: id,
        permissions: [],
      });
    });

    permission.forEach((row) => {
      const permissionKey = row.getAttribute("data-name");
      const checkboxes = row.querySelectorAll("input[type='checkbox']");

      checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
          listPermission[index].permissions.push(permissionKey);
        }
      });
    });

    const inputPermission = formPermission.querySelector("[input-permission]");
    if (listPermission.length > 0) {
      inputPermission.value = JSON.stringify(listPermission);
    }
    formPermission.submit();
  });
}
// end permissions
const dataPermission = document.querySelector("[data-permission]");
if (dataPermission) {
  const data = JSON.parse(dataPermission.getAttribute("data-permission"));
  data.forEach((item, index) => {
    const listPermissions = item.permissions;
    listPermissions[0].forEach((namePermission) => {
      const row = document.querySelector(`[data-name="${namePermission}"]`);
      const input = row.querySelectorAll("input")[index];
      input.checked = true;
    });
  });
}
