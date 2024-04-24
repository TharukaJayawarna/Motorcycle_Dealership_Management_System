import React, { useState, useEffect } from 'react';
import "./Product_Details.css";
import axios from "axios";
import { Link } from "react-router-dom";

const URL = "http://Localhost:5000/items";

function Product_Details() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const response = await axios.get(URL);
            // Instead of response.data.items, just use response.data
            setItems(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Item details display page</h1>
            <table>
                <thead>
                    <tr>
                        <th>Item Image</th>
                        <th>Item ID</th>
                        <th>Item Name</th>
                        <th>Price</th>
                        <th>Manufacturer</th>
                        <th>Category</th>
                        <th>Compatible Motorcycle Models</th>
                        <th>Received</th>
                        <th>In Stock</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, i) => (
                        <tr key={i}>
                            <td>
                                <img
                                    src={`http://localhost:8070/Users/tharukajayawarna/Desktop/Motorcycle_Dealership_Management_System/frontend/public/Images/${item.Image}`}
                                    height={100}
                                    width={100}
                                    alt="photos"
                                />
                            </td>
                            <td>{item.Item_ID}</td>
                            <td>{item.Item_Name}</td>
                            <td>{item.Price}</td>
                            <td>{item.Manufacturer}</td>
                            <td>{item.Category}</td>
                            <td>{item.Compatible_Motorcycle_Models}</td>
                            <td>{item.Received}</td>
                            <td>{item.In_Stock}</td>
                            <td>
                                {/* Add actions here */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Product_Details;
