const Product = require("../../models/product.model");
const newPriceProduct = require("../../helpers/client/newPriceProduct.js");
const Category = require("../../models/category.model.js");
const getSubCategory = require("../../helpers/client/getSubCategory.js");

// [get] /
module.exports.index = async (req, res) => {
  // Tìm tất cả sản phẩm chưa bị xóa và có trạng thái "active"
  let find = {
    deleted: false,
    status: "active",
  };

  const products = await Product.find(find).sort({
    position: "desc",
    createdAt: -1,
  }); // Sắp xếp theo vị trí và ngày tạo

  const newProduct = newPriceProduct(products);

  res.render("client/pages/product/index", {
    title: "Product",
    products: newProduct,
  });
};

// [get] /products/detail/:slug
module.exports.detail = async (req, res) => {
  const slug = req.params.slug;

  try {
    const find = {
      status: "active",
      slug: slug,
    };

    const product = await Product.findOne(find);

    if (!product) {
      req.flash("warning", "Không có sản phẩm");
      res.redirect("/products");
      return;
    }

    res.render("client/pages/product/detail.pug", {
      title: "Chi tiết sản phẩm",
      product: product,
    });
  } catch {}
};

// [get] /products/:slugCategory
module.exports.category = async (req, res) => {
  const slugCategory = req.params.slugCategory;
  const idCategory = await Category.findOne({
    slug: slugCategory,
  });

  const listCategory = await getSubCategory.getSubCategory(idCategory.id);
  const listCategoryId = listCategory.map((item) => item.id);

  let find = {
    category: { $in: [idCategory.id, ...listCategoryId] },
    deleted: false,
    status: "active",
  };

  const products = await Product.find(find);
  const newProduct = newPriceProduct(products);
  res.render("client/pages/product/index", {
    title: idCategory.title,
    products: newProduct,
  });
};
