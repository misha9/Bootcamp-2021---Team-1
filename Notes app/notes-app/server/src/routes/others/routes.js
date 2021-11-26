const { Router } = require("express");
const controller = require("./controller");
const authenticate = require("../login/controller");

const router = Router();

router.patch(
  "/get-workspace",
  authenticate.authenticateToken,
  controller.getWorkspace
);
// router.patch(
//   "/get-workspace",
//   authenticate.authenticateToken,
//   controller.setWorkspace
// );
router.patch(
  "/get-recent",
  authenticate.authenticateToken,
  controller.getRecent
);

module.exports = router;
