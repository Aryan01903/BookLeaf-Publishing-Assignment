const router = require("express").Router();
const controller = require("../controllers/withdrawalController");

router.post("/", controller.createWithdrawal);

module.exports = router;
