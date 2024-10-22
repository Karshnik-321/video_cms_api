const express = require("express");
const router = express.Router();
const platformController = require("../../../Controllers/v1/Platform/platformController");

router.route("/platform/insert").post(platformController.create);
router.route("/platform/update/:id").put(platformController.update);
router.route("/platform/delete/:id").put(platformController.delete);
router.route("/platform/get-by-id/:id").get(platformController.getById);
router.route("/platform/get/").get(platformController.get);
module.exports = router;