const Product = require("../../models/product.model");

module.exports.index = async (req, res) => {
  const listButtonStatus = [
    {
      name: "Tất cả",
      status: "",
      class: "",
    },
    {
      name: "Hoạt động",
      status: "active",
    },
    {
      name: "Dừng hoạt động",
      status: "inactive",
    },
  ];

  if (req.query.status) {
    const index = listButtonStatus.findIndex(
      (item) => item.status == req.query.status
    );
    listButtonStatus[index]["class"] = "active";
  } else {
    listButtonStatus[0]["class"] = "active";
  }

  const find = {
    deleted: false,
  };

  if (req.query.status) {
    find["status"] = req.query.status;
  }

  const products = await Product.find(find);

  res.render("admin/pages/product/index", {
    title: "Products",
    products: products,
    listButtonStatus: listButtonStatus,
  });
};
