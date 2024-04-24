const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    
    Cart_ID:{
        type:String,//data type
        required:true,//validate
       },
    
    Item_Name:{
        type:String,//data type
        required:true,//validate
       },

    Item_Price:{
        type:String,
        required:true,
       },

    Item_Image:{
        type:String,
        required:true,
       },

    Quantity:{
        type:Number,//data type
        required:true,//validate
       },

})

module.exports = mongoose.model(
    "CartModel",//file name
    cartSchema//function name
)