const Product = require("../../models/product.model");

module.exports.index = async (req, res) => {
  // Tìm tất cả sản phẩm chưa bị xóa và có trạng thái "active"
  let find = {
    deleted: false,
    status: "active",
  };

  const products = await Product.find(find);

  let products1 = products.map((item) => {
    let oldPrice = item.price - (item.price * item.discountPercentage) / 100;

    item["oldPrice"] = oldPrice.toFixed(0); // Thêm trường oldPrice vào item
    return item ;
  });

  res.render("client/pages/product/index", {
    title: "Product",
    products: products1,
  });
};
