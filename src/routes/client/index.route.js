const productRoute = require("./product.route");
const homeRoute = require("./home.route");
const categoryMiddleware = require("../../middlewares/client/category.middleware");
const searchRoute = require("./search.route");
const cartMiddleware = require("../../middlewares/client/cart.middleware.js");
const cartRoute = require("./cart.route.js");
const checkoutRoute = require("./checkout.route.js");
const userRoute = require("./user.route.js");
const userMiddleware = require("../../middlewares/client/user.middleware.js");
const chatRoute = require("./chat.route.js");
const usersRoute = require("./users.route.js");

module.exports = (app) => {
  app.use(
    categoryMiddleware.categoryMiddleware,
    cartMiddleware.cartMiddleware,
    userMiddleware.userMiddleware
  );

  app.use("/", homeRoute);

  app.use("/products", productRoute);

  app.use("/search", searchRoute);

  app.use("/cart", cartRoute);

  app.use("/checkout", checkoutRoute);

  app.use("/user", userRoute);

  app.use("/chat", chatRoute);

  app.use("/users", usersRoute);
};
