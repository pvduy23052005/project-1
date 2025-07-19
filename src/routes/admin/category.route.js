const express = require("express");
const router = express.Router();
const categoryController = require("../../controllers/admin/category.controller");
const uploadCloud = require("../../middlewares/uploadCloud");

router.get("/", categoryController.index);

router.get("/create", categoryController.createGet);

router.post(
  "/create",
  uploadCloud.single("thumbnail"),
  categoryController.createPost
);

router.get("/edit/:id" , categoryController.editGet);

router.patch(
  "/edit/:id",
  uploadCloud.single("thumbnail"),
  categoryController.editPatch
);

module.exports = router;
