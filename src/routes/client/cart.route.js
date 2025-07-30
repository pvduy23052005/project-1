const express = require("express");
const router = express.Router();
const controller = require("../../controllers/client/cart.controller.js");

router.get("/", controller.index);

router.post("/add/:id", controller.addPost);

router.get("/delete/:id", controller.delete);

router.get("/update/:id/:quantity", controller.update);

module.exports = router;
