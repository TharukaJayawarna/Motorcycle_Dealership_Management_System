import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import './Register.css'; // Import the CSS file

export default function Register() {
    const navigate = useNavigate(); // Initialize useNavigate

    // State for form inputs and error messages
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({});

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
        
        // Perform validation
        const validationErrors = validateForm(formData);
        if (Object.keys(validationErrors).length > 0) {
            // Set errors and stop form submission if there are validation errors
            setErrors(validationErrors);
            return;
        }

        // If validation passes, submit the form
        console.log('Form submitted:', formData);
        // Add your form submission logic here (e.g., API call to register the user)

        // After form submission, navigate to the login page
        navigate('/login');
    };

    // Function to validate the form inputs
    const validateForm = (data) => {
        const errors = {};

        // Validate username
        if (!data.username) {
            errors.username = 'Username is required';
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!data.email) {
            errors.email = 'Email is required';
        } else if (!emailRegex.test(data.email)) {
            errors.email = 'Invalid email format';
        }

        // Validate password
        if (!data.password) {
            errors.password = 'Password is required';
        } else if (data.password.length < 8) {
            errors.password = 'Password must be at least 8 characters long';
        }

        // Validate confirm password
        if (!data.confirmPassword) {
            errors.confirmPassword = 'Confirm password is required';
        } else if (data.confirmPassword !== data.password) {
            errors.confirmPassword = 'Passwords do not match';
        }

        return errors;
    };

    return (
        <div className="register-form-container">
            <Box
                component="form"
                onSubmit={handleSubmit}
                className="register-form"
                sx={{ mt: 3 }}
            >
                <Typography variant="h5" sx={{ mb: 2 }}>
                    Register
                </Typography>
                <TextField
                    label="Username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                    error={!!errors.username}
                    helperText={errors.username}
                />
                <TextField
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                    type="email"
                    error={!!errors.email}
                    helperText={errors.email}
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
                    error={!!errors.password}
                    helperText={errors.password}
                />
                <TextField
                    label="Confirm Password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                    type="password"
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword}
                />
                <Box mt={2}>
                    <Button type="submit" variant="contained" color="primary">
                        Register
                    </Button>
                </Box>
            </Box>
        </div>
    );
}
