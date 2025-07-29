const Cart = require("../../models/cart.model");

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