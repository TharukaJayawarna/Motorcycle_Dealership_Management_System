const Additional = require('../modules/AdditionalModel');

const getAllAdditionals = async (req, res) => {
    try {
        const additionals = await Additional.find();
        res.json(additionals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const addAdditional = async (req, res) => {
    const additional = new Additional({
        billId: req.body.billId,
        additionalPaymentName: req.body.additionalPaymentName,
        amount: req.body.amount,
    });

    try {
        const newAdditional = await additional.save();
        res.status(201).json(newAdditional);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = { getAllAdditionals, addAdditional };