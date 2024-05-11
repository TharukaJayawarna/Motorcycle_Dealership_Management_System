import React, { useState } from 'react';
import Sidemenu from '../Sidemenu';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function ReportForm() {
    // State variables to hold form data
    const [formData, setFormData] = useState({
        item: '',
        description: '',
        onHand: 0,
        reserved: 0,
        sold: 0,
        dateTime: new Date().toLocaleString(), // Set current date and time
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Log form submission data for debugging purposes
        console.log('Form submitted:', formData);

        // Generate CSV data
        const csvData = generateCSV(formData);

        // Trigger CSV download
        downloadCSV(csvData);

        // Reset form data if necessary
        setFormData({
            item: '',
            description: '',
            onHand: 0,
            reserved: 0,
            sold: 0,
            dateTime: new Date().toLocaleString(),
        });
    };

    // Function to generate CSV data from form data
    const generateCSV = (data) => {
        const headers = ['Item/Model', 'Description', 'On Hand', 'Reserved', 'Sold', 'Date & Time'];
        const values = [
            data.item,
            data.description,
            data.onHand,
            data.reserved,
            data.sold,
            data.dateTime,
        ];

        const csvRows = [headers.join(','), values.join(',')];
        return csvRows.join('\n');
    };

    // Function to trigger CSV file download
    const downloadCSV = (csvData) => {
        const blob = new Blob([csvData], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'report.csv'); // Specify the file name
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <Box sx={{ marginBottom: 2 }}>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Item/Model"
                    name="item"
                    value={formData.item}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="On Hand"
                    name="onHand"
                    type="number"
                    value={formData.onHand}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Reserved"
                    name="reserved"
                    type="number"
                    value={formData.reserved}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Sold"
                    name="sold"
                    type="number"
                    value={formData.sold}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Date & Time"
                    name="dateTime"
                    value={formData.dateTime}
                    fullWidth
                    margin="normal"
                    disabled
                />
                <Button type="submit" variant="contained" color="primary">
                    Generate Report
                </Button>
            </form>
        </Box>
    );
}

export default function Report() {
    return (
        <div>
            <Box height={30} />
            <Box sx={{ display: 'flex' }}>
                <Sidemenu />
                <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
                    {/* Include the ReportForm component */}
                    <ReportForm />
                    {/* You can include additional content here, such as displaying the report */}
                </Box>
            </Box>
        </div>
    );
}
