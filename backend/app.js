// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');

// Import route files
const salaryRoute = require('./routes/SalaryRoute');
const additionalRoute = require('./routes/AdditionalRoute');
const supplierRoute = require('./routes/SupplierRoute');

// Initialize Express app
const app = express();

// Configure CORS middleware
app.use(cors());

// Configure JSON body parsing middleware
app.use(express.json());

// Connect to MongoDB database
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Database connected'))
    .catch((err) => console.log('Database connection error:', err));

// Set up routes
app.use('/api/salaries', salaryRoute);
app.use('/api/additionals', additionalRoute);
app.use('/api/suppliers', supplierRoute);

// Define the port
const port = process.env.PORT || 8070;

// Start the server
app.listen(port, () => console.log(`Server is running on port ${port}`));
