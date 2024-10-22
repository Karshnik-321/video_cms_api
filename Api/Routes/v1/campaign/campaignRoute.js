const express = require("express");
const router = express.Router();
const campaignController = require("../../../Controllers/v1/Campaign/campaignController");

router.route("/campaign/insert").post(campaignController.create);
router.route("/campaign/update/:id").put(campaignController.update);
router.route("/campaign/delete/:id").put(campaignController.delete);
router.route("/campaign/get-by-id/:id").get(campaignController.getById);
router.route("/campaign/get/").get(campaignController.get);
module.exports = router;