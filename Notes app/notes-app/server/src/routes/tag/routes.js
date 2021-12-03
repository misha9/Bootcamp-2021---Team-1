const { Router } = require("express");
const controller = require("./controller");
const authenticate = require("../login/controller");

const router = Router();

router.get(
  "/get-all_tags",
  authenticate.authenticateToken,
  controller.getAllTags
);
router.patch(
  "/get-tag_count",
  authenticate.authenticateToken,
  controller.getTagsCount
);
router.patch(
  "/get-tag_notes",
  authenticate.authenticateToken,
  controller.getTagNotes
);
router.post("/add-tag", authenticate.authenticateToken, controller.addTag);
router.patch(
  "/get-tags",
  authenticate.authenticateToken,
  controller.getTagName
);

module.exports = router;
