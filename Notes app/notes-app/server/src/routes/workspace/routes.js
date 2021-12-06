const { Router } = require("express");
const controller = require("./controller");
const authenticate = require("../login/controller");

const router = Router();

router.post(
  "/add-workspace",
  authenticate.authenticateToken,
  controller.addWorkspace
);
router.patch(
  "/get-workspace",
  authenticate.authenticateToken,
  controller.getWorkspace
);
router.post(
  "/rename-workspace",
  authenticate.authenticateToken,
  controller.renameWorkspace
);

router.post(
  "/delete-workspace",
  authenticate.authenticateToken,
  controller.deleteWorkspace
);

// router.post(
//   "/delete-notebook",
//   authenticate.authenticateToken,
//   controller.deleteNotebook
// );

// router.post(
//   "/rename-notebook",
//   authenticate.authenticateToken,
//   controller.renameNotebook
// );

module.exports = router;
