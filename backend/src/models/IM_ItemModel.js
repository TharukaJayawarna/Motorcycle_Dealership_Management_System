const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
   Item_Image:{
    type:String
   },

   Item_ID:{
    type:String,
    required:true,
   },

   Item_Name:{
    type:String,
    required:true,
   },

   Price:{
    type:String,
    required:true,
   },

   Manufacturer:{
    type:String,
    required:true,
   },

   Category:{
    type:String,
    required:true,
   },

   Compatible_Motorcycle_Models:{
    type:String,
    required:true,
   },

   Received:{
    type:Number,
    required:true,
   },

   In_Stock:{
    type:Number,
    default:0,
   },
});

module.exports = mongoose.model(
    "ItemModels", 
    itemSchema 
)