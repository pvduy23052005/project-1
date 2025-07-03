const Product = require("../../models/product.model");
const listButtonStatusHelpers = require("../../helpers/listButtonStatus");

module.exports.index = async (req, res) => {
  
  const find = {
    deleted: false,
  };

  if (req.query.status) {
    find["status"] = req.query.status;
  }

  if( req.query.keyword ) {
    const regex = new RegExp(req.query.keyword, "i");
    find["title"] = regex;  
  }
  
  const products = await Product.find(find);

  res.render("admin/pages/product/index", {
    title: "Products",
    products: products,
    listButtonStatus: listButtonStatusHelpers(req.query.status),
    keyword: req.query.keyword || "",
  });
};
