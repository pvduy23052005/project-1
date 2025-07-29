const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    user_id: String,
    products: [
      {
        product_id: String,
        quantity: Number,
      },
    ],  
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Cart", cartSchema, "carts");

module.exports = Product;
