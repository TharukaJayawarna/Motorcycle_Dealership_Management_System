import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './colours.css';

const AdditionalPayment = () => {
    const [additionalPayments, setAdditionalPayments] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [filteredPayments, setFilteredPayments] = useState([]);

    const fetchAdditionalPayment = async () => {
        try {
            const response = await fetch('http://localhost:8070/api/additionals/getAllAdditionals');
            const data = await response.json();
            setAdditionalPayments(data);
            setFilteredPayments(data); // Initially set filtered payments to all payments
        } catch (error) {
            console.log('Error:', error);
        }
    };

    const handleSearchInputChange = (e) => {
        const searchTerm = e.target.value;
        setSearchInput(searchTerm);
        const filtered = additionalPayments.filter(payment =>
            payment.billId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            payment.additionalPaymentName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPayments(filtered);
    };

    useEffect(() => {
        fetchAdditionalPayment();
    }, []);

    return (
        <div className="container my-4">
            <h2 className="text-center mb-4"><b>Additional Payment</b></h2>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by Bill ID or Name"
                    value={searchInput}
                    onChange={handleSearchInputChange}
                />
            </div>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Bill ID</th>
                        <th>Additional Payment Name</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPayments.map((payment) => (
                        <tr key={payment.billId}>
                            <td>{payment.billId}</td>
                            <td>{payment.additionalPaymentName}</td>
                            <td style={{ textAlign: 'right' }}>{parseFloat(payment.amount).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <Link to="/additional-form" className="btn btn-primary">Add New Additional Payment</Link>
            </div>
        </div>
    );
}

export default AdditionalPayment;