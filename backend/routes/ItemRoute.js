const express = require("express");
const router = express.Router();
//Insert model
const Item = require("../modules/ItemModels");
//Insert User controller 
const ItemController = require("../controllers/ItemControllers");



router.get("/",ItemController.getAllItems);
router.post("/",ItemController.addItems);
router.get("/:id",ItemController.getById);
router.put("/:id",ItemController.updateItem);
router.delete("/:id",ItemController.deleteItem);


//export
module.exports = router;