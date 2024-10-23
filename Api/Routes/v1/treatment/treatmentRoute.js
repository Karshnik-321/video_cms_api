const express = require("express");
const router = express.Router();
const treatmentController = require("../../../Controllers/v1/Treatment/treatmentController");

router.route("/treatment/insert").post(treatmentController.create);
router.route("/treatment/update/:id").put(treatmentController.update);
router.route("/treatment/delete/:id").put(treatmentController.delete);
router.route("/treatment/get-by-id/:id").get(treatmentController.getById);
router.route("/treatment/get/").get(treatmentController.get);
module.exports = router;