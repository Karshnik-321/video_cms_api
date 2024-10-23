const express = require("express");
const router = express.Router();
const sourceController = require("../../../Controllers/v1/Source/sourceController");

router.route("/source/insert").post(sourceController.create);
router.route("/source/update/:id").put(sourceController.update);
router.route("/source/delete/:id").put(sourceController.delete);
router.route("/source/get-by-id/:id").get(sourceController.getById);
router.route("/source/get/").get(sourceController.get);
module.exports = router;