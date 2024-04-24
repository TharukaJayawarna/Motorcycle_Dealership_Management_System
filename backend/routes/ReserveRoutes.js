const express = require("express");
const router = express.Router();
//Insert model
const Reserve = require("../modules/ReserveModels");
//Insert Cart controller
const ReserveController = require("../controllers/ReserveControllers");

router.get("/",ReserveController.getAllReserve);
router.post("/",ReserveController.addReserve);
router.get("/:id",ReserveController.getById);
router.put("/:id",ReserveController.updateReserve);
router.delete("/:id",ReserveController.updateReserve);

//export
module.exports = router;