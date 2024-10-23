const express = require("express");
const router = express.Router();
const programController = require("../../../Controllers/v1/Program/programController");

router.route("/program/insert").post(programController.create);
router.route("/program/update/:id").put(programController.update);
router.route("/program/delete/:id").put(programController.delete);
router.route("/program/get-by-id/:id").get(programController.getById);
router.route("/program/get/").get(programController.get);
module.exports = router;