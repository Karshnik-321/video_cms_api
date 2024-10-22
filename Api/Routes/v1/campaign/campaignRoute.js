const express = require("express");
const router = express.Router();
const campaignController = require("../../../Controllers/v1/Campaign/campaignController");

router.route("/campaign/insert").post(campaignController.create);
router.route("/campaign/update").post(campaignController.update);
router.route("/campaign/delete").post(campaignController.delete);
module.exports = router;