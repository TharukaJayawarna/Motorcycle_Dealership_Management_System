const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    
    Order_ID:{
        type:String,//data type
        required:true,//validate
       },
    
    Item_Name:{
        type:String,//data type
        required:true,//validate
       },

    Quantity:{
        type:Number,//data type
        required:true,//validate
       },

    Net_Amount:{
        type:String,
       },

    Cus_Name:{
        type:String,
        required:true,
       },

    Email:{
        type:String,
        required:true,
       },

    Date:{
        type:Date,
        required:true,
       },

    Payment_slip:{
        type:String,//data type
        required:true,//validate
       }
    

})

module.exports = mongoose.model(
    "OrderModel",//file name
    orderSchema//function name
)