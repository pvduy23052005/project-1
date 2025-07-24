const Product = require("../../models/product.model");
const listButtonStatusHelpers = require("../../helpers/listButtonStatus");
const pagenationHelpers = require("../../helpers/pagination");
const Category = require("../../models/category.model");
const buildCategoryTree = require("../../helpers/buildCategoryTree.js");
const Account = require("../../models/account.model.js");

//[get] admin/products
module.exports.index = async (req, res) => {
  const find = {
    deleted: false,
  };

  if (req.query.status) {
    find["status"] = req.query.status;
  }

  if (req.query.keyword) {
    const regex = new RegExp(req.query.keyword, "i");
    find["title"] = regex;
  }

  // pagination
  const countProducts = await Product.countDocuments(find);

  let objectPagination = pagenationHelpers(
    {
      limitItem: 4,
      currentPage: 1,
    },
    req.query,
    countProducts
  );

  // sort .
  let sort = {};

  if (req.query.sortKey && req.query.sortValue) {
    sort[req.query.sortKey] = req.query.sortValue;
  } else {
    sort.position = "desc";
  }

  const products = await Product.find(find)
    .sort(sort)
    .limit(objectPagination.limitItem)
    .skip(objectPagination.skip);

  for (const product of products) {
    const user = await Account.findOne({
      _id: product.createBy.account_id,
    });

    if (user) {
      product.userCreate = user.fullName;
    } else {
      product.userCreate = "Chưa có người tạo ";
    }
  }

  res.render("admin/pages/product/index", {
    title: "Products",
    products: products,
    listButtonStatus: listButtonStatusHelpers(req.query.status),
    keyword: req.query.keyword || "",
    pagination: objectPagination,
  });
};

//[patch] admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
  const newStatus = req.params.status;
  const id = req.params.id;

  try {
    await Product.updateOne({ _id: id }, { status: newStatus });
    req.flash("success", "Cập nhật trạng thái sản phẩm thành công");
    res.redirect(`/admin/products?page=${req.query.page || 1}`);
  } catch (error) {
    console.log("Lỗi:", error);
    res.redirect("back");
  }
};

//[patch] admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
  const { type, listId } = req.body;

  const arrayId = listId.split("-");

  switch (type) {
    case "active":
      try {
        await Product.updateMany({ _id: { $in: arrayId } }, { status: type });
        req.flash("success", "Cập nhật trạng thái sản phẩm thành công");
      } catch (error) {}
      break;
    case "inactive":
      try {
        await Product.updateMany({ _id: { $in: arrayId } }, { status: type });
        req.flash("success", "Cập nhật trạng thái sản phẩm thành công");
      } catch (error) {
        console.log("Lỗi:", error);
        return res.status(500).send("Lỗi khi cập nhật trạng thái sản phẩm");
      }
      break;
    case "delete":
      try {
        await Product.updateMany(
          { _id: { $in: arrayId } },
          {
            deleted: true,
            deletedBy: {
              account_id: res.locals.id,
              deleteTime: new Date(),
            },
          }
        );
        req.flash("success", "Xóa sản phẩm thành công");
      } catch (error) {
        console.log("Lỗi:", error);
        return res.status(500).send("Lỗi khi xóa sản phẩm");
      }
      break;
    default:
      break;
  }

  res.redirect("/admin/products");
};

//[patch] admin/p    res.redirect(`/admin/products`);roducts/delete/:id
module.exports.deleteProduct = async (req, res) => {
  const id = req.params.id;

  try {
    await Product.updateOne(
      { _id: id },
      {
        deleted: true,
        deletedBy: {
          account_id: res.locals.user.id,
          deleteTime: new Date(),
        },
      }
    );
    req.flash("success", "Xóa sản phẩm thành công");
  } catch (error) {
    console.log("Lỗi:", error);
    return res.status(500).send("Lỗi khi xóa sản phẩm");
  }

  res.redirect("/admin/products?page=1");
};

//[get] admin/products/create
module.exports.createProductGet = async (req, res) => {
  const find = {
    deleted: false,
  };

  const category = await Category.find(find);

  const categories = buildCategoryTree(category, "");

  res.render("admin/pages/product/create", {
    title: "Thêm sản phẩm",
    categories: categories,
  });
};

//[post] admin/products/create
module.exports.createProductPost = async (req, res) => {
  const find = {
    deleted: false,
  };

  try {
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);

    if (req.body.position === "") {
      req.body.position = await Product.countDocuments(find);
    } else {
      req.body.position = parseInt(req.body.position);
    }

    if (req.file && req.file.path) {
      req.body.thumbnail = req.file.path;
    }

    // luu thong tin boi ai
    req.body.createBy = {
      account_id: res.locals.user.id,
    };

    const product = new Product(req.body);
    await product.save();

    req.flash("success", "Thêm mới thành công");
    res.redirect("/admin/products?page=1");
  } catch (error) {}
};

//[get] admin/products/edit/:
module.exports.editProductGet = async (req, res) => {
  try {
    const id = req.params.id;
    const editProduct = await Product.findOne({ _id: id, deleted: false });

    const find = {
      deleted: false,
    };
    const category = await Category.find(find);
    const categoryTree = buildCategoryTree(category, "");

    res.render("admin/pages/product/edit", {
      title: "Chỉnh sửa sản phẩm",
      product: editProduct,
      categoryTree: categoryTree,
    });
  } catch (error) {
    req.flash("error", "Không tìm thấy sản phẩm");
    res.redirect("/admin/products?page=1");
  }
};

//[Patch] admin/products/edit/:
module.exports.editProductPatch = async (req, res) => {
  try {
    if (req.file) {
      req.body.thumbnail = req.file.path;
    }
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    req.body.position = parseInt(req.body.position);

    await Product.updateOne({ _id: req.params.id }, req.body);
    req.flash("success", "Cập nhật sản phẩm thành công");
    res.redirect("/admin/products/edit/" + req.params.id);
  } catch (error) {
    req.flash("error", "Cập nhật sản phẩm thất bại");
    res.redirect("/admin/products/edit/" + req.params.id);
  }
};

//[get] admin/products/detail/:id
module.exports.detailProductGet = async (req, res) => {
  try {
    const find = {
      deleted: false,
      _id: req.params.id,
    };
    const product = await Product.findOne(find);
    if (!product) {
      req.flash("error", "Không tìm thấy sản phẩm");
      return res.redirect("/admin/products?page=1");
    }
    res.render("admin/pages/product/detail", {
      title: "Chi tiết sản phẩm",
      product: product,
    });
  } catch (error) {
    console.log("Lỗi:", error);
    req.flash("error", "Lỗi khi lấy thông tin sản phẩm");
    res.redirect("/admin/products?page=1");
  }
};
