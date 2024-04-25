const express = require("express");
const router = express.Router();
//Insert model
const Bike = require("../modules/BikeModel");
//Insert Bike controller 
const BikeController = require("../controllers/BikeController");

router.get("/",BikeController.getAllBikes);
router.post("/",BikeController.addBikes);
router.get("/:id",BikeController.getById);
router.put("/:id",BikeController.updateBike);
router.delete("/:id",BikeController.deleteBike);


//export
module.exports = router;