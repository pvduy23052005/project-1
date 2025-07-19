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

// [get] admin/category/edit/:id
module.exports.editGet = async (req, res) => {
  const id = req.params.id;
  const find = {
    deleted: false,
    _id: id,
    status: "active",
  };

  const category = await Category.findOne(find);

  const categories = await Category.find({
    deleted: false,
  });

  const categoryTree = buildCategoryTree(categories, "");

  let parentCategory = null;

  if (category.parent_id !== "") {
    parentCategory = await Category.findOne({
      _id: category.parent_id,
    });
  }

  if (!category) {
    req.flash("error", "Danh mục không tồn tại");
    return res.redirect("/admin/category");
  }

  res.render("admin/pages/category/edit", {
    title: "Chỉnh sửa danh mục",
    category: category,
    parentCategory: parentCategory,
    categoryTree: categoryTree,
  });
};

// [patch] admin/category/edit/:id
module.exports.editPatch = async (req, res) => {
  console.log(req.body);

  const thumbnail = req.file ? req.file.path : "";

  if( thumbnail !== ""){
    req.body.thumbnail = thumbnail ; 
  }

  try {
    await Category.updateOne({
      _id: req.params.id,
    } , req.body);
    req.flash("success", "Cập nhật thành công");
  } catch (error) {
    req.flash("error", "Cập nhật thất bại ");
  }

  res.redirect(`/admin/category/edit/${req.params.id}`);
};
