const { Router } = require("express");
const controller = require("./controller");
const authenticate = require("../login/controller");

const router = Router();

router.post(
  "/add-bookmark",
  authenticate.authenticateToken,
  controller.addBookmark
);

router.get(
  "/get-bookmark",
  authenticate.authenticateToken,
  controller.getBookmark
);

module.exports = router;
