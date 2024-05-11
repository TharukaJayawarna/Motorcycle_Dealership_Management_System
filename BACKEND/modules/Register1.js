const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Define the schema for user registration data
const registerSchema = new mongoose.Schema({
    // Define the username field
    username: {
        type: String, // Field type
        required: true, // The field is required
        unique: true, // The field should be unique
        trim: true, // Trim whitespace from the input
        minlength: 3, // Minimum length of the field
        maxlength: 50, // Maximum length of the field
    },

    // Define the email field
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        trim: true, 
        lowercase: true, 
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
    },

    // Define the password field
    password: {
        type: String, 
        required: true, 
        minlength: 8, 
    },

    // Define the contact field (optional)
    contact: {
        type: String,
        trim: true, 
    },

    // Define the address field (optional)
    address: {
        type: String,
        trim: true, 
    },

    // Define the profileImage field (optional)
    profileImage: {
        type: String,
        trim: true, 
    },
});


module.exports = mongoose.model(
    "Register",
    registerSchema
)
