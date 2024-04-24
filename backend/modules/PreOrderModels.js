const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const preOrderSchema = new Schema({
    
    PreOrder_ID:{
        type:String,//data type
        required:true,//validate
       },
    
    Bike_Name:{
        type:String,//data type
        required:true,//validate
       },

    Bike_Color:{
        type:String,
        required:true,
       },

    Quantity:{
        type:Number,//data type
        required:true,//validate
       },

    Date:{
        type:Date,//data type
        required:true,//validate
       },

    Cus_Name:{
        type:String,//data type
        required:true,//validate
       },

    Email:{
        type:String,//data type
        required:true,//validate
       },

    Advance_Payment_slip:{
        type:String,//data type
        required:true,//validate
       },

})

module.exports = mongoose.model(
    "PreOrderModel",//file name
    preOrderSchema//function name
)