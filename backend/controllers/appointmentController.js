const Appointment = require("../models/Appointment");
const sendEmail = require("../util/sendEmail");
const timeNotAvailableEmailTemplate = require("../util/email_templates/timeNotAvailableEmailTemplate");
const timeAvailableEmailTemplate = require("../util/email_templates/timeAvailableEmailTemplate");
const appointmentRejectedEmailTemplate = require("../util/email_templates/appointmentRejectedEmailTemplate");

const appointmentController = {
  // create appointment
  createAppointment: async (req, res) => {
    try {
      const {
        description,
        services,
        appointmentDate,
        appointmentTime,
        totalCost,
      } = req.body;

      // check if services is an array or a string
      const serviceIds = Array.isArray(services)
        ? services
        : JSON.parse(services);

      const newAppointment = new Appointment({
        description,
        // TODO: replace hardcoded customer id with authenticated user id
        customer: "660b9cb857ec50de9a3ac353",
        services: serviceIds.map((id) => ({ service: id })), // map service ids to object
        status: "pending",
        appointmentDate,
        appointmentTime,
        totalCost,
      });

      const savedAppointment = await newAppointment.save();

      res.status(201).json({
        success: true,
        appointment: savedAppointment,
        message: "Appointment created successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // get all appointments
  getAppointments: async (req, res) => {
    try {
      const appointments = await Appointment.find()
        .populate("customer", ["name", "email"])
        .populate("services.service", ["name", "price", "duration"]);

      res.status(200).json({ success: true, appointments });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // get appointment by id
  getAppointmentById: async (req, res) => {
    try {
      const appointmentId = req.params.id;
      const appointment = await Appointment.findById(appointmentId)
        .populate("customer", ["name", "email"])
        .populate("services.service", ["name", "price", "duration"]);

      if (!appointment) {
        return res.status(404).json({
          success: false,
          message: "Appointment not found",
        });
      }

      res.status(200).json({ success: true, appointment });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // update appointment
  updateAppointment: async (req, res) => {
    try {
      const appointmentId = req.params.id;
      const appointment = await Appointment.findById(appointmentId).populate(
        "customer",
        ["name", "email"]
      );

      if (!appointment) {
        return res.status(404).json({
          success: false,
          message: "Appointment not found",
        });
      }

      const updatedAppointment = await Appointment.findByIdAndUpdate(
        appointmentId,
        req.body,
        {
          new: true,
        }
      );

      // if date or time is updated, send email to customer
      if (req.body.appointmentDate || req.body.appointmentTime) {
        const emailTemplate = timeNotAvailableEmailTemplate(
          appointment.customer.name,
          appointment.appointmentDate,
          appointment.appointmentTime,
          updatedAppointment.appointmentDate,
          updatedAppointment.appointmentTime
        );

        sendEmail(
          appointment.customer.email,
          "Appointment Rescheduling Required",
          emailTemplate
        );
      }

      // if status is updated to "confirmed", send email to customer
      if (req.body.status === "confirmed") {
        const emailTemplate = timeAvailableEmailTemplate(
          appointment.customer.name,
          appointment.appointmentDate,
          appointment.appointmentTime
        );

        sendEmail(
          appointment.customer.email,
          "Appointment Confirmed!",
          emailTemplate
        );
      }

      // if status is updated to "rejected", send email to customer
      if (req.body.status === "rejected") {
        const emailTemplate = appointmentRejectedEmailTemplate(
          appointment.customer.name,
          appointment.appointmentDate,
          appointment.appointmentTime
        );

        sendEmail(
          appointment.customer.email,
          "Appointment Rejected",
          emailTemplate
        );
      }

      res.status(200).json({
        success: true,
        appointment: updatedAppointment,
        message: "Appointment updated successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // delete appointment
  deleteAppointment: async (req, res) => {
    try {
      const appointmentId = req.params.id;

      const appointment = await Appointment.findById(appointmentId);

      if (!appointment) {
        return res.status(404).json({
          success: false,
          message: "Appointment not found",
        });
      }

      const deletedAppointment = await Appointment.findByIdAndDelete(
        appointmentId
      );

      res.status(200).json({
        success: true,
        appointment: deletedAppointment,
        message: "Appointment deleted successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // get appointments by customer
  getCustomerAppointments: async (req, res) => {
    try {
      // TODO: replace hardcoded customer id with authenticated user id
      const customerID = "660b9cb857ec50de9a3ac353";
      const appointments = await Appointment.find({ customer: customerID })
        .populate("customer", ["name", "email"])
        .populate("services.service", ["name", "price", "duration"]);

      res.status(200).json({ success: true, appointments });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // get total earnings using aggregation
  getTotalEarnings: async (req, res) => {
    try {
      const totalEarnings = await Appointment.aggregate([
        {
          $group: {
            _id: null,
            total: { $sum: "$totalCost" },
          },
        },
      ]);

      res.status(200).json({ success: true, totalEarnings });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },

  // get appointments count by status using aggregation
  getAppointmentsCountByStatus: async (req, res) => {
    try {
      const appointmentsCount = await Appointment.aggregate([
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 },
          },
        },
      ]);

      res.status(200).json({ success: true, appointmentsCount });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error,
        message: "Internal server error",
      });
    }
  },
};

module.exports = appointmentController;
