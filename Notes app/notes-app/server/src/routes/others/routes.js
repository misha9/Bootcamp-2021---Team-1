const { Router } = require("express");
const controller = require("./controller");
const authenticate = require("../login/controller");

const router = Router();

router.patch(
  "/get-recent",
  authenticate.authenticateToken,
  controller.getRecent
);
router.post(
  "/update-icon",
  authenticate.authenticateToken,
  controller.updateIcon
);

router.get("/get-icons", controller.getIcons);

router.get("/is-verify", authenticate.authenticateToken, controller.getToken);

module.exports = router;
