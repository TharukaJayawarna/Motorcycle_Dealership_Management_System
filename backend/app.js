const express = require ("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const router = require("./src/routes/IM_ItemRoute")
const router2 = require("./src/routes/IM_BikeRoute")


const app = express();


//Middleware
app.use("/items",router)
app.use("/bikes", router2)

mongoose.connect("mongodb+srv://itpproject2080:Project2080@mdms.7ckq38t.mongodb.net/Inventory_management?retryWrites=true&w=majority&appName=MDMS")
.then(() => console.log("Connected to mongoDB"))
.then(() => {
    app.listen(8070);
})
.catch((err) => console.log((err)));