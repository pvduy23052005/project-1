const express = require("express");
const router = express.Router();
const productController = require("../../controllers/admin/product.controller");
const uploadCloud = require("../../middlewares/uploadCloud");

router.get("/", productController.index);

router.patch("/change-status/:status/:id", productController.changeStatus);

router.patch("/change-multi", productController.changeMulti);

router.delete("/delete/:id", productController.deleteProduct);

router.get("/create", productController.createProductGet);

router.post("/create",
  uploadCloud.single("thumbnail"),
  productController.createProductPost
);

module.exports = router;
