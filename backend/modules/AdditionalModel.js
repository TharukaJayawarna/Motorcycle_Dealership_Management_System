const mongoose = require('mongoose');

const additionalSchema = new mongoose.Schema({
    billId: { type: String, required: true },
    additionalPaymentName: { type: String, required: true },
    amount: { type: Number, required: true },

},
{
    timestamps: true,
}
);

const Additional = mongoose.model('Additional', additionalSchema);

module.exports = Additional;