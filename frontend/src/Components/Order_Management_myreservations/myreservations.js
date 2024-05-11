import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './myreservations.css';

const UserReservationDetailsPage = () => {
    const [reservations, setReservations] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchReservations();
    }, []);

    const fetchReservations = async () => {
        try {
            const response = await axios.get('http://localhost:8070/reserves');
            setReservations(response.data.Reserves);
        } catch (error) {
            console.error(error);
        }
    };

    const handleCancelReservation = async (id) => {
        try {
            await axios.delete(`http://localhost:8070/reserves/${id}`);
            setReservations(prevReservations => prevReservations.filter(reserve => reserve._id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="user-reservation-details-container-om">
            <h1 className="page-title-om">My Reservations</h1>
            <div className="reservation-card-container-om">
                {reservations.map(reserve => (
                    <div key={reserve._id} className="reservation-card-om">
                        <div className="card-header-om">
                            <h3 className="card-title-om">{reserve.Bike_Name}</h3>
                            <p className="card-subtitle-om">Reserve ID: {reserve.Reserve_ID}</p>
                        </div>
                        <div className="card-body-om">
                            <p>Customer Name: {reserve.Cus_Name}</p>
                            <p>Email: {reserve.Email}</p>
                            <p>Bike Color: {reserve.Bike_Color}</p>
                            <p>Date: {reserve.Date}</p>
                        </div>
                        <div className="card-actions-om">
                            <button className="cancel-button-om" onClick={() => handleCancelReservation(reserve._id)}>
                                Cancel Reservation
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <button className="back-button-om" onClick={() => navigate(-1)}>
                Go Back
            </button>
        </div>
    );
};

export default UserReservationDetailsPage;