const productRoute = require("./product.route");
const homeRoute = require("./home.route");
const categoryMiddleware = require("../../middlewares/client/category.middleware");

module.exports = (app) => {
  app.use(categoryMiddleware.categoryMiddleware);

  app.use("/", homeRoute);

  app.use("/products", productRoute);
};
