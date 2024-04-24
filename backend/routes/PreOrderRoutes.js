const express = require("express");
const router = express.Router();
//Insert model
const PreOrder = require("../modules/PreOrderModels");
//Insert Cart controller
const PreOrderController = require("../controllers/PreOrderControllers");

router.get("/",PreOrderController.getAllPreOrder);
router.post("/",PreOrderController.addPreOrder);
router.get("/:id",PreOrderController.getById);
router.put("/:id",PreOrderController.updatePreOrder);
router.delete("/:id",PreOrderController.deletePreOrder);

//export
module.exports = router;