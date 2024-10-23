const express = require("express");
const router = express.Router();
const contentTypeController = require("../../../Controllers/v1/content_type/contentTypeController");

router.route("/content_type/insert").post(contentTypeController.create);
router.route("/content_type/update/:id").put(contentTypeController.update);
router.route("/content_type/delete/:id").put(contentTypeController.delete);
router.route("/content_type/get-by-id/:id").get(contentTypeController.getById);
router.route("/content_type/get/").get(contentTypeController.get);
module.exports = router;