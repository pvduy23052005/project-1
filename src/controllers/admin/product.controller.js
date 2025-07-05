const Product = require("../../models/product.model");
const listButtonStatusHelpers = require("../../helpers/listButtonStatus");
const pagenationHelpers = require("../../helpers/pagination");

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
