const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();

const Promorouter = require("./routes/Promo_and_Notify_PromoRoutes");
const NotificationRouter = require("./routes/Promo_and_Notify_notificationRoutes");


const UserRoutes = require("./routes/User_Profile_Management_UserRoutes");
const authRoutes = require("./routes/User_Profile_Management_AuthRoutes");
const ItemRoute = require("./routes/ItemRoute");
const BikeRoute = require("./routes/BikeRoute");
const CartRoutes = require("./routes/CartRoutes");
const OrderRoutes = require("./routes/OrderRoutes");
const PreOrderRoutes = require("./routes/PreOrderRoutes");
const ReserveRoutes = require("./routes/ReserveRoutes");

const app = express();
const port = process.env.PORT || 8070;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
connectDB();

// Database Models
const ItemModel = require("./modules/ItemModels");
const BikeModel = require("./modules/BikeModel");
const CartModel = require("./modules/CartModels");
const RateRoute = require("./routes/RateRoute.js")
const ComplaintRoute = require("./routes/ComplaintRoute.js")

//Routes
app.use('/rates', RateRoute);
app.use('/complaints', ComplaintRoute);

// Multer configuration for item images
const storageItem = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const uploadItem = multer({ storage: storageItem });

// Multer configuration for bike images
const storageBike = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const uploadBike = multer({ storage: storageBike });

// Add Item Route
app.post("/additem", uploadItem.single("image"), async (req, res) => {
  const {
    Item_ID,
    Item_Name,
    Price,
    Manufacturer,
    Category,
    Compatible_Motorcycle_Models,
    Received,
  } = req.body;
  const imageName = req.file.filename;

  try {
    await ItemModel.create({
      Item_ID,
      Item_Name,
      Price,
      Manufacturer,
      Category,
      Compatible_Motorcycle_Models,
      Received: Number(Received),
      In_Stock: Number(Received),
      Image: imageName,
    });

    res.status(200).json({ status: "Success" });
  } catch (error) {
    res.status(500).json({ status: "Error" });
  }
});

// Add Bike Model Route
app.post("/addmodel", uploadBike.single("image"), async (req, res) => {
  const { Bike_ID, Bike_Name, Price, Description, Colour, Received } = req.body;
  const imageName = req.file.filename;

  try {
    await BikeModel.create({
      Bike_ID,
      Bike_Name,
      Price,
      Description,
      Colour,
      Received: Number(Received),
      In_Stock: Number(Received),
      Image: imageName,
    });

    res.status(200).json({ status: "Success" });
  } catch (error) {
    res.status(500).json({ status: "Error" });
  }
});

// View Bike Model List Route
app.get("/viewmodellist", async (req, res) => {
  try {
    const data = await BikeModel.find({});
    res.send({ status: 200, data: data });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: "error" });
  }
});

// Webhook for Order Creation
app.post("/webhook/order-create", async (req, res) => {
  const order = req.body;
  const itemIdsToRemove = order.line_items.map((item) => item.id);

  try {
    await Promise.all(
      itemIdsToRemove.map(async (itemId) => {
        await CartModel.deleteOne({ _id: itemId });
      })
    );

    res.status(200).send("Cart updated successfully");
  } catch (error) {
    console.error("Error removing items from cart:", error);
    res.status(500).send("Error removing items from cart");
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const baseURL = "/api/v1";
app.use(`${baseURL}/user`, UserRoutes);
app.use(`${baseURL}/auth`, authRoutes);
app.use(`/items`, ItemRoute);
app.use(`/bikes`, BikeRoute);
app.use(`/carts`, CartRoutes);
app.use(`/orders`, OrderRoutes);
app.use(`/preorders`, PreOrderRoutes);
app.use(`/reserves`, ReserveRoutes);
app.use(express.static("uploads"));

app.use("/promos", Promorouter);
app.use("/mail", NotificationRouter);

// Start the Server
app.listen(port, () => console.log(`Server running on port ${port} 🔥`));
