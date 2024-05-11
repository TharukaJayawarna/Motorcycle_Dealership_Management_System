// modules/PromoModel.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
  Name: {
    type: String,
    required: true, // Assuming name is mandatory
  },
  Email: {
    type: String,
    required: true, // Assuming email is mandatory
  },
  Message: {
    type: String,
    required: true, // Assuming message is mandatory
  },
});

module.exports = mongoose.model("NotificationModal", NotificationSchema);
