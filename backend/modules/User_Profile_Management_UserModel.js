const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["Admin", "Manager", "Customer", "Employee"],
    default: "Customer",
  },
  image: {
    type: String,
  },
});

const UserModal = mongoose.model("User", userSchema);

module.exports = UserModal;
