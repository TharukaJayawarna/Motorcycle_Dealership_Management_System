const mongoose = require('mongoose');

const salarySchema = new mongoose.Schema({
    Employee_ID: { type: String, required: true },
    Employee_Name: { type: String, required: true },
    Basic_Salary: { type: Number, required: true },
    Bonus: { type: Number, required: true },
    Net_Salary: { type: Number, required: true },
},
{
    timestamps: true,
}
);

const Salary = mongoose.model('Salary', salarySchema);

module.exports = Salary;