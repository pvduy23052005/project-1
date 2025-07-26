const Category = require("../../models/category.model");

module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };

  const categories = await Category.find(find);

  res.render("client/pages/home/index", {
    title: "Home",
    categories :categories
  });
};
