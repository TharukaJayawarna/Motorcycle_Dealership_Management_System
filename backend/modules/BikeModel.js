const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bikeSchema = new Schema({
    Image: {
        type: String,
        required: [true, "Image is required"],
    },

    Bike_ID: {
        type: String,
        required: [true, "Bike ID is required"],
    },

    Bike_Name: {
        type: String,
        required: [true, "Bike Name is required"],
    },

    Price: {
        type: String,
        required: [true, "Price is required"],
        validate: {
            validator: function (value) {
                return !isNaN(parseFloat(value));
            },
            message: "Price must be a valid number",
        },
    },

    Description: {
        type: String,
        required: [true, "Description is required"],
    },

    Colour: {
        type: String,
        required: [true, "Colour is required"],
    },

    Received: {
        type: Number,
        required: [true, "Received quantity is required"],
        validate: {
            validator: function (value) {
                return !isNaN(parseInt(value)) && value > 0;
            },
            message: "Received quantity must be a valid number greater than zero",
        },
    },

    In_Stock: {
        type: Number,
        default: 0,
    },
});

module.exports = mongoose.model("BikeModel", bikeSchema);
