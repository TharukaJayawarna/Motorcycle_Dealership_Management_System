import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const EmployeeSalaryForm = () => {
    const [formData, setFormData] = useState({
        Employee_ID: '',
        Employee_Name: '',
        Basic_Salary: '',
        Bonus: '',
        Net_Salary: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        let netSalaryValue = 0;
    
        if (name === 'Basic_Salary' && (isNaN(value) || Number(value) < 0)) {
            // If the input is not a positive number, do not update the state
            return;
        }

        if (name === 'Bonus' && (isNaN(value) || Number(value) < 0)) {
            // If the input is not a positive number, do not update the state
            return;
        }
    
    
        if (name === 'Basic_Salary' || name === 'Bonus') {
            const basicSalary = name === 'Basic_Salary' ? parseFloat(value) : parseFloat(formData.Basic_Salary);
            const bonus = name === 'Bonus' ? parseFloat(value) : parseFloat(formData.Bonus);
            netSalaryValue = basicSalary + bonus;
        } else {
            netSalaryValue = parseFloat(value);
        }
    
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
            Net_Salary: netSalaryValue.toFixed(2), // Adjust decimal places as needed
        }));
    };
    
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8070/api/salaries/addSalary', formData);
            alert('Employee Payment added successfully!');
            setFormData({
                Employee_ID: '',
                Employee_Name: '',
                Basic_Salary: '',
                Bonus: '',
                Net_Salary: '',
            });
            console.log('Response:', res.data);
            // Navigate to employee details page
            window.location.href = '/employee-payment';
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="container my-4" style={{ backgroundColor: '#00538C', borderRadius: '20px' }}>
            <div className="card p-4">
                <h2 className="mb-4 text-center"><b>Add New Employee Payment</b></h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="employeeID" className="form-label">Employee ID</label>
                        <input type="text" className="form-control" id="employeeID" name="Employee_ID" value={formData.Employee_ID} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="employeeName" className="form-label">Employee Name</label>
                        <input type="text" className="form-control" id="employeeName" name="Employee_Name" value={formData.Employee_Name} onChange={handleChange} required />
                       
                    </div>
                    <div className="mb-3">
                        <label htmlFor="basicSalary" className="form-label">Employee Basic Salary</label>
                        <input type="number" className="form-control" id="basicSalary" name="Basic_Salary" value={formData.Basic_Salary} onChange={handleChange} required />
                       
                    </div>
                    <div className="mb-3">
                        <label htmlFor="employeeBonus" className="form-label">Employee Bonus</label>
                        <input type="number" className="form-control" id="employeeBonus" name="Bonus" value={formData.Bonus} onChange={handleChange} required />
                      
                    </div>
                    <div className="mb-3">
                        <label htmlFor="netSalary" className="form-label">Employee Net Salary</label>
                        <input type="text" className="form-control" id="netSalary" name="Net_Salary" value={formData.Net_Salary} onChange={handleChange} required />
                    </div>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button type="submit" className="btn btn-primary">Submit</button>
                        <Link to="/employee-payment" className="btn btn-secondary">Cancel</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EmployeeSalaryForm;
