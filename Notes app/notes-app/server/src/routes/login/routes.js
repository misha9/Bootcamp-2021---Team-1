const { Router } = require("express");
const controller = require("./controller");

const router = Router();

router.patch("/login", controller.login);

module.exports = router;
