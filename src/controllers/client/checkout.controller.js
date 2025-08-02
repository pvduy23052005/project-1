const Cart = require("../../models/cart.model");
const Product = require("../../models/product.model");
const Order = require("../../models/order.model");

// [get] /checkout
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

  res.render("client/pages/checkout/index", {
    title: "Checkout",
    products: products,
    totalPrice: totalPrice,
  });
};

// [post] /checkout/order
module.exports.checkoutPost = async (req, res) => {
  const cartId = req.cookies.cartId;
  const userInfo = req.body;


  try {
    const cart = await Cart.findOne({
      _id: cartId,
    });

    let products = [];

    for (const item of cart.products) {
      const product = await Product.findOne({
        _id: item.product_id,
      })
        .select("price discountPercentage")
        .lean();
      product.quantity = item.quantity;
      products.push(product);
    }
    const orderInfo = {
      user_id: "",
      cart_id: cartId,
      userInfo: userInfo,
      products: products,
    };

    const order = new Order(orderInfo);

    await order.save();
    await Cart.updateOne(
      {
        _id: cartId,
      },
      {
        products: [],
      }
    );
    // req.flash("success", "successfull payment");
    res.redirect(`/checkout/success/${order.id}`);
  } catch (error) {
    console.error("❌ Lỗi khi xử lý đơn hàng:", error);
    res.redirect("/cart");
  }
};

// [get] /checkout/success/:orderId
module.exports.checkoutSuccess = async (req, res) => {
  res.render("client/pages/checkout/success", {
    title: "Successful order",
  });
};
