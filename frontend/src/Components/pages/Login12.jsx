import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './Login12.css'; // Import the CSS file

export default function Login12() {
    const navigate = useNavigate(); // Initialize useNavigate

    // State for form inputs and login credentials
    const [formData, setFormData] = useState({
        Email: '',
        password: '',
    });

    // Function to handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Save login credentials to the database (simulated by logging to console)
        console.log('Login credentials:', formData);

        // After form submission, navigate to the profile page
        navigate('/Profile12');
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    className="login-form"
                    sx={{ mt: 3 }}
                >
                    <Typography variant="h5" sx={{ mb: 2 }}>
                        Login
                    </Typography>
                    <TextField
                        label="Email"
                        name="Email"
                        value={formData.Email}
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                    />
                    <TextField
                        label="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                        type="password"
                    />
                    <Box mt={2}>
                        <Button type="submit" variant="contained" color="primary">
                            Login
                        </Button>
                    </Box>
                </Box>
            </div>
        </div>
    );
}
