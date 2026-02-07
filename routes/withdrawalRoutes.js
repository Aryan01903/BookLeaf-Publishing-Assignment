const router = require("express").Router();
const controller = require("../controllers/withdrawalController");

router.post("/", controller.createWithdrawal);
router.get("/:id", controller.getAuthorWithdrawals);

module.exports = router;
