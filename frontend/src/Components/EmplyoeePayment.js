import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';

const EmployeePayment = () => {
    const [employeePayments, setEmployeePayments] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [filteredPayments, setFilteredPayments] = useState([]);
    const navigate = useNavigate();

    const fetchEmployeePayment = async () => {
        try {
            const response = await fetch('http://localhost:8070/api/salaries/getAllSalaries');
            const data = await response.json();
            console.log(data);  // Log the data to check the structure
            setEmployeePayments(data);
            setFilteredPayments(data);
        } catch (error) {
            console.log('Error:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:8070/api/salaries/deleteSalary/${id}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            console.log(data);
            fetchEmployeePayment();
        } catch (error) {
            console.log('Error:', error);
        }
    }
    

    const handleSearchInputChange = (e) => {
        const searchTerm = e.target.value;
        setSearchInput(searchTerm);
        const filtered = employeePayments.filter(payment =>
            payment.Employee_ID.toLowerCase().includes(searchTerm.toLowerCase()) ||
            payment.Employee_Name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPayments(filtered);
    };

    useEffect(() => {
        fetchEmployeePayment();
    }, []);

    const handleUpdate = (id) => {
        navigate(`/update-employee-salary/${id}`);
    };

    return (
        <div className="container my-4">
            <h2 className="text-center mb-4"><b>Employee Payment</b></h2>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by Employee ID or Name"
                    value={searchInput}
                    onChange={handleSearchInputChange}
                />
            </div>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>Employee Name</th>
                        <th>Basic Salary</th>
                        <th>Bonus</th>
                        <th>Net Salary</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPayments.map((payment) => (
                        <tr key={payment._id}>
                            <td>{payment.Employee_ID}</td>
                            <td>{payment.Employee_Name}</td>
                            <td>{payment.Basic_Salary}</td>
                            <td className="d-flex justify-content-between">
    <span>{payment.Bonus}</span>
    <div>
        <button className="btn btn-primary me-2" onClick={() => handleUpdate(payment._id)}>
            <BsPencilSquare />
        </button>
    </div>
</td>

<td style={{ textAlign: 'right' }}>{parseFloat(payment.Net_Salary).toFixed(2)}</td>
                            <td><button className="btn btn-danger" onClick={() => handleDelete(payment._id)}>
            <BsTrash />
        </button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <Link to="/employee-salary" className="btn btn-primary">Add New Employee Payment</Link>
            </div>
        </div>
    );
};

export default EmployeePayment;