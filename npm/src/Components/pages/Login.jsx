import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Nav from '../Nav';
import { useNavigate } from 'react-router-dom'; // Import useNavigate


export default function Login() {
  const navigate = useNavigate(); // Initialize useNavigate

  // State for form inputs
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
    // Add your form submission logic here (e.g., API call to log the user in)
    console.log('Form submitted:', formData);

    // After form submission, navigate to the profile page
    navigate('/Profile');
  };

  return (
    <div>
      <Nav />
      <Box height={30} />
      <Box sx={{ display: 'flex' }}>
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
        >
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Login
            </Typography>
            <TextField
              label="Email"
              name="Email"
              value={formData.username}
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
        </Box>
      </Box>
    </div>
  );
}
