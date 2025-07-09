const express = require("express");
const router = express.Router();
const productController = require("../../controllers/admin/product.controller");
const uploadCloud = require("../../middlewares/uploadCloud");
const validateCreateProduct = require("../../validate/product.validate");

router.get("/", productController.index);

router.patch("/change-status/:status/:id", productController.changeStatus);

router.patch("/change-multi", productController.changeMulti);

router.delete("/delete/:id", productController.deleteProduct);

router.get("/create", productController.createProductGet);

router.post(
  "/create",
  uploadCloud.single("thumbnail"),
  validateCreateProduct.validateCreateProduct,
  productController.createProductPost
);

router.get("/edit/:id", productController.editProductGet);

router.patch(
  "/edit/:id",
  uploadCloud.single("thumbnail"),
  validateCreateProduct.validateCreateProduct,
  productController.editProductPatch
);

router.get("/detail/:id", productController.detailProductGet);

module.exports = router;
