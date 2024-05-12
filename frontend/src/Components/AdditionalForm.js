import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './colours.css';

const AdditionalForm = () => {
    const [formData, setFormData] = useState({
        billId: '',
        additionalPaymentName: '',
        amount: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'amount' && (isNaN(value) || Number(value) < 0)) {
            // If the input is not a positive number, do not update the state
            return;
        }
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8070/api/additionals/addAdditional', formData);
            console.log('Response:', response.data);
            setFormData({
                billId: '',
                additionalPaymentName: '',
                amount: '',
            });
            alert('Additional Payment added successfully!');
            // Navigate to additional details page
            window.location.href = '/additional-payment';
        } catch (error) {
            console.log('Error:', error);
        }
    };

    return (
        <div className="container my-4" style={{ backgroundColor: '#00538C', borderRadius: '20px' }}>
            <div className="card p-4">
                <h2 className="mb-4 text-center"><b>Add New Additional Payment</b></h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="billId" className="form-label">Bill ID</label>
                        <input type="text" className="form-control" id="billId" name="billId" value={formData.billId} onChange={handleChange} required />
                        
                    </div>
                    <div className="mb-3">
                        <label htmlFor="additionalPaymentName" className="form-label">Additional Payment Name</label>
                        <input type="text" className="form-control" id="additionalPaymentName" name="additionalPaymentName" value={formData.additionalPaymentName} onChange={handleChange} required />
                       
                    </div>
                    <div className="mb-3">
                        <label htmlFor="amount" className="form-label">Amount</label>
                        <input type="number" className="form-control" id="amount" name="amount" value={formData.amount} onChange={handleChange} required />
                       
                    </div>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button type="submit" className="btn btn-primary">Add New Additional Payment</button>
                        <Link to="/additional-payment" className="btn btn-secondary">Cancel</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AdditionalForm;
