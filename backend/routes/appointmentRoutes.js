const express = require("express");
const appointmentController = require("../controllers/appointmentController");

const router = express.Router();

router.post("/", appointmentController.createAppointment);
router.get("/", appointmentController.getAppointments);
router.get("/customer", appointmentController.getCustomerAppointments);
router.get("/earnings", appointmentController.getTotalEarnings);
router.get("/count", appointmentController.getAppointmentsCountByStatus);
router.get("/:id", appointmentController.getAppointmentById);
router.patch("/:id", appointmentController.updateAppointment);
router.delete("/:id", appointmentController.deleteAppointment);

module.exports = router;
