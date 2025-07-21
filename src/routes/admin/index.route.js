const dashboardRoute = require("./dashboard.route");
const systemConfig = require("../../config/system");
const productRoute = require("./product.route");
const categoryRoute = require("./category.route");
const roleRoute = require("./role.route");
const accountRoute = require("./account.route");

module.exports = (app) => {
  const PATH_ADMIN = systemConfig.prefixAdmin;

  app.use(PATH_ADMIN + "/dashboard", dashboardRoute);

  app.use(PATH_ADMIN + "/products", productRoute);

  app.use(PATH_ADMIN + "/category", categoryRoute);

  app.use(PATH_ADMIN + "/role", roleRoute);

  app.use(PATH_ADMIN + "/account", accountRoute);
}
