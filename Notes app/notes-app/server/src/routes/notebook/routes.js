const { Router } = require("express");
const controller = require("./controller");
const authenticate = require("../login/controller");

const router = Router();

router.patch(
  "/get-notebooks",
  authenticate.authenticateToken,
  controller.getNotebooks
);
router.post(
  "/add-notebook",
  authenticate.authenticateToken,
  controller.addNotebook
);

router.post(
  "/delete-notebook",
  authenticate.authenticateToken,
  controller.deleteNotebook
);

router.post(
  "/rename-notebook",
  authenticate.authenticateToken,
  controller.renameNotebook
);

module.exports = router;
