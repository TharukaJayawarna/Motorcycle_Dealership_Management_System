const express = require("express");
const router = express.Router();
const authController = require("../controllers/User_Profile_Management_AuthController");

router.route("/login").post(authController.loginUser);
router.route("/reset-pass/:email").get(authController.sendTokenVerify);
router.route("/reset-pass/otp").post(authController.otpVerify);
router.route("/logout").get(authController.logout);
router.route("/current-user").get(authController.currentUser);

module.exports = router;
