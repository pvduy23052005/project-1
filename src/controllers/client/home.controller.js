const Product = require("../../models/product.model");
const newPriceProduct = require("../../helpers/client/newPriceProduct");

module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
    featured: "1",
    status: "active",
  };

  const products = await Product.find(find).sort({ position: "desc" }).limit(6);

  const newProduct = newPriceProduct(products);

  res.render("client/pages/home/index", {
    title: "Home",
    products: newProduct,
  });
};