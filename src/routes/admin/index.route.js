const dashboardRoute = require("./dashboard.route");
const systemConfig = require("../../config/system");
const productRoute = require("./product.route");
const categoryRoute = require("./category.route");
const roleRoute = require("./role.route");
const accountRoute = require("./account.route");
const authRoute = require("./auth.route");
const authPrivate = require("../../middlewares/auth.middleware");
const settingRoute = require("./setting.route");

module.exports = (app) => {
  const PATH_ADMIN = systemConfig.prefixAdmin;

  app.use(PATH_ADMIN + "/dashboard", authPrivate.authPrivate, dashboardRoute);

  app.use(PATH_ADMIN + "/products", authPrivate.authPrivate, productRoute);

  app.use(PATH_ADMIN + "/category", authPrivate.authPrivate, categoryRoute);

  app.use(PATH_ADMIN + "/role", authPrivate.authPrivate, roleRoute);

  app.use(PATH_ADMIN + "/account", authPrivate.authPrivate, accountRoute);

  app.use(PATH_ADMIN + "/auth", authRoute);

  app.use(PATH_ADMIN + "/setting", settingRoute);
};
