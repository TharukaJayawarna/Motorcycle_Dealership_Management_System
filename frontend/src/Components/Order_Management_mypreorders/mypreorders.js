import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './mypreorders.css';

const UserPreOrderDetailsPage = () => {
    const [preOrders, setPreOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPreOrders();
    }, []);

    const fetchPreOrders = async () => {
        try {
            const response = await axios.get('http://localhost:8070/preorders');
            setPreOrders(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleCancelPreOrder = async (id) => {
        try {
            await axios.delete(`http://localhost:8070/preorders/${id}`);
            setPreOrders(prevPreOrders => prevPreOrders.filter(preOrder => preOrder._id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="user-pre-order-details-container-hrs">
            <h1 className="page-title-hrs">My Pre-Orders</h1>
            <div className="pre-order-card-container-hrs">
                {preOrders.map(preOrder => (
                    <div key={preOrder._id} className="pre-order-card-hrs">
                        <div className="card-header-hrs">
                            <h3 className="card-title-hrs">{preOrder.Bike_Name}</h3>
                            <p className="card-subtitle-hrs">Pre-Order ID: {preOrder.PreOrder_ID}</p>
                        </div>
                        <div className="card-body-hrs">
                            <p>Customer Name: {preOrder.Cus_Name}</p>
                            <p>Email: {preOrder.Email}</p>
                            <p>Bike Color: {preOrder.Bike_Color}</p>
                            <p>Quantity: {preOrder.Quantity}</p>
                            <p>Date: {preOrder.Date}</p>
                        </div>
                        <div className="card-actions-hrs">
                            <button className="cancel-button-hrs" onClick={() => handleCancelPreOrder(preOrder._id)}>
                                Cancel Pre-Order
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <button className="back-button-hrs" onClick={() => navigate(-1)}>
                Go Back
            </button>
        </div>
    );
};

export default UserPreOrderDetailsPage;