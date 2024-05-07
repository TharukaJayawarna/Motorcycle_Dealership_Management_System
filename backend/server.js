const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const UserRoutes = require("./routes/User_Profile_Management_UserRoutes");
const authRoutes = require("./routes/User_Profile_Management_AuthRoutes");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
const baseURL = "/api/v1";
app.use(`${baseURL}/user`, UserRoutes);
app.use(`${baseURL}/auth`, authRoutes);

// Database Connection
const connectDB = require("./config/db");
connectDB();

// Start the Server
const server = app.listen(port, () =>
  console.log(`Server running on port ${port} 🔥`)
);
