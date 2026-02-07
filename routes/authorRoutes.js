const router = require("express").Router();
const controller = require("../controllers/authorController");

router.get("/", controller.getAuthors);
router.get("/:id", controller.getAuthorDetails);
router.get("/:id/sales", controller.getAuthorSales);

module.exports = router;
