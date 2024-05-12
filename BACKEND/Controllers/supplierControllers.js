const Supplier = require("../modules/SupplierModel");

const getAllSuppliers = async (req, res) => {
    try {
        const suppliers = await Supplier.find();
        res.json(suppliers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const addSuppliers = async (req, res) => {
    const supplier = new Supplier({
        supplierID: req.body.supplierID,
        supplierName: req.body.supplierName,
        Invoice_No: req.body.Invoice_No,
        amount: req.body.amount,
    });

    try {
        const newSupplier = await supplier.save();
        res.status(201).json(newSupplier);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = { getAllSuppliers, addSuppliers };