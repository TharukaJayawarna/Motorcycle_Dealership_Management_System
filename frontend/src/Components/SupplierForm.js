import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const SupplierForm = () => {
    const [formData, setFormData] = useState({
        supplierID: '',
        supplierName: '',
        Invoice_No: '',
        amount: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Check if the input is a positive number before updating the state
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
            const response = await axios.post('http://localhost:8070/api/suppliers/addSuppliers', formData);
            console.log('Response:', response.data);
            setFormData({
                supplierID: '',
                supplierName: '',
                Invoice_No: '',
                amount: '',
            });
            alert('Supplier Payment added successfully!');
            // Navigate to supplier details page
            window.location.href = '/supplier-payment';
        } catch (error) {
            console.log('Error:', error);
        }
    };

    return (
        <div className="container my-4" style={{ backgroundColor: '#00538C', borderRadius: '20px' }}>
            <div className="card p-4">
                <h2 className="mb-4 text-center"><b>Add New Supplier Payment</b></h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="supplierID" className="form-label">Supplier ID</label>
                        <input type="text" className="form-control" id="supplierID" name="supplierID" value={formData.supplierID} onChange={handleChange} required />
       
                    </div>
                    <div className="mb-3">
                        <label htmlFor="supplierName" className="form-label">Supplier Name</label>
                        <input type="text" className="form-control" id="supplierName" name="supplierName" value={formData.supplierName} onChange={handleChange} required />
                     
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Invoice_No" className="form-label">Invoice Number</label>
                        <input type="text" className="form-control" id="Invoice_No" name="Invoice_No" value={formData.Invoice_No} onChange={handleChange} required />
                    
                    </div>
                    <div className="mb-3">
                        <label htmlFor="amount" className="form-label">Amount</label>
                        <input type="number" className="form-control" id="amount" name="amount" value={formData.amount} onChange={handleChange} required />
                       
                    </div>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <Link to="/supplier-payment" className="btn btn-secondary ms-2">Cancel</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SupplierForm;
