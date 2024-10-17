const express = require("express");
const router = express.Router();
const authController = require("../../../Controllers/v1/Auth/authController");

router.route("/auth/login").post(authController.login);
router.route("/auth/register").post(authController.register);
module.exports = router;