const express = require("express");
const router = express.Router();
const productController = require("../../../Controllers/v1/Product/productController");

router.route("/product/insert").post(productController.create);
router.route("/product/update/:id").put(productController.update);
router.route("/product/delete/:id").put(productController.delete);
router.route("/product/get-by-id/:id").get(productController.getById);
router.route("/product/get/").get(productController.get);
module.exports = router;