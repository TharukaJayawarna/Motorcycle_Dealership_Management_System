const Notification = require("../modules/Promo_and_Notify_NotificationModal");
const sendEmail = require("../mail/Promo_and_Notify_sendMail");

const createNotification = async (req, res) => {
  try {
    const notification = new Notification({
      Name: req.body.name,
      Email: req.body.email,
      Message: req.body.message,
    });
    await notification.save();
    await sendEmail(req.body.email, "You have a new message", req.body.message);
    res.status(200).send("Notification sent successfully!");
  } catch (error) {
    console.error("Error sending notification:", error);
    res
      .status(500)
      .send("Failed to send notification. Please try again later.");
  }
};

module.exports = { createNotification };
