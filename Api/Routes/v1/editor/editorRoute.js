const express = require("express");
const router = express.Router();
const editorController = require("../../../Controllers/v1/Editor/editorController");

router.route("/editor/insert").post(editorController.create);
router.route("/editor/update").post(editorController.update);
router.route("/editor/delete").post(editorController.delete);
module.exports = router;