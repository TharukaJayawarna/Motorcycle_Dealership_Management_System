import React, { useEffect, useState } from 'react';
import Sidemenu from '../Sidemenu';
import axios from 'axios';

const URL = "http://localhost:5000/suppliers";

const fetchHandler = async () => {
    try {
        const response = await axios.get(URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching suppliers:", error);
        return [];
    }
};

function Suppliers() {
    const [suppliers, setSuppliers] = useState([]);

    useEffect(() => {
        fetchHandler().then((data) => {
            if (data && Array.isArray(data.suppliers)) {
                setSuppliers(data.suppliers);
            } else {
                console.error("Data format unexpected:", data);
            }
        });
    }, []);

    // Define the Supplier component within the same file
    function Supplier({ supplier }) {
        const { _SuppliersName, SuppliersID, email, Address } = supplier;

        return (
            <div>
                <h2>Supplier Name: {_SuppliersName}</h2>
                <h3>Supplier ID: {SuppliersID}</h3>
                <p>Email: {email}</p>
                <p>Address: {Address}</p>
                <button>Update</button>
                <button>Delete</button>
            </div>
        );
    }

    return (
        <div>
            <Sidemenu />
            <h1>Supplier Details</h1>
            {suppliers.length > 0 ? (
                suppliers.map((supplier, i) => (
                    <div key={i}>
                        <Supplier supplier={supplier} />
                    </div>
                ))
            ) : (
                <p>No suppliers found</p>
            )}
        </div>
    );
}

export default Suppliers;
