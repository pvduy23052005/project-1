const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/account.controller");
const uploadCloud = require("../../middlewares/uploadCloud");

router.get("/", controller.index);

router.get("/create", controller.createGet);

router.post("/create", uploadCloud.single("avatar"), controller.createPost);

module.exports = router;
