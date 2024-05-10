import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './reservationdetails.css';

const ReservationDetailsPage = () => {
    const [reservations, setReservations] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8070/reserves')
            .then(response => {
                setReservations(response.data.Reserves);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const handleDeleteReservation = async (id) => {
        try {
            await axios.delete(`http://localhost:8070/reserves/${id}`);
            setReservations(prevReservations => prevReservations.filter(reserve => reserve._id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    const filteredReservations = reservations.filter(reserve =>
        reserve.Reserve_ID.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reserve.Cus_Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reserve.Email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reserve.Bike_Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reserve.Bike_Color.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reserve.Date.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="reservation-details-container-pl">
            <h1 className="page-title-pl">Reservation Details</h1>
            <div className="search-container-pl">
                <input
                    type="text"
                    placeholder="Search reservations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input-pl"
                />
            </div>
            <div className="table-container-pl">
                <table className="reservation-table-pl">
                    <thead>
                        <tr>
                            <th>Reserve ID</th>
                            <th>Customer Name</th>
                            <th>Email</th>
                            <th>Bike Name</th>
                            <th>Bike Color</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredReservations.map(reserve => (
                            <tr key={reserve._id} className="table-row-pl">
                                <td>{reserve.Reserve_ID}</td>
                                <td>{reserve.Cus_Name}</td>
                                <td>{reserve.Email}</td>
                                <td>{reserve.Bike_Name}</td>
                                <td>{reserve.Bike_Color}</td>
                                <td>{reserve.Date}</td>
                                <td>
                                    <button className="cancel-reservation-button-pl" onClick={() => handleDeleteReservation(reserve._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReservationDetailsPage;
