const { Router } = require("express");
const controller = require("./controller");
const authenticate = require("../login/controller");

const router = Router();

router.post("/add-tag", authenticate.authenticateToken, controller.addTag);
router.patch(
  "/get-tags",
  authenticate.authenticateToken,
  controller.getTagName
);

module.exports = router;
