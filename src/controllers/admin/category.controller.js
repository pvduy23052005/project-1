const Category = require("../../models/category.model");
const buildCategoryTree = require("../../helpers/buildCategoryTree.js");

// [get] admin/category
module.exports.index = async (req, res) => {
  const find = {
    deleted: false,
  };

  const categories = await Category.find(find);

  const categoryTree = buildCategoryTree(categories, "");

  res.render("admin/pages/category/index", {
    title: "Category Management",
    categoryTree: categoryTree,
  });
};

// [get] admin/category/create
module.exports.createGet = async (req, res) => {
  let find = {
    deleted: false, // Chỉ lấy các danh mục chưa bị xóa
  };

  const categories = await Category.find(find);

  const categoryTree = buildCategoryTree(categories, "");

  res.render("admin/pages/category/create", {
    title: "Create Category",
    categoryTree: categoryTree,
  });
};

// [post] admin/category/create
module.exports.createPost = async (req, res) => {
  let find = {
    deleted: false,
  };

  const thumbnail = req.file ? req.file.path : "";
  req.body.thumbnail = thumbnail;
  if (req.body.position == "") {
    const couter = await Category.countDocuments(find);
    req.body.position = couter + 1;
  } else {
    res.body.postion = parseInt(req.body.position);
  }

  try {
    const newCategory = new Category(req.body);
    await newCategory.save();
    req.flash("success", "Tạo mới thành công");
  } catch (error) {
    req.flash("error", "Tạo mới thất bại: " + error.message);
  }

  res.redirect("/admin/category");
};
