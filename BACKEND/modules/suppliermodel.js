const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const supplierSchema = new Schema({
    supplierName:{
        type:String,//dataType
        required:true,//validate
    },

    supplierID:{
        type:String,//dataType
        required:true,//validate
    },

    email:{
        type:String,//dataType
        required:true,//validate
    },

    password:{
        type:String,//dataType
        required:true,//validate
    },

    Address:{
        type:String,//dataType
        required:true,//validate
    },

    contactNumber:{
        type:String,//dataType
        required:true,//validate 
    }, 
});

module.exports = mongoose.model(
    "suppliermodel",//file name
    supplierSchema //function name

)