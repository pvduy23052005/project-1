const express = require("express");
const router = express.Router();
const productController = require("../../controllers/client/product.controller");

router.get("/", productController.index );

router.get("/:slugCategory" , productController.category );

// router.get("/:slug" , productController.detail );

module.exports = router;