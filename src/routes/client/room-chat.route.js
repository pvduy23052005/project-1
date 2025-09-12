const expres = require("express");
const router = expres.Router();
const controller = require("../../controllers/client/room-chat.controller.js");

router.get("/", controller.index);

router.get("/create", controller.create);

router.post("/create", controller.createPost);

module.exports = router;
