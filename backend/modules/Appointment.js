const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    description: { type: String, required: true },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    services: [
      {
        service: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
      },
    ],
    status: {
      type: String,
      enum: ["pending", "confirmed", "rescheduled", "rejected"],
      required: true,
    },
    appointmentDate: { type: String, required: true },
    appointmentTime: { type: String, required: true },
    totalCost: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
