import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const SupplierPayment = () => {
    const [supplierPayments, setSupplierPayments] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [filteredPayments, setFilteredPayments] = useState([]);

    const fetchSupplierPayment = async () => {
        try {
            const response = await fetch('http://localhost:8070/api/suppliers/getAllsuppliers');
            const data = await response.json();
            setSupplierPayments(data);
            setFilteredPayments(data); // Initially set filtered payments to all payments
        } catch (error) {
            console.log('Error:', error);
        }
    };

    const handleSearchInputChange = (e) => {
        const searchTerm = e.target.value;
        setSearchInput(searchTerm);
        const filtered = supplierPayments.filter(payment =>
            payment.supplierID.toLowerCase().includes(searchTerm.toLowerCase()) ||
            payment.supplierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            payment.Invoice_No.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPayments(filtered);
    };

    useEffect(() => {
        fetchSupplierPayment();
    }, []);

    return (
        <div className="container my-4">
            <h2 className="text-center mb-4"><b>Supplier Payment</b></h2>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by Supplier ID, Name, or Invoice Number"
                    value={searchInput}
                    onChange={handleSearchInputChange}
                />
            </div>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Supplier ID</th>
                        <th>Supplier Name</th>
                        <th>Invoice Number</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPayments.map((payment) => (
                        <tr key={payment.supplierID}>
                            <td>{payment.supplierID}</td>
                            <td>{payment.supplierName}</td>
                            <td>{payment.Invoice_No}</td>
                            <td style={{ textAlign: 'right' }}>{parseFloat(payment.amount).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <Link to="/supplier-form" className="btn btn-primary">Add New Supplier Payment</Link>
            </div>
        </div>
    );
}

export default SupplierPayment;
