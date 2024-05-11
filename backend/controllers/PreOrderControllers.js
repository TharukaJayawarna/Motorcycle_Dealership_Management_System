const PreOrder = require("../modules/PreOrderModels");


const getAllPreOrder = async (req, res) => {
    try {
        const preOrders = await PreOrder.find();
        res.status(200).json(preOrders);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const addPreOrder = async (req, res) => {
    try {
        const { PreOrder_ID, Bike_Name, Bike_Color, Quantity, Date, Cus_Name, Email } = req.body;
        let Payment_slip = null;

        if (req.file) {
            Payment_slip = `http://localhost:8070/uploads/${req.file.filename}`;
        }

        const newPreOrder = new PreOrder({
            PreOrder_ID,
            Bike_Name,
            Bike_Color,
            Quantity,
            Date,
            Cus_Name,
            Email,
            Payment_slip
        });

        const savedPreOrder = await newPreOrder.save();
        res.status(201).json(savedPreOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getPreOrderById = async (req, res) => {
    try {
        const preOrder = await PreOrder.findById(req.params.id);
        if (!preOrder) {
            return res.status(404).json({ message: 'Pre-order not found' });
        }
        res.status(200).json(preOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updatePreOrder = async (req, res) => {
    try {
        const preOrder = await PreOrder.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!preOrder) {
            return res.status(404).json({ message: 'Pre-order not found' });
        }
        res.status(200).json(preOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deletePreOrder = async (req, res) => {
    try {
        const preOrder = await PreOrder.findByIdAndDelete(req.params.id);
        if (!preOrder) {
            return res.status(404).json({ message: 'Pre-order not found' });
        }
        res.status(200).json({ message: 'Pre-order deleted' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getAllPreOrder,
    addPreOrder,
    getPreOrderById,
    updatePreOrder,
    deletePreOrder
};