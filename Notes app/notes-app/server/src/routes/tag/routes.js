const { Router } = require("express");
const controller = require("./controller");
const authenticate = require("../login/controller");

const router = Router();

router.post("/add-tag", authenticate.authenticateToken, controller.addTag);

module.exports = router;
