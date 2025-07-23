const Role = require("../../models/roles.model");

// [get] /admin/role
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };

  const roles = await Role.find(find);

  res.render("admin/pages/role/index", {
    title: "role",
    roles: roles,
  });
};

// [get] /admin/role/create
module.exports.createGet = (req, res) => {
  res.render("admin/pages/role/create", {
    title: "Thêm nhóm quyền",
  });
};

// [post] /admin/role/create
module.exports.createPost = async (req, res) => {
  try {
    const newRole = new Role(req.body);
    await newRole.save();
    req.flash("success", "thanh vong");
  } catch (error) {
    req.flash("error", "that bai");
  }
  res.redirect("/admin/role");
};

// [get] /admin/role/permission .
module.exports.permissionGet = async (req, res) => {
  let find = {
    deleted: false,
  };

  const roles = await Role.find(find);

  res.render("admin/pages/role/permission", {
    title: "permission",
    roles: roles,
  });
};

// [patch] /admin/roles/permission .
module.exports.permissionPatch = async (req, res) => {
  try {
    const listPermission = JSON.parse(req.body.permissions);
    for (const item of listPermission) {
      const roleId = item.id;
      const permissions = item.permissions;

      await Role.updateOne(
        {
          _id: roleId,
        },
        {
          permissions: permissions,
        }
      );
    }
    req.flash("success", "Cập nhật thành công ");
    res.redirect("/admin/role/permission");
  } catch (error) {
    req.flash("error", "Cập nhật thất bại");
    res.redirect("/admin/role/permission");
  }
};
