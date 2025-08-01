const express = require("express");
const router = express.Router();
const controller = require("../../controllers/client/user.controller.js");

router.get("/register", controller.register);

router.post("/register", controller.registerPost);

router.get("/login", controller.login);

router.post("/login", controller.loginPost);

router.get("/logout", controller.logout);

module.exports = router;
