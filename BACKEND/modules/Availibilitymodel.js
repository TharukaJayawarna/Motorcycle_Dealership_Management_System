const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AvailibilitySchema = new Schema({
    AvailibilityName:{
        type:String,
        required:true,
    },
    AvailibilityID:{
        type:String,
        required:true,
    },

    AvailibilityUserName:{
        type:String,
        required:true,
    },
    email:{     
        type:String,
        required:true,
    }, 

});

module.exports = mongoose.model(
    "Availibilitymodel",//file name
    AvailibilitySchema //function name

)