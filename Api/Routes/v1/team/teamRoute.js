const express = require("express");
const router = express.Router();
const teamController = require("../../../Controllers/v1/Team/teamController");

router.route("/team/insert").post(teamController.create);
router.route("/team/update/:id").put(teamController.update);
router.route("/team/delete/:id").put(teamController.delete);
router.route("/team/get-by-id/:id").get(teamController.getById);
router.route("/team/get/").get(teamController.get);
module.exports = router;