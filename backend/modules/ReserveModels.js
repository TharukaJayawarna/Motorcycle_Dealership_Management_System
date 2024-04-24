const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReserveSchema = new Schema({
    
    Reserve_ID:{
        type:String,//data type
        required:true,//validate
       },
    
    Cus_Name:{
        type:String,//data type
        required:true,//validate
       },

    Email:{
        type:String,
        required:true,
       },

    Bike_Name:{
        type:String,
        required:true,
       },

    Bike_Color:{
        type:String,//data type
        required:true,//validate
       },

})

module.exports = mongoose.model(
    "ReserveModel",//file name
    ReserveSchema//function name
)