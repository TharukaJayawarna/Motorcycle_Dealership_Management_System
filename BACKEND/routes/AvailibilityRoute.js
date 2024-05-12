const express = require("express");
const router = express.Router();
//Insert Model
const Availibility = require("../modules/Availibilitymodel");
//Insert Availibility Controller
const AvailibilityControllers = require("../controllers/AvailibilityControllers");

router.get("/",AvailibilityControllers.getAllAvailibility);
router.post("/",AvailibilityControllers.addAvailibility);
router.get("/:id",AvailibilityControllers.getById);
router.put("/:id",AvailibilityControllers.UpdateAvailibility);
router.delete("/:id",AvailibilityControllers.DeleteAvailibility);

//export
module.exports = router; 