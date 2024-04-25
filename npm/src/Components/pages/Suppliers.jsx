import React from 'react';
import './Suppliers.css';
import Sidemenu from '../Sidemenu'; // Import Sidemenu component
import Box from '@mui/material/Box'; // Import Box component from MUI

function Suppliers() {
    // Hardcoded supplier data (you can replace this with API data)
    const [supplier] = React.useState({
        SuppliersName: 'John Smith',
        SuppliersID: 'BCS0073',
        Contact: '0703158656',
        Email: 'john.smith@example.com',
        Address: '123 Main St, Anytown, USA',
        profileImage: 'https://via.placeholder.com/150', // Placeholder image URL
        Suppliers: 'Suppliers-Profile',
    });

    // Event handlers for the buttons
    const handleSave = () => {
        // Handle save action
        console.log('Save button clicked');
        // Add your save logic here
    };

    const handleUpdate = () => {
        // Handle update action
        console.log('Update button clicked');
        // Add your update logic here
    };

    const handleDelete = () => {
        // Handle delete action
        console.log('Delete button clicked');
        // Add your delete logic here
    };

    return (
        <div>
            <Box height={30} />
            <Box sx={{ display: 'flex' }}>
                <Sidemenu /> {/* Include Sidemenu component */}
                
                {/* Main content area */}
                <Box
                    component="main"
                    sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
                >
                    <div className='suppliers-profile'>
                        <div className='profile-header'>
                            <img src={supplier.profileImage} alt='Profile' className='profile-image' />
                            <h2>{supplier.Suppliers}</h2>
                        </div>
                        <div className='profile-details'>
                            <p><strong>Suppliers Name:</strong> {supplier.SuppliersName}</p>
                            <p><strong>Suppliers ID:</strong> {supplier.SuppliersID}</p>
                            <p><strong>Contact:</strong> {supplier.Contact}</p>
                            <p><strong>Email:</strong> {supplier.Email}</p>
                            <p><strong>Address:</strong> {supplier.Address}</p>
                        </div>
                        <div className='action-buttons'>
                            <button onClick={handleSave} className='action-button save-button'>Save</button>
                            <button onClick={handleUpdate} className='action-button update-button'>Update</button>
                            <button onClick={handleDelete} className='action-button delete-button'>Delete</button>
                        </div>
                    </div>
                </Box>
            </Box>
        </div>
    );
}

export default Suppliers;
