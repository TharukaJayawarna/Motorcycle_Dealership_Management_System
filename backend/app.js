const express = require("express");
const mongoose = require("mongoose");
const Promorouter = require("./routes/Promo_and_Notify_PromoRoutes");
const NotificationRouter = require("./routes/Promo_and_Notify_notificationRoutes");

const app = express();
const cors = require("cors");

//middleware
app.use(express.json());
app.use(cors());
app.use("/promos", Promorouter);
app.use("/mail", NotificationRouter);


mongoose.connect("mongodb+srv://itpproject2080:2080@mdms.7ckq38t.mongodb.net/Inventory_management")
.then(() => console.log("Connected to MongoDB"))
.then(() => {
    app.listen(8070);
})
.catch((err)=> console.log((err)));