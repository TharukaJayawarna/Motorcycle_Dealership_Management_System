const express = require("express");
const mongoose = require("mongoose");
const router1 = require("./routes/CartRoutes");
const router2 = require("./routes/OrderRoutes");
const router3 = require("./routes/PreOrderRoutes");
const router4 = require("./routes/ReserveRoutes");

const app = express();
const cors = require("cors");

// middlware
app.use(express.json());
app.use(cors());
app.use("/carts",router1);
app.use("/Orders",router2);
app.use("/preorders",router3);
app.use("/reserves",router4);



mongoose.connect("mongodb+srv://itpproject2080:2080@mdms.7ckq38t.mongodb.net/Order_Management")
.then(()=> console.log("Connected to MongoDB"))
.then(()=> {
    app.listen(5000);
})
.catch((err)=> console.log((err)));


// mongoose.connect("mongodb+srv://itpproject2080:Project2080@mdms.7ckq38t.mongodb.net", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => console.log("Connected to MongoDB"))
// .catch((err) => console.error("Error connecting to MongoDB:", err));


