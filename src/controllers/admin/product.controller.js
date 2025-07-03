const Product = require("../../models/product.model");


module.exports.index = async (req , res) => {

  const find = {
    deleted: false , 
  }

  const products = await Product.find(find);

  res.render("admin/pages/product/index", {
    title: "Products",
    products : products,
  });
}