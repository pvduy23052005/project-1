const Product = require("../../models/product.model");
const newPriceProduct = require("../../helpers/client/newPriceProduct.js");

// [get] /
module.exports.index = async (req, res) => {
  const keyword = req.query.keyword;
  const find = {
    deleted: false,
    status: "active",
  };

  if (keyword) {
    const regex = new RegExp(keyword, "i");
    find["title"] = regex;
  }
  const products = await Product.find(find);

  const newProduct = newPriceProduct(products);
  res.render("client/pages/search/index", {
    title: keyword,
    products: newProduct,
  });
};
