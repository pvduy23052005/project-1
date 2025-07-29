const Cart = require("../../models/cart.model");

module.exports.cartMiddleware = async (req, res, next) => {
  // cart undefind
  if (!req.cookies.cartId) {
    const cart = new Cart();
    await cart.save();
    const expiresCookie = 30 * 24 * 60 * 60 * 1000; // 1 năm (miliseconds)
    res.cookie("cartId", cart.id, {
      expires: new Date(Date.now() + expiresCookie), // Cookie hết hạn sau 1 năm
    });
  } else {
    const cart = await Cart.findOne({
      _id: req.cookies.cartId,
    });
    let count = 0;
    for (const product of cart.products) {
      console.log(product);
      count += product.quantity;
    }
    res.locals.quantityProduct = count;
  }
  next();
};
