const productRoute = require("./product.route");
const homeRoute = require("./home.route");
const categoryMiddleware = require("../../middlewares/client/category.middleware");
const searchRoute = require("./search.route");
const cartMiddleware = require("../../middlewares/client/cart.middleware.js");
const cartRoute = require("./cart.route.js");

module.exports = (app) => {
  app.use(categoryMiddleware.categoryMiddleware, cartMiddleware.cartMiddleware);

  app.use("/", homeRoute);

  app.use("/products", productRoute);

  app.use("/search", searchRoute);

  app.use("/cart", cartRoute);
};
