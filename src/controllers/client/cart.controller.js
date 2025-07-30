const Cart = require("../../models/cart.model");
const Product = require("../../models/product.model");

// [get] /cart/add/:id
module.exports.addPost = async (req, res) => {
  const productId = req.params.id;
  const quantity = parseInt(req.body.quantity);

  const product = {
    product_id: productId,
    quantity: quantity,
  };
  const idCart = req.cookies.cartId;
  const cart = await Cart.findOne({
    _id: idCart,
  });
  // find product da ton tai trong gio hang .
  const existingProduct = cart.products.find(
    (item) => item.product_id.toString() === productId
  );
  if (existingProduct) {
    existingProduct.quantity += quantity;
    // Cố gắng cập nhật số lượng nếu sản phẩm đã tồn tại
    const updateResult = await Cart.updateOne(
      {
        _id: idCart,
        "products.product_id": productId,
      },
      {
        $set: { "products.$.quantity": existingProduct.quantity },
      }
    );
  } else {
    await Cart.updateOne(
      {
        _id: idCart,
      },
      {
        $push: {
          products: product,
        },
      }
    );
  }

  res.send("ok");
};

// [get] /cart
module.exports.index = async (req, res) => {
  const cartId = req.cookies.cartId;

  const cart = await Cart.findOne({
    _id: cartId,
  });
  let products = [];
  let totalPrice = 0;
  for (const item of cart.products) {
    const product = await Product.findOne({
      _id: item.product_id,
    });
    let oldPrice =
      product.price - (product.price * product.discountPercentage) / 100;
    product["oldPrice"] = oldPrice.toFixed(0);
    totalPrice += parseInt(product.oldPrice * item.quantity);

    product.quantity = item.quantity;

    products.push(product);
  }

  res.render("client/pages/cart/index", {
    title: "Cart",
    products: products,
    totalPrice: totalPrice,
  });
};

// [get] /cart/delete/:id
module.exports.delete = async (req, res) => {
  const cartId = req.cookies.cartId;
  const productId = req.params.id;

  try {
    await Cart.updateOne(
      {
        _id: cartId,
      },
      {
        $pull: {
          products: { product_id: productId },
        },
      }
    );
    req.flash("success", "Thanh cong !");
  } catch {
    req.flash("error", "That bai !");
  }
  res.redirect("/cart");
};

// [get] /cart/update/:id/:quantity
module.exports.update = async (req, res) => {
  const cartId = req.cookies.cartId;
  const quantity = parseInt(req.params.quantity);
  const productId = req.params.id;

  if (quantity < 1) return res.redirect("/cart");

  await Cart.updateOne(
    {
      _id: cartId,
      "products.product_id": productId,
    },
    {
      $set: {
        "products.$.quantity": quantity,
      },
    }
  );

  req.flash("success", "Cập nhật số lượng thành công");
  res.redirect("/cart");
};
