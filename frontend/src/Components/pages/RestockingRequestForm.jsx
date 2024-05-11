import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

function RestockingRequestForm() {
  // State for form inputs
  const [formData, setFormData] = useState({
    supplierName: '',
    contact: '',
    email: '',
    productName: '',
    productCode: '',
    quantity: '',
    urgency: '',
    additionalDetails: '',
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
    // Add your form submission logic here (e.g., API call to submit the request)
    console.log('Form submitted:', formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Restocking Request
      </Typography>

      {/* Supplier Information */}
      <TextField
        label="Supplier Name"
        name="supplierName"
        value={formData.supplierName}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Contact"
        name="contact"
        value={formData.contact}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
        type="tel"
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

      {/* Product Details */}
      <TextField
        label="Product Name"
        name="productName"
        value={formData.productName}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Product Code"
        name="productCode"
        value={formData.productCode}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Quantity"
        name="quantity"
        value={formData.quantity}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
        type="number"
      />

      {/* Request Urgency Level */}
      <Box mt={2}>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Urgency Level
        </Typography>
        <Select
          name="urgency"
          value={formData.urgency}
          onChange={handleChange}
          fullWidth
          required
        >
          <MenuItem value="">Select urgency</MenuItem>
          <MenuItem value="Low">Low</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="High">High</MenuItem>
        </Select>
      </Box>

      {/* Additional Details */}
      <TextField
        label="Additional Details"
        name="additionalDetails"
        value={formData.additionalDetails}
        onChange={handleChange}
        fullWidth
        margin="normal"
        multiline
        rows={3}
      />

      {/* Submit Button */}
      <Box mt={2}>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Box>
    </Box>
  );
}

export default RestockingRequestForm;
