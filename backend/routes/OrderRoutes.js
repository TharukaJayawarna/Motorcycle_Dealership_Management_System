const express = require("express");
const router = express.Router();
//Insert model
const Order = require("../modules/OrderModels");
//Insert Cart controller
const OrderController = require("../controllers/OrderControllers");

router.get("/",OrderController.getAllOrder);
router.post("/",OrderController.addOrder);
router.get("/:id",OrderController.getById);
router.put("/:id",OrderController.updateOrder);
router.delete("/:id",OrderController.deleteOrder);

//export
module.exports = router;