const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
    supplierID: { type: String, required: true },
    supplierName: { type: String, required: true },
    Invoice_No: { type: String, required: true },
    amount: { type: Number, required: true },
},
{
    timestamps: true,
}
);

const Supplier = mongoose.model('Supplier', supplierSchema);

module.exports = Supplier;
