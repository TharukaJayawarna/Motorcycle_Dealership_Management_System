const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  otp: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const OTPModal = mongoose.model("OTPModal", otpSchema);

module.exports = OTPModal;
