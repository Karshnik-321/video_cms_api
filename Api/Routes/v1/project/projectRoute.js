const express = require("express");
const router = express.Router();
const projectController = require("../../../Controllers/v1/project/projectController");

router.route("/project/insert").post(projectController.create);
router.route("/project/update/:id").put(projectController.update);
router.route("/project/delete/:id").put(projectController.delete);
router.route("/project/get-by-id/:id").get(projectController.getById);
router.route("/project/get/").get(projectController.get);
module.exports = router;