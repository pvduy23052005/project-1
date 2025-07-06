const Product = require("../../models/product.model");
const listButtonStatusHelpers = require("../../helpers/listButtonStatus");
const pagenationHelpers = require("../../helpers/pagination");

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

  const products = await Product.find(find)
    .sort( { position : "desc"})
    .limit(objectPagination.limitItem)
    .skip(objectPagination.skip);

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
    res.redirect("/admin/products?page=1");
  } catch (error) {
    console.log("Lỗi:", error);
    res.redirect("/admin/products");
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
      } catch (error) {
        
      }
      break ;
    case "inactive":
      try {
        await Product.updateMany({ _id: { $in: arrayId } }, { status: type });
      } catch (error) {
        console.log("Lỗi:", error);
        return res.status(500).send("Lỗi khi cập nhật trạng thái sản phẩm");
      }
      break ;
    case "delete": 
      try {
        await Product.updateMany({ _id: { $in: arrayId } }, { deleted: true });
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

//[patch] admin/products/delete/:id
module.exports.deleteProduct = async (req, res) => {
  const id = req.params.id; 

  try {
    await Product.updateOne({ _id: id }, { deleted: true });
    // await Product.deleteOne({ _id: id }); // Xóa vĩnh viễn
  } catch (error) {
    console.log("Lỗi:", error);
    return res.status(500).send("Lỗi khi xóa sản phẩm");
  }

  res.redirect("/admin/products?page=1");
}
