const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AvailibilitySchema = new Schema({
    AvailibilityID:{
        type:String,//dataType
        required:true,//validate
    },

    AvailibilityUserName:{
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

});

module.exports = mongoose.model(
    "Availibilitymodel",//file name
    AvailibilitySchema //function name

)