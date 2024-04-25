const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const router = require("./routes/ItemRoute");
const router2 = require("./routes/BikeRoute");

const app = express();
const cors = require("cors");
const multer = require('multer');


app.use(express.json());
app.use(cors());
app.use("/items",router);
app.use("/bikes",router2);
//Inventory_management

mongoose.connect("mongodb+srv://itpproject2080:2080@mdms.7ckq38t.mongodb.net/Inventory_management?retryWrites=true&w=majority&appName=MDMS")
.then(()=> console.log("Connected to MongoDB"))
.then(()=> {
    app.listen(8070);
})
.catch((err)=> console.log((err)));


require("./modules/ItemModels");
const itemSchema = mongoose.model("ItemModels");

const multerimg = require("multer");

const storageimg = multer.diskStorage({
  destination: function (req,file,cb){
    cb(null,"/Users/tharukajayawarna/Desktop/Motorcycle_Dealership_Management_System/frontend/public/Images");},
    filename: function (req, file,cb){
    const uniqueSuffix = Date.now();
    cb(null,uniqueSuffix +file.originalname);
  }
});

const uploadimg = multerimg({storage: storageimg});

app.post("/additem", uploadimg.single("image"), async (req, res) => {
  const { Item_ID, Item_Name, Price, Manufacturer, Category, Compatible_Motorcycle_Models, Received } = req.body;
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
      Image: imageName,
    });

    res.status(200).json({ status: "Success" }); // Send 200 status on success
  } catch (error) {
    res.status(500).json({ status: "Error" }); // Send 500 status on error
  }
});

app.get("/viewitemlist",async(req, res)=>{
  try{
    const data = await itemSchema.find({});
      res.send({status:200, data:data});
    }catch(err){
      console.log(err);
      res.status(500).send({status:"error"});

  
  }
});










require("./modules/BikeModel");
const bikeSchema = mongoose.model("BikeModel");

const multerimg1 = require("multer");

const storageimg1 = multer.diskStorage({
  destination: function (req,file,cb){
    cb(null,"/Users/tharukajayawarna/Desktop/Motorcycle_Dealership_Management_System/frontend/public/Images");},
    filename: function (req, file,cb){
    const uniqueSuffix = Date.now();
    cb(null,uniqueSuffix +file.originalname);
  }
});

const uploadimg1 = multerimg1({storage: storageimg1});

app.post("/addmodel", uploadimg1.single("image"), async (req, res) => {
  const { Bike_ID,Bike_Name,Price,Description,Colour,Received } = req.body;
  const imageName = req.file.filename;

  try {
    await bikeSchema.create({
      Bike_ID,
      Bike_Name,
      Price,
      Description,
      Colour,
      Received: Number(Received),
      Image: imageName,
    });

    res.status(200).json({ status: "Success" }); 
  } catch (error) {
    res.status(500).json({ status: "Error" }); // Send 500 status on error
  }
});

app.get("/viewmodellist",async(req, res)=>{
  try{
    const data = await bikeSchema.find({});
      res.send({status:200, data:data});
    }catch(err){
      console.log(err);
      res.status(500).send({status:"error"});

  
  }
});