const express = require("express");
const mongoose = require("mongoose");

const connectDB = require("./config/db.js")
const dotenv = require("dotenv")
const cors = require("cors");
const app = express();

dotenv.config(); 
connectDB();

const RateRoute = require("./routes/RateRoute.js")
const ComplaintRoute = require("./routes/ComplaintRoute.js")
app.use(cors());
app.use(express.json());

//service
const userRoutes = require("./routes/userRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const serviceRoutes = require("./routes/serviceRoutes");

//Routes
app.use('/rates', RateRoute);
app.use('/complaints', ComplaintRoute);

app.use("/api/users", userRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/services", serviceRoutes);

const PORT = process.env.PORT || 8070;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
 
