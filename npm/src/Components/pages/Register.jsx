import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export default function Register() {
  const navigate = useNavigate(); // Initialize useNavigate

  // State for form inputs
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
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
    // Add your form submission logic here (e.g., API call to register the user)
    console.log('Form submitted:', formData);
    
    // After form submission, navigate to the login page
    navigate('/login');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
      <TextField
        label="Confirm Password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
        type="password"
      />
      <Box mt={2}>
        <Button type="submit" variant="contained" color="primary">
          Register
        </Button>
      </Box>
    </Box>
  );
}
