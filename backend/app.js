const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const router = require("./routes/ItemRoute");
const router2 = require("./routes/BikeRoute");
const router3 = require("./routes/CartRoutes");
const router4 = require("./routes/OrderRoutes");
const router5 = require("./routes/PreOrderRoutes");
const router6 = require("./routes/ReserveRoutes");

const app = express();
const cors = require("cors");
const multer = require("multer");

app.use(express.json());
app.use(cors());
app.use("/items", router);
app.use("/bikes", router2);
app.use("/carts", router3);
app.use("/orders", router4);
app.use("/preorders", router5);
app.use("/reserves", router6);
app.use(express.static('uploads'));


mongoose
  .connect(
    "mongodb+srv://itpproject2080:2080@mdms.7ckq38t.mongodb.net/Inventory_management?retryWrites=true&w=majority&appName=MDMS"
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

require("./modules/ItemModels");
const itemSchema = mongoose.model("ItemModels");


const PORT = process.env.PORT || 8070;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
const multerimg = require("multer");

const storageimg = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const uploadimg = multerimg({ storage: storageimg });

app.post("/additem", uploadimg.single("image"), async (req, res) => {
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
    await itemSchema.create({
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

require("./modules/BikeModel");
const bikeSchema = mongoose.model("BikeModel");

const multerimg1 = require("multer");

const storageimg1 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const uploadimg1 = multerimg1({ storage: storageimg1 });

app.post("/addmodel", uploadimg1.single("image"), async (req, res) => {
  const { Bike_ID, Bike_Name, Price, Description, Colour, Received } = req.body;
  const imageName = req.file.filename;

  try {
    await bikeSchema.create({
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

app.get("/viewmodellist", async (req, res) => {
  try {
    const data = await bikeSchema.find({});
    res.send({ status: 200, data: data });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: "error" });
  }
});

const CartModel = require('./modules/CartModels');
app.post('/webhook/order-create', async (req, res) => {
  const order = req.body; 
  const itemIdsToRemove = order.line_items.map(item => item.id); 

  try {
    await Promise.all(itemIdsToRemove.map(async (itemId) => {
      await CartModel.deleteOne({ _id: itemId });
    }));

    res.status(200).send('Cart updated successfully');
  } catch (error) {
    console.error('Error removing items from cart:', error);
    res.status(500).send('Error removing items from cart');
  }
});


