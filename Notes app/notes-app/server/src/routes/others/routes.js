const { Router } = require("express");
const controller = require("./controller");
const authenticate = require("../login/controller");

const router = Router();

router.get(
  "/get-workspace",
  authenticate.authenticateToken,
  controller.getWorkspace
);

router.get("/get-recent", authenticate.authenticateToken, controller.getRecent);

module.exports = router;
