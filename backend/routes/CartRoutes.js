const express = require("express");
const router = express.Router();
//Insert model
const Cart = require("../modules/CartModels");
//Insert Cart controller
const CartController = require("../controllers/CartControllers");

router.get("/",CartController.getAllCart);
router.post("/",CartController.addtoCart);
router.get("/:id",CartController.getById);
router.put("/:id",CartController.updateCart);
router.delete("/:id",CartController.updateCart);

//export
module.exports = router;