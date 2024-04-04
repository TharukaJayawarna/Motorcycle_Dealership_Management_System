const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bikeSchema = new Schema({
    Bike_Image:{
        type:String,
    },

   Bike_ID:{
    type:String,
    required:true,
   },

   Bike_Name:{
    type:String,
    required:true,
   },

   Price:{
    type:String,
    required:true,
   },

   Description:{
    type:String,
    required:true,
   },

   Colour:{
    type:String,
    required:true,
   },

   Received:{
    type:Number,
    required:true,
   },

   In_Stock:{
    type:Number,
    default:0
   },
});

module.exports = mongoose.model(
    "BikeModel", 
    bikeSchema
);