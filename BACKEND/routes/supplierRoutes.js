    const express = require("express");
    const router = express.Router();
    //Insert Model
    const supplier = require("../modules/suppliermodel");
    //Insert Supplier Controller
    const supplierControllers = require("../controllers/supplierControllers");

    router.get("/",supplierControllers.getAllsuppliers);
    router.post("/",supplierControllers.addsuppliers);
    router.get("/:id",supplierControllers.getById);
    router.put("/:id",supplierControllers.Updatesupplier);
    router.delete("/:id",supplierControllers.DeleteSupplier);

    //export
    module.exports = router; 