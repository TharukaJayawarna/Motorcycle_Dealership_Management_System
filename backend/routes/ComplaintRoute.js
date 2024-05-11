const express = require("express");
const complaintRouter = express.Router();
// Insert Model
const Complaint = require("../modules/ComplaintModel");

// Insert Controller
const ComplaintController = require("../controllers/ComplaintController");

complaintRouter.get("/", ComplaintController.getAllComplaints);
complaintRouter.post("/", ComplaintController.addComplaint);
complaintRouter.get("/:id", ComplaintController.getComplaintById);
complaintRouter.put("/:id", ComplaintController.updateComplaint);
complaintRouter.delete("/:id", ComplaintController.deleteComplaint);

// Export
module.exports = complaintRouter;
