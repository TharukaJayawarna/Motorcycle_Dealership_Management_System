const express = require("express");
const router = express.Router();

const Item = require("../modules/ItemModels");

const ItemController = require("../controllers/ItemControllers");



router.get("/",ItemController.getAllItems);
router.post("/",ItemController.addItems);
router.get("/:id",ItemController.getById);
router.put("/:id",ItemController.updateItem);
router.delete("/:id",ItemController.deleteItem);



module.exports = router;