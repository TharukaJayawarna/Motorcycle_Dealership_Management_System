const Salary = require('../modules/SalaryModel');

const getAllSalaries = async (req, res) => {
    try {
        const salaries = await Salary.find();
        res.json(salaries);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch salaries.", error: error.message });
    }
}

const addSalary = async (req, res) => {
    const { Employee_ID, Employee_Name, Basic_Salary, Bonus, Net_Salary } = req.body;

    if (!Employee_ID || !Employee_Name || !Basic_Salary || !Bonus || !Net_Salary) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        const salary = new Salary({ Employee_ID, Employee_Name, Basic_Salary, Bonus, Net_Salary });
        const newSalary = await salary.save();
        res.status(201).json(newSalary);
    } catch (error) {
        res.status(400).json({ message: "Failed to add salary.", error: error.message });
    }
}

const getSalary = async (req, res) => {
    try {
        const salary = await Salary.findById(req.params.id);
        if (!salary) {
            return res.status(404).json({ message: "Salary not found." });
        }
        res.json(salary);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch salary.", error: error.message });
    }
}

const deleteSalary = async (req, res) => {
    try {
        const deletedSalary = await Salary.findByIdAndDelete(req.params.id);
        if (!deletedSalary) {
            return res.status(404).json({ message: "Salary not found." });
        }
        res.json({ message: "Salary deleted" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete salary.", error: error.message });
    }
}

const updateSalary = async (req, res) => {
    try {
        const { Employee_ID, Employee_Name, Basic_Salary, Bonus, Net_Salary } = req.body;
        const salary = await Salary.findById(req.params.id);

        if (!salary) {
            return res.status(404).json({ message: "Salary not found." });
        }

        salary.Employee_ID = Employee_ID;
        salary.Employee_Name = Employee_Name;
        salary.Basic_Salary = Basic_Salary;
        salary.Bonus = Bonus;
        salary.Net_Salary = Net_Salary;

        const updatedSalary = await salary.save();
        res.json(updatedSalary);
    } catch (error) {
        res.status(400).json({ message: "Failed to update salary.", error: error.message });
    }
}


module.exports = { getAllSalaries, addSalary, getSalary, deleteSalary, updateSalary };
