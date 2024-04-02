const express = require ("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();


//Middleware
app.use("/",(req, res,next) => {
    res.send("It is working");
})

mongoose.connect("mongodb+srv://itpproject2080:Project2080@mdms.7ckq38t.mongodb.net/Inventory_management?retryWrites=true&w=majority&appName=MDMS")
.then(() => console.log("Connected to mongoDB"))
.then(() => {
    app.listen(3000);
})
.catch((err) => console.log((err)));