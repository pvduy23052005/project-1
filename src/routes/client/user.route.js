const express = require("express");
const router = express.Router();
const controller = require("../../controllers/client/user.controller.js");

router.get("/register", controller.register);

router.post("/register", controller.registerPost);

router.get("/login", controller.login);

router.post("/login", controller.loginPost);

router.get("/logout", controller.logout);

router.get("/password/forget", controller.forgetPassword);

router.post("/password/forget", controller.forgetPasswordPost);

router.get("/password/otp", controller.otp);

router.post("/password/otp", controller.otpPost);

router.get("/password/reset", controller.reset);

router.post("/password/reset", controller.resetPost);

module.exports = router;
