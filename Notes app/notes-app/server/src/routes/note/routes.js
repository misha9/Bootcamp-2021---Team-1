const { Router } = require("express");
const controller = require("./controller");
const authenticate = require("../login/controller");

const router = Router();

router.patch("/get-notes", authenticate.authenticateToken, controller.getNotes);
router.post("/add-notes", authenticate.authenticateToken, controller.addNote);
router.post("/edit-note", authenticate.authenticateToken, controller.editNote);
router.post(
  "/delete-notes",
  authenticate.authenticateToken,
  controller.deleteNote
);
router.patch(
  "/get-full-text",
  authenticate.authenticateToken,
  controller.getFullText
);

module.exports = router;
