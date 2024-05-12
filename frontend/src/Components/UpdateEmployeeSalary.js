import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const UpdateEmployeeSalary = () => {
    const [employeeDetails, setEmployeeDetails] = useState({
        Employee_ID: '',
        Employee_Name: '',
        Basic_Salary: '',
        Bonus: '',
        Net_Salary: ''
    });

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchEmployeeSalary();
    }, [id]);

    const fetchEmployeeSalary = async () => {
        try {
            const response = await axios.get(`http://localhost:8070/api/salaries/getSalary/${id}`);
            const data = response.data;
            setEmployeeDetails({
                ...data,
                Net_Salary: calculateNetSalary(data.Basic_Salary, data.Bonus)
            });
        } catch (error) {
            console.error('Error fetching salary details:', error);
        }
    };

    const handleBonusChange = (e) => {
        const updatedBonus = e.target.value;
        
        // Check if the updated bonus is a positive number or an empty string (allow backspacing)
        if (!isNaN(updatedBonus) && (parseInt(updatedBonus) >= 0 || updatedBonus === '')) {
            setEmployeeDetails(prev => ({
                ...prev,
                Bonus: updatedBonus,
                Net_Salary: calculateNetSalary(prev.Basic_Salary, updatedBonus)
            }));
        }
    };
    

    const handleBonusUpdate = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put(`http://localhost:8070/api/salaries/updateSalary/${id}`, employeeDetails);
            alert('Employee Salary updated successfully!');
            navigate('/employee-payment');
        } catch (error) {
            console.error('Error updating salary:', error);
        }
    };

    const calculateNetSalary = (basic, bonus) => {
        // Placeholder for actual net salary calculation logic
        return parseInt(basic) + parseInt(bonus || 0);
    };

    const { Employee_ID, Employee_Name, Basic_Salary, Bonus, Net_Salary } = employeeDetails;

    return (
        <div className="container my-4" style={{ backgroundColor: '#e9f0f8', borderRadius: '10px' }}>
            <div className="card p-4">
                <h2 className="mb-4 text-center"><b>Update Employee Salary</b></h2>
                <form onSubmit={handleBonusUpdate}>
                    <div className="mb-3">
                        <label htmlFor="employeeID" className="form-label">Employee ID</label>
                        <input type="text" className="form-control" id="employeeID" name="Employee_ID" value={Employee_ID} readOnly />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="employeeName" className="form-label">Employee Name</label>
                        <input type="text" className="form-control" id="employeeName" name="Employee_Name" value={Employee_Name} readOnly />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="basicSalary" className="form-label">Basic Salary</label>
                        <input type="number" className="form-control" id="basicSalary" name="Basic_Salary" value={Basic_Salary} readOnly />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="bonus" className="form-label">Bonus</label>
                        <input type="number" className="form-control" id="bonus" name="Bonus" value={Bonus} onChange={handleBonusChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="netSalary" className="form-label">Net Salary</label>
                        <input type="number" className="form-control" id="netSalary" name="Net_Salary" value={Net_Salary} readOnly />
                    </div>
                    <button type="submit" className="btn btn-primary">Update</button>
                    <Link to="/employee-payment" className="btn btn-secondary ms-2">Cancel</Link>
                </form>
            </div>
        </div>
    );
}

export default UpdateEmployeeSalary;
