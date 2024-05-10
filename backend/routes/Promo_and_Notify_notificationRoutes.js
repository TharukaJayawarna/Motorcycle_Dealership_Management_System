const express = require("express");
const NotificationRouter = express.Router();

const Promo_and_Notify_NotificationController = require("../controllers/Promo_and_Notify_NotificationController");
//create notification
NotificationRouter.post(
  "/sendEmail",
  Promo_and_Notify_NotificationController.createNotification
);
//export
module.exports = NotificationRouter;
